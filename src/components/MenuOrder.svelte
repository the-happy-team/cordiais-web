<script lang="ts">
  import { fade } from "svelte/transition";
  import { EmotionOrder, OrderType } from "../types/cordiais.types";
  import { menu as _menu } from "../langs/strings";
  import { language } from "../stores.js";
  import MenuItem from "./MenuItem.svelte";

  export let orderBy: OrderType;
  export let left = 0;

  $: menu = _menu[$language];

  const itemHeight = EmotionOrder.map((_) => 0);

  const transitionDuration = 100;

  const handleItemClick = (o: OrderType) => {
    orderBy = orderBy == o ? OrderType.Date : o;
  };

  $: menuPosCss = `--menuButtonHeight: ${itemHeight[0]}px; --menuPosLeft: ${left}px`;
</script>

<div
  class="menu-order"
  style={menuPosCss}
  transition:fade={{ duration: transitionDuration }}
>
  {#each EmotionOrder as emo, i (emo)}
    <MenuItem
      on:click={() => handleItemClick(OrderType[emo])}
      bind:height={itemHeight[i]}
      selected={orderBy == OrderType[emo]}
    >
      {menu[emo]}
    </MenuItem>
  {/each}
</div>

<style lang="scss">
  .menu-order {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: absolute;
    top: calc(20vw - var(--menuButtonHeight));
    left: calc(10vw + var(--menuPosLeft) - 1px);
    padding: 0;
    box-sizing: border-box;
    pointer-events: none;
  }
</style>
