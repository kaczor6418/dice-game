<template>
  <div class="game-board">
    <dice-card :image-source="nextDiceImg" class="game-board__next-dice" />
    <section class="game-board__guess">
      <base-button content="Less" @click="handleGuessIfLess" />
      <dice-card :image-source="currentDiceImg" />
      <base-button content="More" @click="handleGuessIfMore" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DiceCard from '@/components/atomic/DiceCard/DiceCard.vue';
import BaseButton from '@/components/atomic/BaseButton/BaseButton.vue';
import GameProgress from '@/components/GameProgress/GameProgress.vue';
import { EventBus } from '@/EventBus';
import { Channels } from '@/common/Channels';
import { DiceHistoryItem } from '@/store/DiceGameStore/interfaces/DiceHistoryItem';
import { CONSTANTS } from '@/common/CONSTANTS';
import { httpService } from '@/services/services';
import { diceStore } from '@/store/store';
import { NewDiceHistoryItem } from '@/store/DiceGameStore/interfaces/NewDiceHistoryItem';
import { DiceGameGuess } from '@/common/Enums';

@Component({
  components: { GameProgress, BaseButton, DiceCard }
})
export default class GameBoard extends Vue {
  @Prop() private msg!: string;

  private currentDice!: string;
  private nextDice!: string;

  constructor() {
    super();
    this.nextDice = CONSTANTS.QUESTION_MARK_IMG;
    this.currentDice = CONSTANTS.QUESTION_MARK_IMG;
    this.initializeSubscriptions();
  }

  get currentDiceImg(): string {
    return this.currentDice;
  }

  get nextDiceImg(): string {
    return this.nextDice;
  }

  beforeDestroy(): void {
    EventBus.$off(Channels.DICE_GAME_STATE, this.setGameState);
  }

  public async handleGuessIfLess(): Promise<void> {
    const guess = DiceGameGuess.LESS;
    const { value: dice } = (await httpService.get(CONSTANTS.ROLL_SINGLE_DICE)).resource.dice[0];
    let score = 0;
    if (dice < diceStore.currentDice) {
      score = 0.1;
    }
    this.handleGuessResult(dice, score, guess);
  }

  public async handleGuessIfMore(): Promise<void> {
    const guess = DiceGameGuess.MORE;
    const { value: dice } = (await httpService.get(CONSTANTS.ROLL_SINGLE_DICE)).resource.dice[0];
    let score = 0;
    if (dice > diceStore.currentDice) {
      score = 0.1;
    }
    this.handleGuessResult(dice, score, guess);
  }

  private handleGuessResult(dice: number, scoreDelta: number, guess: DiceGameGuess): void {
    const newHistoryItem: NewDiceHistoryItem = {
      dice,
      scoreDelta,
      guess
    };
    diceStore.addNewDiceHistoryItem(newHistoryItem);
    this.changeDiceImages(dice);
  }

  private changeDiceImages(dice: number): void {
    this.currentDice = `${CONSTANTS.BASE_DICE_IMG_URL}${dice}.png`;
    this.nextDice = CONSTANTS.QUESTION_MARK_IMG;
  }

  private initializeSubscriptions(): void {
    EventBus.$on(Channels.DICE_GAME_STATE, this.setGameState);
  }

  private setGameState({ dice }: DiceHistoryItem): void {
    this.currentDice = `${CONSTANTS.BASE_DICE_IMG_URL}${dice}.png`;
  }
}
</script>

<style scoped lang="scss">
.game-board {
  &__next-dice {
    margin-left: calc(50% - 5rem);
    margin-bottom: 2rem;
  }

  &__guess {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
