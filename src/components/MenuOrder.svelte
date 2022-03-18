<script lang="ts">
  import { EmotionOrder, OrderType } from "../types/cordiais.types";
  import { menu as _menu } from "../langs/strings";
  import MenuItem from "./MenuItem.svelte";

  export let orderBy: OrderType;

  const menu = _menu["pt"];

  let itemHeight: Array<number> = EmotionOrder.map((_, i) => i);

  $: menuPosCss = `--menuButtonHeight: ${itemHeight[0]}px;`;
</script>

<div class="menu" style={menuPosCss}>
  {#each EmotionOrder as emo, i (emo)}
    <MenuItem
      on:click={() => (orderBy = OrderType[emo])}
      bind:height={itemHeight[i]}
    >
      {menu[emo]}
    </MenuItem>
  {/each}
</div>

<style lang="scss">
  .menu {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: absolute;
    top: calc(20vw - var(--menuButtonHeight));
    left: 30%;
    padding: 0;
    box-sizing: border-box;
    pointer-events: none;
  }
</style>
