import { StoreConfig } from '@/store/interfaces/StoreConfig';
import { DiceHistoryItem } from '@/store/DiceGameStore/interfaces/DiceHistoryItem';
import { UTILS } from '@/common/UTILS';
import { httpService } from '@/services/services';
import { CONSTANTS } from '@/common/CONSTANTS';
import { NewDiceHistoryItem } from '@/store/DiceGameStore/interfaces/NewDiceHistoryItem';
import { EventBus } from '@/EventBus';
import { Channels } from '@/common/Channels';
import { DiceGameGuess } from '@/common/Enums';

export class DiceGameStore {
  public currentRound!: number | null;
  public currentScore!: number | null;
  public currentDice!: number;

  private readonly name: string;

  private storeName!: string;
  private database!: IDBDatabase;

  constructor(name: string) {
    this.name = name;
  }

  public dispose(): void {
    this.database.close();
  }

  public addNewDiceHistoryItem(newHistoryItem: NewDiceHistoryItem): void {
    const objectStore = this.createDiceTransaction();
    this.currentDice = newHistoryItem.dice;
    if (!UTILS.isNullOrUndefined(this.currentRound) && !UTILS.isNullOrUndefined(this.currentScore)) {
      ++this.currentRound;
      const newScore = this.currentScore + newHistoryItem.scoreDelta;
      this.currentScore = UTILS.round(newScore, 1);
    } else {
      this.currentRound = 0;
      this.currentScore = 0;
    }
    const historyItem: DiceHistoryItem = {
      dice: this.currentDice,
      round: this.currentRound,
      score: this.currentScore,
      guess: newHistoryItem.guess
    };
    objectStore.add(historyItem);
    EventBus.$emit(Channels.DICE_GAME_STATE, historyItem);
    this.checkIsGameOver();
  }

  public getDiceGameHistory(): IDBRequest<DiceHistoryItem[]> {
    const objectStore = this.createDiceTransaction();
    return objectStore.getAll();
  }

  public clearDiceHistoryStore(): void {
    this.currentRound = null;
    this.currentScore = null;
    const objectStore = this.createDiceTransaction();
    objectStore.clear();
  }

  public initializeStore(
    { indexes, autoIncrement, storeName }: StoreConfig,
    afterSuccess: (diceHistoryItem: DiceHistoryItem) => void
  ): void {
    this.storeName = storeName;
    const databaseRequest = indexedDB.open(this.name, 2);
    databaseRequest.onerror = e => console.error(`An error occurred in **${this.name}** database`, (<any>e.target).errorCode);
    databaseRequest.onsuccess = () => {
      this.database = databaseRequest.result;
      const gameHistoryRequest = this.getDiceGameHistory();
      gameHistoryRequest.onsuccess = async () => await this.setUp(gameHistoryRequest.result, afterSuccess);
    };
    databaseRequest.onupgradeneeded = () => {
      this.database = databaseRequest.result;
      const objectStore = this.database.createObjectStore(this.storeName, { autoIncrement: autoIncrement ?? true });
      for (const { key, isUnique } of indexes) {
        objectStore.createIndex(key, key, { unique: isUnique });
      }
    };
  }

  private setUp = async (historyItems: DiceHistoryItem[], afterSuccess: (diceHistoryItem: DiceHistoryItem) => void): Promise<void> => {
    let lastHistoryItem: DiceHistoryItem | null = UTILS.getLastArrayItem(historyItems);
    if (!UTILS.isNullOrUndefined(lastHistoryItem) && !window.confirm('Load last game ?')) {
      this.clearDiceHistoryStore();
      lastHistoryItem = null;
    }
    if (UTILS.isNullOrUndefined(lastHistoryItem)) {
      const { resource } = await httpService.get(CONSTANTS.ROLL_SINGLE_DICE);
      lastHistoryItem = {
        dice: resource.dice[0].value,
        score: 0,
        round: 0,
        guess: DiceGameGuess.START
      };
      this.addNewDiceHistoryItem({
        dice: lastHistoryItem.dice,
        scoreDelta: 0,
        guess: DiceGameGuess.START
      });
    }
    this.currentScore = lastHistoryItem?.score;
    this.currentRound = historyItems.length - 1 > 0 ? historyItems.length - 1 : 0;
    this.currentDice = lastHistoryItem?.dice;
    afterSuccess(lastHistoryItem);
    this.checkIsGameOver();
  };

  private createDiceTransaction(): IDBObjectStore {
    const transaction = this.database.transaction([this.storeName], 'readwrite');
    transaction.onerror = e => console.error(`An error occurred in **transaction**`, (<any>e.target).errorCode);
    return transaction.objectStore(this.storeName);
  }

  private checkIsGameOver(): void {
    if (this.currentRound === 30) {
      EventBus.$emit(Channels.GAME_OVER);
    }
  }
}
