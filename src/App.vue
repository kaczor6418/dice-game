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

@Component({})
export default class App extends Vue {
  constructor() {
    super();
  }

  mounted(): void {
    diceStore.initializeStore(diceStoreConfig, this.setUpGameData);
  }

  private setUpGameData = (diceHistoryItem: DiceHistoryItem) => {
    for (let i = 0; i < 31; i++) {
      diceStore.addNewDiceHistoryItem({ dice: 1, scoreDelta: 0.1, guess: DiceGameGuess.MORE });
    }
  };
}
</script>

<style lang="scss"></style>
