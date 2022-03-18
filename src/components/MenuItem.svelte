<script lang="ts">
  import { onMount } from "svelte";

  export let disabled = false;
  export let height = 0;

  let el: HTMLDivElement;

  onMount(() => {
    height = el.offsetHeight;
  });
</script>

<div class="menu-item" class:disabled on:click bind:this={el}>
  <slot />
</div>

<style lang="scss">
  .menu-item {
    padding: 6px 8px;
    font-size: 14px;
    background-color: #fff;
    color: #000;
    cursor: pointer;
    pointer-events: all;
    text-transform: uppercase;

    &.disabled {
      cursor: initial;
      background-color: #bbb;
      opacity: 0.6;
      pointer-events: none;
    }
  }
</style>
