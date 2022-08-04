<script lang="ts">
  import { MenuItemType } from "../types/cordiais.types";
  import Modal from "./Modal.svelte";
  import { modal as _modal } from "../langs/strings";
  import { language } from "../stores.js";

  export let selectedMenuItem: MenuItemType = MenuItemType.Greetings;
  export let menuButtonHeight = 0;

  const item2key = (item: MenuItemType) => {
    if (item == MenuItemType.Greetings) return "greetings";
    else if (item == MenuItemType.About) return "about";
    else return "info";
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  $: modalHtml = _modal[item2key(selectedMenuItem)][$language];
  $: modalPosCss = `--menuButtonHeight: ${menuButtonHeight}px;`;
</script>

<Modal on:close>
  <div class="modal-content" on:click={handleClick} style={modalPosCss}>
    {@html modalHtml}
    <div
      class="info-logo-container"
      class:hide={selectedMenuItem != MenuItemType.Info}
    >
      <div class="info-logo funarte" />
    </div>
  </div>
</Modal>

<style lang="scss">
  @import "../sass/globals.scss";

  .modal-content {
    position: relative;
    width: 50%;
    max-height: 80%;
    padding: 20px;
    top: calc(10vw - var(--menuButtonHeight));
    margin-left: 30%;
    right: 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: var(--color-bg);
    overflow-y: scroll;

    @media screen and (max-width: $mobile-max-width) {
      width: 80%;
      top: 0;
      margin: 0 auto;
    }
  }

  :global(.modal-content p) {
    margin: 0.5em 0;
    font-size: 15px;
    text-align: justify;
    line-height: 1.5;

    @media screen and (max-width: $mobile-max-width) {
      font-size: 16px;
      text-align: left;
      line-height: 1.6;
    }
  }

  .info-logo-container {
    width: 100%;
    margin: 16px 0 10px;
    --width-logo-funarte: 45%;
  }

  .info-logo-container.hide {
    display: none;
  }

  .info-logo {
    width: var(--width-logo-funarte);
    background-color: var(--color-bg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }

  .info-logo.funarte {
    padding-bottom: calc(var(--width-logo-funarte) * 125 / 1000);
    background-image: url("../imgs/funarte.png");
  }
</style>
