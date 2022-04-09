<script lang="ts">
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const closeDispatch = createEventDispatcher();

  const handleClose = () => {
    setTimeout(() => closeDispatch("close"), 120);
  };
</script>

<div
  class="modal-background"
  on:click={handleClose}
  transition:fade={{ duration: 120 }}
>
  <slot />
</div>

<style lang="scss">
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.333);
    box-sizing: border-box;
  }
</style>
