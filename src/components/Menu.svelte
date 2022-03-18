<script lang="ts">
  import { menu as _menu } from "../langs/strings";
  import MenuItem from "./MenuItem.svelte";

  export let showAbout = false;
  export let showContact = false;
  export let showOrderMenu = false;

  const menu = _menu["pt"];

  let menuButtonHeight: number;
  $: menuPosCss = `--menuButtonHeight: ${menuButtonHeight}px;`;
</script>

<div class="menu" style={menuPosCss}>
  <MenuItem on:click={() => (showAbout = true)} bind:height={menuButtonHeight}>
    {menu.about}
  </MenuItem>
  <MenuItem on:click={() => (showOrderMenu = true)}>{menu.sort}</MenuItem>
  <MenuItem on:click={() => {}} disabled>{menu.highlight}</MenuItem>
  <MenuItem on:click={() => {}} disabled>{menu.texts}</MenuItem>
  <MenuItem on:click={() => (showContact = true)}>{menu.contact}</MenuItem>
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
