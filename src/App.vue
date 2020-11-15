<template>
  <div id="app">
    <game-board />
    <game-history />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { diceStore } from '@/store/store';
import { diceStoreConfig } from '@/store/DiceGameStore/DiceGameStoreConfig';
import { DiceHistoryItem } from '@/store/DiceGameStore/interfaces/DiceHistoryItem';
import { EventBus } from '@/EventBus';
import { Channels } from '@/common/Channels';
import GameBoard from '@/components/GameBoard.vue';
import GameHistory from '@/components/GameHistory.vue';

@Component({
  components: { GameHistory, GameBoard }
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

<style lang="scss"></style>
