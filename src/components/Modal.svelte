<script lang="ts">
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  export let visible = false;
  const closeDispatch = createEventDispatcher();

  const handleClose = () => {
    visible = false;
    setTimeout(() => closeDispatch("close"), 120);
  };
</script>

{#if visible}
  <div
    class="modal-background"
    on:click={handleClose}
    transition:fade={{ duration: 120 }}
  >
    <slot />
  </div>
{/if}

<style lang="scss">
  .modal-background {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.333);
    box-sizing: border-box;
  }
</style>
