<script lang="ts">
  import { onMount } from "svelte";

  export let disabled = false;
  export let selected = false;
  export let height = 0;

  let el: HTMLDivElement;

  onMount(() => {
    height = el.offsetHeight;
  });
</script>

<div class="menu-item" class:disabled class:selected on:click bind:this={el}>
  <slot />
</div>

<style lang="scss">
  .menu-item {
    padding: 6px 8px;
    font-size: 13px;
    font-weight: 400;
    background-color: var(--color-bg);
    color: #000;
    cursor: pointer;
    pointer-events: all;
    user-select: none;
    text-transform: uppercase;

    &.disabled {
      cursor: initial;
      background-color: #bbb;
      opacity: 0.6;
      pointer-events: none;
    }

    &.selected {
      color: var(--color-highlight);
      font-weight: 600;
    }
  }
</style>
