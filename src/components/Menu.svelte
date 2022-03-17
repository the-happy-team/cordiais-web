<script lang="ts">
  import {
    EmotionOrder,
    FilterType,
    OrderType,
  } from "../types/cordiais.types";

  export let showAbout = false;
</script>

<div class="menu">
  <div class="menu-button-wrapper">
    <div class="menu-button" on:click={() => (showAbout = true)}>about</div>
  </div>
  <div class="menu-button-wrapper">
    <div class="menu-button disabled" on:click={() => {}}>arrage by emotions</div>
  </div>
  <div class="menu-button-wrapper">
    <div class="menu-button disabled" on:click={() => {}}>highlight</div>
  </div>
  <div class="menu-button-wrapper">
    <div class="menu-button disabled" on:click={() => {}}>texts</div>
  </div>
  <div class="menu-button-wrapper">
    <div class="menu-button disabled" on:click={() => {}}>contact</div>
  </div>
</div>

<style lang="scss">
  .menu {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: calc(100vw * 0.5);
    padding: 0 10%;
    box-sizing: border-box;
    pointer-events: none;
  }

  .menu-button-wrapper {
    flex-basis: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .menu-button {
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
      }
    }
  }
</style>
