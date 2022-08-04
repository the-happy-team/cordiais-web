<script lang="ts">
  import { language } from "../stores.js";
  import { Languages } from "../types/cordiais.types";
  new window.VLibras.Widget("https://vlibras.gov.br/app");
</script>

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
