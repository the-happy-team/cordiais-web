<script lang="ts">
  import { CordialType, EmotionOrder } from "../types/cordiais.types";
  import CordialCanvas from "./CordialCanvas.svelte";
  import CordialInfo from "./CordialInfo.svelte";
  import CordialObraImage from "./CordialObraImage.svelte";
  import EmotionSelection from "./EmotionSelection.svelte";

  export let obra: CordialType;
  export let selectedEmotion = EmotionOrder[0];

  let horizontal = false;
  let modalWidth = 0;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let infoPadding = 16;
  let spaceMargin = 13;

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const calculateSizes = (obra: CordialType) => {
    const obraRatioHeight = obra.dimension.height / obra.dimension.width;
    horizontal = obraRatioHeight < 1.0;

    modalWidth = 0.8 * window.innerWidth;

    canvasWidth = horizontal ? modalWidth : modalWidth / 2;
    canvasHeight = canvasWidth * obraRatioHeight;
  };

  $: calculateSizes(obra);
  $: cssVars = [
    `--modalWidth: ${modalWidth}px;`,
    `--canvasWidth: ${canvasWidth}px;`,
    `--canvasHeight: ${canvasHeight}px;`,
    `--infoPadding: ${infoPadding}px;`,
    `--spaceMargin: ${spaceMargin}px;`,
  ].join(" ");
</script>

<div class="cordial-modal" style={cssVars}>
  <div class="modal-content" on:click={handleClick}>
    <div class="canvases-container" class:horizontal>
      <div class="canvas-container">
        <CordialObraImage {obra} />
      </div>

      <div class="canvas-container">
        <CordialCanvas {obra} {selectedEmotion} />
      </div>
    </div>

    <div class="emotion-selection-container">
      <CordialInfo {obra} />
      <div class="space" />
      <EmotionSelection {obra} bind:selectedEmotion />
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
      flex-direction: column;
      box-sizing: border-box;
      overflow: scroll;
      scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar{
        display: none;
      }

      .canvases-container {
        display: flex;
        flex-direction: row;

        &.horizontal {
          flex-direction: column;
        }

        .canvas-container {
          width: var(--canvasWidth);
          height: var(--canvasHeight);
          box-sizing: border-box;
        }
      }

      .emotion-selection-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: var(--modalWidth);
        background-color: var(--color-bg);
        box-sizing: border-box;
        padding: var(--infoPadding);

        .space {
          width: 12%;
          height: 0;
          border-bottom: 2px solid #000;
          margin: var(--spaceMargin) auto;
        }
      }
    }
  }
</style>
