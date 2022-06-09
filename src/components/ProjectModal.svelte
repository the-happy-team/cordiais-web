<script lang="ts">
  import Modal from "./Modal.svelte";
  import { project as _project } from "../langs/strings";
  import { language } from '../stores.js';

  $: projectHtml = _project[$language];

  const handleClick = (e) => {
    e.stopPropagation();
  };
</script>

<Modal on:close>
  <div class="project-modal" on:click={handleClick}>
    {@html projectHtml}
  </div>
</Modal>

<style lang="scss">
  .project-modal {
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
</style>
