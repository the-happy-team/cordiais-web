<script lang="ts">
  import { MenuItemType } from "../types/cordiais.types";
  import Modal from "./Modal.svelte";
  import { modal as _modal } from "../langs/strings";
  import { language } from "../stores.js";

  export let selectedMenuItem: MenuItemType = MenuItemType.Greetings;

  const item2key = (item: MenuItemType) => {
    if (item == MenuItemType.Greetings) return "greetings";
    else if (item == MenuItemType.About) return "about";
    else return "info";
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  $: modalHtml = _modal[item2key(selectedMenuItem)][$language];
</script>

<Modal on:close>
  <div class="modal-content" on:click={handleClick}>
    {@html modalHtml}
  </div>
</Modal>

<style lang="scss">
  .modal-content {
    position: relative;
    width: 50%;
    max-height: 80%;
    padding: 20px;
    top: 5%;
    margin-left: 30%;
    right: 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: var(--color-bg);
    overflow-y: scroll;
  }

  :global(.modal-content p) {
    margin: 0.5em 0;
    font-size: 15px;
    text-align: justify;
    line-height: 1.5;
  }
</style>
