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
import { DiceGameGuess } from '@/common/Enums';
import { EventBus } from '@/EventBus';
import { Channels } from '@/common/Channels';

@Component({})
export default class App extends Vue {
  constructor() {
    super();
    this.initializeSubscriptions();
  }

  mounted(): void {
    diceStore.initializeStore(diceStoreConfig, this.setUpGameData);
  }

  private initializeSubscriptions(): void {
    EventBus.$on(Channels.DICE_GAME_STATE, (payload: any) => console.log('DICE_GAME_STATE', payload));
    EventBus.$on(Channels.GAME_OVER, () => console.log('GAME_OVER'));
    EventBus.$on(Channels.DICE_GAME_STORE_READY, () => console.log('DICE_GAME_STORE_READY'));
  }

  private setUpGameData = (diceHistoryItem: DiceHistoryItem) => {
    EventBus.$emit(Channels.DICE_GAME_STORE_READY);
    for (let i = 0; i < 31; i++) {
      diceStore.addNewDiceHistoryItem({ dice: 1, scoreDelta: 0.1, guess: DiceGameGuess.MORE });
    }
  };
}
</script>

<style lang="scss"></style>
