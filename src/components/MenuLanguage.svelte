<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { Languages } from "../types/cordiais.types";
  import { language } from "../stores.js";
  import MenuItem from "./MenuItem.svelte";

  const changeDispatch = createEventDispatcher();
  const langList = Object.values(Languages).map((l) => l);
  const itemHeight = langList.map((_) => 0);

  let el: HTMLDivElement;
  let menuWidth = 0;

  const transitionDelay = 120;
  const transitionDuration = 100;

  const checkHash = () => {
    const hash = window.location.hash;
    if (hash.endsWith("en")) {
      localStorage.setItem("cordiais-lang", Languages.EN);
    } else if (hash.endsWith("pt")) {
      localStorage.setItem("cordiais-lang", Languages.PT);
    }
  };

  const loadFromLocalStorage = () => {
    const lsLang = localStorage.getItem("cordiais-lang");
    if (lsLang != null) {
      handleLanguageSelection(lsLang == "en" ? Languages.EN : Languages.PT);
    } else {
      localStorage.setItem("cordiais-lang", $language);
    }
  };

  onMount(() => {
    menuWidth = el.offsetWidth;
    checkHash();
    loadFromLocalStorage();
  });

  const handleLanguageSelection = (l: Languages) => {
    if ($language != l) {
      localStorage.setItem("cordiais-lang", l);
      changeDispatch("languagechange");
      setTimeout(() => ($language = l), transitionDelay);
    }
  };

  $: menuPosCss = `--menuHeight: ${itemHeight[0]}px; --menuWidth: ${menuWidth}px`;
</script>

<div
  class="menu-language"
  style={menuPosCss}
  transition:fade={{ duration: transitionDuration }}
  bind:this={el}
>
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
