<script lang="ts">
  import type { CordialType } from "../types/cordiais.types";

  export let obra: CordialType;

  const baseurl = window.location.href.replace(window.location.hash, "");

  $: cssVars = [
    `--imgUrl: url('${baseurl}imgs/obras/${obra.img}');`,
    `--imgHeight: ${100 * (obra.dimension.height / obra.dimension.width)}%;`,
  ].join(" ");
</script>

<div class="obra-image" style={cssVars} />

<style lang="scss">
  .obra-image {
    width: 100%;
    padding-bottom: var(--imgHeight);
    background-image: var(--imgUrl);
    background-position: top left;
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;
  }
</style>
