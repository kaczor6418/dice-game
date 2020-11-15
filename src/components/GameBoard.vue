<template>
  <div class="game-board">
    <section class="game-board__info">
      <game-progress />
      <dice-card image-source="https://cdn.pixabay.com/photo/2012/04/23/15/46/question-38629_960_720.png" />
    </section>
    <section class="game-board__guess">
      <base-button content="Less" @click="handleGuessIfLess" />
      <dice-card image-source="http://roll.diceapi.com/images/poorly-drawn/d6/6.png" />
      <base-button content="More" @click="handleGuessIfMore" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameProgress from '@/components/GameProgress.vue';
import DiceCard from '@/components/atomic/DiceCard.vue';
import BaseButton from '@/components/atomic/BaseButton.vue';

@Component({
  components: { BaseButton, DiceCard, GameProgress }
})
export default class GameBoard extends Vue {
  public async handleGuessIfLess(): Promise<void> {
    console.info('Less');
  }

  public async handleGuessIfMore(): Promise<void> {
    console.info('More');
  }
}
</script>

<style lang="scss"></style>
