<template>
  <details>
    <summary><b>Game history</b></summary>
    <ul>
      <li v-for="historyItem in availableHistoryItems" :key="historyItem.round">
        <b>{{ buildRound(historyItem) }}</b>
        <dice-card :size="getDiceCardSize()" :image-source="getHistoryItemDiceImgUrl(historyItem.dice)" />
        <b>{{ getDiceGuess(historyItem) }}</b>
        <dice-card :size="getDiceCardSize()" :image-source="getNextHistoryItemDiceImgUrl(historyItem)" />
        <b>{{ getScoreAfterGuess(historyItem) }}</b>
      </li>
    </ul>
  </details>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { DiceHistoryItem } from '@/store/DiceGameStore/interfaces/DiceHistoryItem';
import { EventBus } from '@/EventBus';
import { Channels } from '@/common/Channels';
import { UTILS } from '@/common/UTILS';
import DiceCard from '@/components/atomic/DiceCard/DiceCard.vue';
import { CONSTANTS } from '@/common/CONSTANTS';
import { diceStore } from '@/store/store';
import { DiceCardSize } from '@/components/atomic/DiceCard/interfaces/DiceCardSize';

@Component({
  components: { DiceCard }
})
export default class GameHistory extends Vue {
  private historyItems: DiceHistoryItem[] = [];

  constructor() {
    super();
    this.initializeSubscriptions();
  }

  beforeDestroy(): void {
    EventBus.$off(Channels.DICE_GAME_STATE, this.addNewHistoryItem);
    EventBus.$off(Channels.DICE_GAME_STORE_READY, this.setUpHistoryItems);
  }

  get availableHistoryItems(): DiceHistoryItem[] {
    if (!this.hasMoreThanOneItem()) {
      return [];
    }
    return this.historyItems.filter((diceItem) => this.isNotLastHistoryItem(diceItem));
  }

  private hasMoreThanOneItem(): boolean {
    return this.historyItems.length > 1;
  }

  private isNotLastHistoryItem(historyItem: DiceHistoryItem): boolean {
    return historyItem.round !== UTILS.getLastArrayItem(this.historyItems)?.round;
  }

  private getDiceCardSize(): DiceCardSize {
    return DiceCardSize.S;
  }

  private buildRound({ round }: DiceHistoryItem): string {
    return `Round: ${round}`;
  }

  private getHistoryItemDiceImgUrl(dice: number): string {
    return `${CONSTANTS.BASE_DICE_IMG_URL}${dice}.png`;
  }

  private getNextHistoryItemDiceImgUrl(diceItem: DiceHistoryItem): string {
    return `${CONSTANTS.BASE_DICE_IMG_URL}${this.getFollowingItem(diceItem).dice}.png`;
  }

  private getDiceGuess(diceItem: DiceHistoryItem): string {
    return this.getFollowingItem(diceItem).guess;
  }

  private getScoreAfterGuess(diceItem: DiceHistoryItem): string {
    return `Score: ${this.getFollowingItem(diceItem).score}`;
  }

  private getFollowingItem({ round }: DiceHistoryItem): DiceHistoryItem {
    return this.historyItems[round + 1];
  }

  private initializeSubscriptions(): void {
    EventBus.$on(Channels.DICE_GAME_STATE, this.addNewHistoryItem);
    EventBus.$on(Channels.DICE_GAME_STORE_READY, this.setUpHistoryItems);
  }

  private setUpHistoryItems(): void {
    const historyItemsRequest = diceStore.getDiceGameHistory();
    historyItemsRequest.onsuccess = () => (this.historyItems = historyItemsRequest.result);
  }

  private addNewHistoryItem(historyItem: DiceHistoryItem): void {
    if (historyItem.round === 0) {
      this.historyItems = [];
    }
    if (UTILS.isEmpty(this.historyItems)) {
      this.historyItems.push(historyItem);
    } else if (historyItem.round !== UTILS.getLastArrayItem(this.historyItems)?.round) {
      this.historyItems.push(historyItem);
    }
  }
}
</script>

<style scoped lang="scss">
details {
  summary {
    padding-left: 0.5rem;
    font-size: 1.2rem;
    color: var(--color-accent-1-inactive);
    outline: none;
    cursor: pointer;
    transition: color 250ms cubic-bezier(0.165, 0.84, 0.44, 1);
    will-change: color;

    &:hover {
      color: var(--color-accent-1);
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0.5rem;
    overflow-y: auto;
    max-height: calc(60vh - 10.55rem);

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 0.8rem rgba(0, 0, 0, 0.3);
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      width: 0.8rem;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-image: linear-gradient(0deg, var(--color-accent-1) 0%, var(--color-accent-2) 100%);
    }

    li {
      padding: 0.5rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
