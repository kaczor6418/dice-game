<template>
  <div>
    <strong>{{ round }}</strong>
    <b>|</b>
    <strong>{{ score }}</strong>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { EventBus } from '@/EventBus';
import { Channels } from '@/common/Channels';
import { DiceHistoryItem } from '@/store/DiceGameStore/interfaces/DiceHistoryItem';

@Component
export default class GameHistory extends Vue {
  private currentRound = 0;
  private currentScore = 0;

  constructor() {
    super();
    this.initializeSubscriptions();
  }

  get round(): string {
    return `Round: ${this.currentRound}`;
  }

  get score(): string {
    return `Score: ${this.currentScore}`;
  }

  beforeDestroy(): void {
    EventBus.$off(Channels.DICE_GAME_STATE, this.setGameState);
  }

  initializeSubscriptions(): void {
    EventBus.$on(Channels.DICE_GAME_STATE, this.setGameState);
  }

  private setGameState({ score, round }: DiceHistoryItem): void {
    this.currentRound = round;
    this.currentScore = score;
  }
}
</script>

<style scoped lang="scss">
div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  background-color: var(--color-primary-dark);
  box-shadow: var(--shadow-bottom);

  b {
    color: var(--color-accent-1);
  }
}
</style>
