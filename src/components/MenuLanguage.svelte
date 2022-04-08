<script lang="ts">
  import { Lang } from "../types/cordiais.types";
  import { lang } from "../stores.js";
  import MenuItem from "./MenuItem.svelte";

  const langList = Object.values(Lang).map((l) => l);
</script>

<div class="menu-lang">
  {#each langList as l (l)}
    <MenuItem on:click={() => ($lang = l)}>{l}</MenuItem>
  {/each}
</div>

<style lang="scss">
  .menu-lang {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    position: absolute;
    top: 0;
    right: 0;
    box-sizing: border-box;
  }
</style>
