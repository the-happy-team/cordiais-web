<script lang="ts">
  import { fade } from "svelte/transition";
  import { MenuItemType } from "../types/cordiais.types";
  import { menu as _menu } from "../langs/strings";
  import { language } from "../stores.js";
  import MenuItem from "./MenuItem.svelte";

  export let selectedItem: MenuItemType;
  export let menuButtonHeight: number;
  export let subMenuLocation = 0;

  $: menu = _menu[$language];

  const handleMenuSelection = (i: MenuItemType) => {
    selectedItem = selectedItem == i ? MenuItemType.None : i;
  };

  const handleSubMenuLocation = (e: Event) => {
    subMenuLocation = (e.target as HTMLDivElement).offsetWidth;
  };

  const transitionDuration = 100;

  $: menuPosCss = `--menuButtonHeight: ${menuButtonHeight}px;`;
</script>

<div
  class="menu"
  style={menuPosCss}
  transition:fade={{ duration: transitionDuration }}
>
  <MenuItem
    on:click={() => handleMenuSelection(MenuItemType.Greetings)}
    selected={selectedItem == MenuItemType.Greetings}
  >
    {menu.greetings}
  </MenuItem>

  <MenuItem
    on:click={() => handleMenuSelection(MenuItemType.About)}
    bind:height={menuButtonHeight}
    selected={selectedItem == MenuItemType.About}
  >
    {menu.about}
  </MenuItem>

  <MenuItem
    on:click={() => handleMenuSelection(MenuItemType.OrderBy)}
    on:click={handleSubMenuLocation}
    selected={selectedItem == MenuItemType.OrderBy}
  >
    {menu.sort}
  </MenuItem>

  <MenuItem
    on:click={() => handleMenuSelection(MenuItemType.FilterBy)}
    on:click={handleSubMenuLocation}
    selected={selectedItem == MenuItemType.FilterBy}
  >
    {menu.highlight}
  </MenuItem>

  <MenuItem
    on:click={() => handleMenuSelection(MenuItemType.Info)}
    selected={selectedItem == MenuItemType.Info}
  >
    {menu.info}
  </MenuItem>
</div>

<style lang="scss">
  .menu {
    width: 100%;
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
