<template>
  <details>
    <summary><b>Game history</b></summary>
    <ul>
      <li>
        <b>Round: 1</b>
        <dice-card image-source="http://roll.diceapi.com/images/poorly-drawn/d6/6.png" />
        <b>More</b>
        <dice-card image-source="http://roll.diceapi.com/images/poorly-drawn/d6/3.png" />
        <b>Score 0.3</b>
      </li>
    </ul>
  </details>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DiceCard from '@/components/atomic/DiceCard.vue';

@Component({
  components: { DiceCard }
})
export default class GameHistory extends Vue {}
</script>

<style scoped lang="scss"></style>
