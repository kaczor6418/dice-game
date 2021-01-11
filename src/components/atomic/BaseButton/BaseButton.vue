<template>
  <button v-on="$listeners">{{ content }}</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseButton extends Vue {
  @Prop() private content!: string;
}
</script>

<style scoped lang="scss">
button {
  margin: 0;
  padding: 0;
  outline: none;
  color: var(--color-text);
  background-color: var(--color-accent-2-inactive);
  border: 0.1rem dashed var(--color-accent-1-inactive);
  box-shadow: var(--shadow-around-level-1);
  cursor: pointer;
  width: 5rem;
  height: 5rem;
  text-align: center;
  border-radius: 50%;
  transition: all 250ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transition-property: background-color, transform, color;
  will-change: background-color, transform, color;

  &:hover {
    background-color: var(--color-accent-1);
    color: var(--color-text-on-accent-1);
    transform: scale(1.2);
  }
}
</style>
