<template>
  <div class="game-board">
    <section class="game-board__info">
      <game-progress />
      <dice-card />
    </section>
    <section class="game-board__guess">
      <base-button />
      <dice-card />
      <base-button />
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
export default class GameBoard extends Vue {}
</script>

<style lang="scss"></style>
