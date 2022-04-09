<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { Languages } from "../types/cordiais.types";
  import { language } from "../stores.js";
  import MenuItem from "./MenuItem.svelte";

  const changeDispatch = createEventDispatcher();
  const langList = Object.values(Languages).map((l) => l);
  const itemHeight = langList.map((_) => 0);

  let el: HTMLDivElement;
  let menuWidth = 0;

  onMount(() => {
    menuWidth = el.offsetWidth;
  });

  const handleLanguageSelection = (l: Languages) => {
    if ($language != l) {
      changeDispatch("languagechange");
      setTimeout(() => ($language = l), 150);
    }
  };

  $: menuPosCss = `--menuHeight: ${itemHeight[0]}px; --menuWidth: ${menuWidth}px`;
</script>

<div class="menu-language" style={menuPosCss} bind:this={el}>
  {#each langList as lang, i (lang)}
    <MenuItem
      on:click={() => handleLanguageSelection(lang)}
      bind:height={itemHeight[i]}
      selected={$language == lang}
    >
      {lang}
    </MenuItem>
  {/each}
</div>

<style lang="scss">
  .menu-language {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    position: absolute;
    top: calc(10vw - var(--menuHeight));
    left: calc(90vw - var(--menuWidth));
    box-sizing: border-box;
  }
</style>
