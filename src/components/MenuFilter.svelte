<script lang="ts">
  import { FilterType } from "../types/cordiais.types";
  import { menu as _menu } from "../langs/strings";
  import MenuItem from "./MenuItem.svelte";

  export let filterBy: FilterType;

  const menu = _menu["pt"];

  let filters = Object.keys(FilterType).filter(
    (v) => FilterType[v] != FilterType.NoFilter
  );

  let itemHeight: Array<number> = filters.map((_, i) => i);

  const handleItemClick = (f: FilterType) => {
    filterBy = filterBy == f ? FilterType.NoFilter : f;
  };

  $: menuPosCss = `--menuButtonHeight: ${itemHeight[0]}px;`;
</script>

<div class="menu" style={menuPosCss}>
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
  .menu {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: absolute;
    top: calc(50vw - var(--menuButtonHeight));
    left: 30%;
    padding: 0;
    box-sizing: border-box;
    pointer-events: none;
  }
</style>
