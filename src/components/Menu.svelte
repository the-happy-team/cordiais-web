<script lang="ts">
  import { MenuItemType } from "../types/cordiais.types";
  import { menu as _menu } from "../langs/strings";
  import MenuItem from "./MenuItem.svelte";

  export let selectedItem: MenuItemType;
  export let orderByWidth = 0;
  export let filterByWidth = 0;

  const menu = _menu["pt"];

  const handleMenuSelection = (i: MenuItemType) => {
    selectedItem = selectedItem == i ? MenuItemType.None : i;
  };

  let menuButtonHeight: number;
  $: menuPosCss = `--menuButtonHeight: ${menuButtonHeight}px;`;
</script>

<div class="menu" style={menuPosCss}>
  <MenuItem
    on:click={() => handleMenuSelection(MenuItemType.About)}
    bind:height={menuButtonHeight}
  >
    {menu.about}
  </MenuItem>

  <MenuItem
    on:click={() => handleMenuSelection(MenuItemType.OrderBy)}
    bind:width={orderByWidth}
  >
    {menu.sort}
  </MenuItem>

  <MenuItem
    on:click={() => handleMenuSelection(MenuItemType.FilterBy)}
    bind:width={filterByWidth}
  >
    {menu.highlight}
  </MenuItem>

  <MenuItem on:click={() => handleMenuSelection(MenuItemType.Texts)} disabled>
    {menu.texts}
  </MenuItem>

  <MenuItem on:click={() => handleMenuSelection(MenuItemType.Contact)}>
    {menu.contact}
  </MenuItem>
</div>

<style lang="scss">
  .menu {
    width: 100vw;
    height: calc(40vw + var(--menuButtonHeight));
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: absolute;
    top: calc(10vw - var(--menuButtonHeight));
    padding: 0 10%;
    box-sizing: border-box;
    pointer-events: none;
  }
</style>
