<script lang="ts">
  import type { CordialType } from "../types/cordiais.types";

  export let obra: CordialType;
  const itemsToShow = [
    "artist",
    "title",
    "year",
    "medium",
    "dimension",
    "collection",
  ];
</script>

<div class="cordial-info">
  {#each itemsToShow as item (item)}
    <div class="obra-item obra-{item}">
      {#if item == "dimension"}
        {obra[item].height} x {obra[item].width} {obra[item].unit}
      {:else}
        {obra[item]}
      {/if}
    </div>
  {/each}
</div>

<style lang="scss">
  .cordial-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .obra-item {
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    @media screen and (max-width: 1025px) and (min-width: 1023px) and (orientation: landscape) {
      font-size: 13px;
    }
  }

  .obra-item.obra-artist {
    font-weight: 600;
  }
  .obra-item.obra-title {
    font-style: italic;
  }
</style>
