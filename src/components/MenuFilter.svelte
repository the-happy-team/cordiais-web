<script lang="ts">
  import { fade } from "svelte/transition";
  import { FilterType } from "../types/cordiais.types";
  import { menu as _menu } from "../langs/strings";
  import { language } from "../stores.js";
  import MenuItem from "./MenuItem.svelte";

  export let filterBy: FilterType;
  export let left = 0;

  $: menu = _menu[$language];

  const filters = Object.keys(FilterType).filter(
    (v) => FilterType[v] != FilterType.NoFilter
  );

  const itemHeight: Array<number> = filters.map((_, i) => i);

  const handleItemClick = (f: FilterType) => {
    filterBy = filterBy == f ? FilterType.NoFilter : f;
  };

  $: menuPosCss = `--menuButtonHeight: ${itemHeight[0]}px; --menuPosLeft: ${left}px`;
</script>

<div class="menu-filter" style={menuPosCss} transition:fade={{ duration: 120 }}>
  {#each filters as fil, i (fil)}
    <MenuItem
      on:click={() => handleItemClick(FilterType[fil])}
      bind:height={itemHeight[i]}
      selected={filterBy == FilterType[fil]}
    >
      {menu[fil]}
    </MenuItem>
  {/each}
</div>

<style lang="scss">
  .menu-filter {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: absolute;
    top: calc(30vw - var(--menuButtonHeight));
    left: calc(10vw + var(--menuPosLeft) - 1px);
    padding: 0;
    box-sizing: border-box;
    pointer-events: none;
  }
</style>
