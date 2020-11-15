<template>
  <div v-show="showGameOver">
    <h3>Game over!</h3>
    <b>{{ `Your score ${totalScore}` }}</b>
    <base-button content="Start new game" @click="startNewGame"></base-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseButton from '@/components/atomic/BaseButton.vue';
import { diceStore } from '@/store/store';
import { httpService, splashService } from '@/services/services';
import { CONSTANTS } from '@/common/CONSTANTS';
import { DiceGameGuess } from '@/common/Enums';
import { EventBus } from '@/EventBus';
import { Channels } from '@/common/Channels';

@Component({
  components: { BaseButton }
})
export default class GameOver extends Vue {
  private showGameOver = false;
  private gameScore = 0.0;
  constructor() {
    super();
    this.initializeSubscriptions();
  }
  get totalScore(): number {
    return this.gameScore;
  }

  beforeDestroy(): void {
    EventBus.$off(Channels.GAME_OVER, this.handleGameOver);
  }

  private handleGameOver(gameScore: number): void {
    this.gameScore = gameScore;
    this.showGameOver = true;
    splashService.addSplash();
  }

  private initializeSubscriptions(): void {
    EventBus.$on(Channels.GAME_OVER, this.handleGameOver);
  }

  private async startNewGame(): Promise<void> {
    diceStore.clearDiceHistoryStore();
    const { value: startDice } = (await httpService.get(CONSTANTS.ROLL_SINGLE_DICE)).resource.dice[0];
    diceStore.addNewDiceHistoryItem({
      guess: DiceGameGuess.START,
      scoreDelta: 0,
      dice: startDice
    });
    this.showGameOver = false;
    splashService.removeSplash();
  }
}
</script>

<style scoped lang="scss">
div {
  width: 20rem;
  height: 20rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: var(--shadow-around-level-2);
  background-color: var(--color-accent-2);
  margin: calc(50% - 10rem) 0 0 calc(50% - 10rem);
  position: absolute;
  z-index: 101;
}
</style>
