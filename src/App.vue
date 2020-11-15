<template>
  <div id="app">
    <h1>Dice game</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { diceStore } from '@/store/store';
import { diceStoreConfig } from '@/store/DiceGameStore/DiceGameStoreConfig';
import { DiceHistoryItem } from '@/store/DiceGameStore/interfaces/DiceHistoryItem';
import { EventBus } from '@/EventBus';
import { Channels } from '@/common/Channels';

@Component({})
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
