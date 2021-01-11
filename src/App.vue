<template>
  <div id="app">
    <game-over />
    <game-progress class="game-progress" />
    <game-board class="game-board" />
    <hr />
    <game-history class="game-history" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { diceStore } from '@/store/store';
import { diceStoreConfig } from '@/store/DiceGameStore/DiceGameStoreConfig';
import { DiceHistoryItem } from '@/store/DiceGameStore/interfaces/DiceHistoryItem';
import { EventBus } from '@/EventBus';
import { Channels } from '@/common/Channels';
import GameBoard from '@/components/GameBoard/GameBoard.vue';
import GameHistory from '@/components/GameHistory/GameHistory.vue';
import GameProgress from '@/components/GameProgress/GameProgress.vue';
import GameOver from '@/components/GameOver/GameOver.vue';

@Component({
  components: { GameOver, GameProgress, GameHistory, GameBoard }
})
export default class App extends Vue {
  mounted(): void {
    diceStore.initializeStore(diceStoreConfig, this.setUpGameData);
  }

  private setUpGameData = (diceHistoryItem: DiceHistoryItem) => {
    EventBus.$emit(Channels.DICE_GAME_STATE, diceHistoryItem);
    EventBus.$emit(Channels.DICE_GAME_STORE_READY);
  };
}
</script>

<style lang="scss" scoped>
.game-progress {
  max-height: 10vh;
}

.game-board {
  max-height: 50vh;
}
hr {
  margin: 2rem auto;
  width: 90%;
  border-width: 0.05rem;
  border-color: var(--color-accent-1-inactive);
  background-color: var(--color-accent-1-inactive);
}
.game-history {
  max-height: calc(60vh - 5.55rem);
}
</style>
