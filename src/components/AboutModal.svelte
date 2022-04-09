<script lang="ts">
  import Modal from "./Modal.svelte";
  import { about as _about } from "../langs/strings";
  import { language } from '../stores.js';

  $: aboutHtml = _about[$language];

  const handleClick = (e) => {
    e.stopPropagation();
  };
</script>

<Modal on:close>
  <div class="about-modal" on:click={handleClick}>
    {@html aboutHtml}
  </div>
</Modal>

<style lang="scss">
  .about-modal {
    position: relative;
    width: 50%;
    height: 90%;
    top: 5%;
    margin-left: 33%;
    right: 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #fff;
    overflow-y: hidden;
  }
</style>
