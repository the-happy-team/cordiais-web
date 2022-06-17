<script lang="ts">
  import type { CordialType } from "../types/cordiais.types";

  export let obra: CordialType;

  const baseurl = `${window.location.origin}${window.location.pathname}`;

  $: cssVars = [`--imgUrl: url('${baseurl}imgs/obras/${obra.img}');`].join(" ");
</script>

<div class="obra-image" style={cssVars} />

<style lang="scss">
  .obra-image {
    width: 100%;
    height: 100%;
    background-image: var(--imgUrl);
    background-position: left top;
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;
  }
</style>
