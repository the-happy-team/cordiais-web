<script lang="ts">
  import { CordialType, EmotionOrder } from "../types/cordiais.types";
  import CordialCanvas from "./CordialCanvas.svelte";
  import CordialInfo from "./CordialInfo.svelte";
  import CordialObraImage from "./CordialObraImage.svelte";
  import EmotionSelection from "./EmotionSelection.svelte";
  import Modal from "./Modal.svelte";

  export let obra: CordialType;
  let selectedEmotion = EmotionOrder[0];

  const handleClick = (e) => {
    e.stopPropagation();
  };
</script>

<Modal visible={obra != null} on:close={() => (obra = null)}>
  <div class="cordial-modal" on:click={handleClick}>
    <div class="modal-content">
      <div class="image-container">
        <CordialObraImage {obra} />
      </div>

      <div class="emotion-selection-container">
        <CordialInfo {obra} />
        <div class="space" />
        <EmotionSelection {obra} bind:selectedEmotion />
      </div>

      <div class="canvas-container">
        <CordialCanvas {obra} {selectedEmotion} />
      </div>
    </div>
  </div>
</Modal>

<style lang="scss">
  .cordial-modal {
    position: relative;
    width: 80%;
    height: 80%;
    top: 10%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #fff;
    overflow-y: hidden;
  }

  .modal-content {
    width: 100%;
    flex-grow: 1;
    flex-basis: 0;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;

    .image-container {
      flex-grow: 1;
      flex-basis: 0;
      height: 100%;
      box-sizing: border-box;
    }

    .emotion-selection-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      flex-basis: 0;
      height: 100%;
      box-sizing: border-box;

      .space {
        height: 5%;
      }
    }

    .canvas-container {
      position: relative;
      flex-grow: 1;
      flex-basis: 0;
      height: 100%;
      box-sizing: border-box;
    }
  }
</style>
