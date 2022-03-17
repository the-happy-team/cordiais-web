<script lang="ts">
  import type { CordialType } from "../types/cordiais.types";

  export let obra: CordialType;

  const splitTitle = (t) => {
  // TODO: split tile
  return t;
  };
</script>

<div class="cordial-info">
  <div>{obra.artist}</div>
  <div>{splitTitle(obra.title)}, {obra.year}</div>
  <div>{obra.medium}</div>
  <div>{obra.dimension.height} x {obra.dimension.width} {obra.dimension.unit}</div>
  <div>{obra.collection}</div>
</div>

<style lang="scss">
  .cordial-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
