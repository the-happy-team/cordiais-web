<script lang="ts">
  import { MenuItemType } from "../types/cordiais.types";
  import { menu as _menu } from "../langs/strings";
  import { lang } from "../stores.js";
  import MenuItem from "./MenuItem.svelte";

  export let selectedItem: MenuItemType;
  export let subMenuLocation = 0;

  $: menu = _menu[$lang];

  const handleMenuSelection = (i: MenuItemType) => {
    selectedItem = selectedItem == i ? MenuItemType.None : i;
  };

  const handleSubMenuLocation = (e: Event) => {
    subMenuLocation = (e.target as HTMLDivElement).offsetWidth;
  };

  let menuButtonHeight: number;
  $: menuPosCss = `--menuButtonHeight: ${menuButtonHeight}px;`;
</script>

<div class="menu" style={menuPosCss}>
  <MenuItem on:click={() => handleMenuSelection(MenuItemType.Project)}>
    {menu.project}
  </MenuItem>

  <MenuItem
    on:click={() => handleMenuSelection(MenuItemType.OrderBy)}
    on:click={handleSubMenuLocation}
  >
    {menu.sort}
  </MenuItem>

  <MenuItem
    on:click={() => handleMenuSelection(MenuItemType.FilterBy)}
    on:click={handleSubMenuLocation}
  >
    {menu.highlight}
  </MenuItem>

  <MenuItem on:click={() => handleMenuSelection(MenuItemType.Texts)} disabled>
    {menu.texts}
  </MenuItem>

  <MenuItem
    on:click={() => handleMenuSelection(MenuItemType.About)}
    bind:height={menuButtonHeight}
  >
    {menu.about}
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
