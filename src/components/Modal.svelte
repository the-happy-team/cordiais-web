<script lang="ts">
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const transitionDuration = 100;
  const closeDispatch = createEventDispatcher();

  const handleClose = () => {
    setTimeout(() => closeDispatch("close"), transitionDuration);
  };
</script>

<div
  class="modal-background"
  on:click={handleClose}
  transition:fade={{ duration: transitionDuration }}
>
  <slot />
</div>

<style lang="scss">
  @import "../sass/globals.scss";

  .modal-background {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.333);
    box-sizing: border-box;

    @media screen and (max-width: $mobile-max-width) {
      justify-content: flex-end;
    }
  }
</style>
