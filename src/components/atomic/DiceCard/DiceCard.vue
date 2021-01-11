<template>
  <div :class="getSizeClass">
    <img :src="imageSource" alt="dice" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DiceCardSize } from '@/components/atomic/DiceCard/interfaces/DiceCardSize';

@Component
export default class DiceCard extends Vue {
  @Prop() private imageSource!: string;
  @Prop({ default: DiceCardSize.M }) private size!: DiceCardSize;

  get getSizeClass(): string {
    return this.$props.size === DiceCardSize.M ? DiceCardSize.M : DiceCardSize.S;
  }
}
</script>

<style scoped lang="scss">
.s {
  width: 5rem;
  height: 5rem;
}

.m {
  width: 10rem;
  height: 10rem;
}
div {
  background-color: var(--color-accent-2);
  box-shadow: var(--shadow-around-level-2);
  img {
    width: 100%;
    padding: 0.5rem;
  }
}
</style>
