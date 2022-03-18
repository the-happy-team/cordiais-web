<script lang="ts">
  import { EmotionOrder, FilterType, OrderType } from "../types/cordiais.types";
  import { menu as _menu } from "../langs/strings";
  import { onMount } from "svelte";

  export let showAbout = false;

  const menu = _menu["pt"];

  let menuButton: HTMLDivElement;
  let menuButtonHeight: number;

  onMount(() => {
    menuButtonHeight = menuButton.offsetHeight;
  });

  $: menuPosCss = `--menuButtonHeight: ${menuButtonHeight}px;`;
</script>

<div class="menu" style={menuPosCss}>
  <div
    class="menu-button"
    bind:this={menuButton}
    on:click={() => (showAbout = true)}
  >
    {menu.about}
  </div>
  <div class="menu-button disabled" on:click={() => {}}>{menu.sort}</div>
  <div class="menu-button disabled" on:click={() => {}}>{menu.highlight}</div>
  <div class="menu-button disabled" on:click={() => {}}>{menu.texts}</div>
  <div class="menu-button disabled" on:click={() => {}}>{menu.contact}</div>
</div>

<style lang="scss">
  .menu {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: absolute;
    top: 0;
    padding: 0 10%;
    box-sizing: border-box;
    pointer-events: none;
  }

  .menu-button {
    margin-top: calc(100vw * 0.1 - var(--menuButtonHeight));
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
