<template>
  <div>
    <img :src="imageSource" alt="dice" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DiceCard extends Vue {
  @Prop() private imageSource!: string;
}
</script>

<style scoped lang="scss">
div {
  width: 10rem;
  height: 10rem;
  background-color: var(--color-accent-2);
  box-shadow: var(--shadow-around-level-2);
  img {
    max-width: 100%;
    padding: 0.5rem;
  }
}
</style>
