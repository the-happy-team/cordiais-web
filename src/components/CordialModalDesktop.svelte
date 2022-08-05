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
  let horizontal = false;

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const calculateSizes = (obra: CordialType) => {
    // const isHorizontal = obra.dimension.width > obra.dimension.height;
    const isHorizontal = false;

    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const modal = {
      width: isHorizontal ? 0.4 * viewport.width : 0.8 * viewport.width,
      height: 0,
    };

    const canvas = {
      width: isHorizontal ? modal.width : modal.width / 3.0,
      height: 0,
    };

    const obraRatioHeight = obra.dimension.height / obra.dimension.width;
    canvas.height = canvas.width * obraRatioHeight;

    const info = {
      width: canvas.width,
      height: isHorizontal ? 0.3 * viewport.height : canvas.height,
    };

    const modalHeightHorizontal = info.height + 2.0 * canvas.height;
    const modalHeightVertical = canvas.height;

    modal.height = isHorizontal ? modalHeightHorizontal : modalHeightVertical;

    if (modal.height > 0.9 * viewport.height) {
      modal.height = 0.9 * viewport.height;
      if (isHorizontal) {
        canvas.height = (modal.height - info.height) / 2;
        canvas.width = canvas.height / obraRatioHeight;
      } else {
        canvas.height = modal.height;
        info.height = modal.height;
        canvas.width = canvas.height / obraRatioHeight;
        info.width = modal.width - 2 * canvas.width;
      }
    }

    modalWidth = modal.width;
    modalHeight = modal.height;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    infoWidth = info.width;
    infoHeight = info.height;
    horizontal = isHorizontal;
  };

  $: calculateSizes(obra);
  $: cssVars = [
    `--modalWidth: ${modalWidth}px;`,
    `--modalHeight: ${modalHeight}px;`,
    `--canvasWidth: ${canvasWidth}px;`,
    `--canvasHeight: ${canvasHeight}px;`,
    `--infoWidth: ${infoWidth}px;`,
    `--infoHeight: ${infoHeight}px;`,
  ].join(" ");
</script>

<div class="cordial-modal" style={cssVars}>
  <div class="modal-content" on:click={handleClick} class:horizontal>
    <div class="image-container">
      <CordialObraImage {obra} />
    </div>

    <div class="emotion-selection-container" class:horizontal>
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
      height: var(--modalHeight);
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      background-color: var(--color-bg);
      overflow: hidden;

      &.horizontal {
        flex-direction: column;
      }

      .image-container {
        width: var(--canvasWidth);
        height: var(--canvasHeight);
        box-sizing: border-box;
      }

      .emotion-selection-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: var(--infoWidth);
        height: var(--infoHeight);
        box-sizing: border-box;

        .space {
          height: 5%;
        }

        &.horizontal {
          flex-direction: row;

          .space {
            display: none;
          }
        }
      }

      .canvas-container {
        width: var(--canvasWidth);
        height: var(--canvasHeight);
        box-sizing: border-box;
      }
    }
  }
</style>
