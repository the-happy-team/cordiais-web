<script lang="ts">
  import { CordialType, EmotionOrder } from "../types/cordiais.types";
  import CordialCanvas from "./CordialCanvas.svelte";
  import CordialInfo from "./CordialInfo.svelte";
  import CordialObraImage from "./CordialObraImage.svelte";
  import EmotionSelection from "./EmotionSelection.svelte";

  export let obra: CordialType;
  export let selectedEmotion = EmotionOrder[0];

  let modalWidth = 0;
  let modalHeight = 0;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let infoWidth = 0;
  let infoHeight = 0;
  let infoPadding = 16;

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const calculateSizes = (obra: CordialType) => {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const modal = {
      width: 0.8 * viewport.width,
      height: 0,
    };

    const canvas = {
      width: modal.width / 3.0,
      height: 0,
    };

    const obraRatioHeight = obra.dimension.height / obra.dimension.width;
    canvas.height = canvas.width * obraRatioHeight;

    const info = {
      width: canvas.width,
      height: canvas.height,
    };

    modal.height = canvas.height;

    if (modal.height > 0.9 * viewport.height) {
      modal.height = 0.9 * viewport.height;
      canvas.height = modal.height;
      canvas.width = canvas.height / obraRatioHeight;
      info.height = modal.height;
      info.width = modal.width - 2 * canvas.width;
    }

    modalWidth = modal.width;
    modalHeight = modal.height;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    infoWidth = info.width;
    infoHeight = info.height;
  };

  $: calculateSizes(obra);
  $: cssVars = [
    `--modalWidth: ${modalWidth}px;`,
    `--modalHeight: ${modalHeight}px;`,
    `--canvasWidth: ${canvasWidth}px;`,
    `--canvasHeight: ${canvasHeight}px;`,
    `--infoWidth: ${infoWidth}px;`,
    `--infoHeight: ${infoHeight}px;`,
    `--infoPadding: ${infoPadding}px;`,
  ].join(" ");
</script>

<div class="cordial-modal" style={cssVars}>
  <div class="modal-content" on:click={handleClick}>
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

<style lang="scss">
  .cordial-modal {
    width: var(--modalWidth);
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;

    .modal-content {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      box-sizing: border-box;

      .image-container {
        width: var(--canvasWidth);
        height: var(--canvasHeight);
        box-sizing: border-box;
        overflow: hidden;
      }

      .emotion-selection-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: var(--infoWidth);
        min-height: var(--infoHeight);
        background-color: var(--color-bg);
        box-sizing: border-box;
        padding: var(--infoPadding) 0;

        .space {
          height: var(--infoPadding);
        }
      }

      .canvas-container {
        width: var(--canvasWidth);
        height: var(--canvasHeight);
        box-sizing: border-box;
        overflow: hidden;
      }
    }
  }
</style>
