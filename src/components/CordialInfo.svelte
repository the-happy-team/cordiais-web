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
    <div class="obra-item">
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
  }
</style>
