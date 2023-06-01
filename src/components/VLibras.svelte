<script lang="ts">
  import { onMount } from "svelte";
  import { language } from "../stores.js";
  import { Languages } from "../types/cordiais.types";
  import ScriptLoader from "./ScriptLoader.svelte";

  let mScriptLoader: ScriptLoader;

  onMount(() => {
    mScriptLoader
      .loadScript("https://vlibras.gov.br/app/vlibras-plugin.js")
      .then(() => new window.VLibras.Widget("https://vlibras.gov.br/app"));
  });
</script>

<ScriptLoader bind:this={mScriptLoader} />

<div class="vlibras-container" class:hide={$language !== Languages.PT}>
  <div vw class="enabled">
    <div vw-access-button class="active" />
    <div vw-plugin-wrapper>
      <div class="vw-plugin-top-wrapper" />
    </div>
  </div>
</div>

<style lang="scss">
  @import "../sass/globals.scss";

  .vlibras-container {
    @media screen and (max-width: $mobile-max-width) {
      display: none;
    }

    &.hide {
      display: none;
    }
  }
</style>
