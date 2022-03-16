<script lang="ts">
  import { onMount } from "svelte/internal";
  import type { CordialType } from "../types/cordiais.types";
  import { EmotionOrder } from "../types/cordiais.types";
  import EmotionSelection from "./EmotionSelection.svelte";
  import Modal from "./Modal.svelte";

  export let obra: CordialType;

  const baseurl = window.location.href.replace(window.location.hash, "");

  let obraCanvas: HTMLCanvasElement;

  let selectedEmotion = EmotionOrder[0];
  let selectedEmotionValue: number;

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const drawCanvas = () => {
    if (!obraCanvas) return;

    const emo2color = (emo: string) => {
      if (emo == "neutral") return "#7f7f7f";
      else return "#000000";
    };

    // clear canvas
    const ctx = obraCanvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, obraCanvas.width, obraCanvas.height);

    if (!obra.dimension.width || !obra.dimension.height) return;

    // calculate background w,h
    const obraRatio = obra.dimension.width / obra.dimension.height;
    const obraBackground = {
      height: obraCanvas.height,
      width: obraRatio * obraCanvas.height,
      x: 0,
      y: 0,
    };

    if (obraBackground.width > obraCanvas.width) {
      obraBackground.width = obraCanvas.width;
      obraBackground.height = obraBackground.width / obraRatio;
    }

    obraBackground.x = (obraCanvas.width - obraBackground.width) / 2;
    obraBackground.y = 0;

    ctx.fillStyle = emo2color("neutral");
    ctx.fillRect(
      obraBackground.x,
      obraBackground.y,
      obraBackground.width,
      obraBackground.height
    );

    // calculate color rectangle
    const obWpH = obraBackground.width + obraBackground.height;
    const obWH = obraBackground.width * obraBackground.height;
    const emoNorm = 1.0 - 0.01 * selectedEmotionValue;
    const borderWidth =
      0.25 * (obWpH - Math.sqrt(obWpH * obWpH - 4 * emoNorm * obWH));

    const obraColor = {
      height: obraBackground.height - 2 * borderWidth,
      width: obraBackground.width - 2 * borderWidth,
      x: obraBackground.x + borderWidth,
      y: obraBackground.y + borderWidth,
    };

    ctx.fillStyle = emo2color(selectedEmotion);
    ctx.fillRect(obraColor.x, obraColor.y, obraColor.width, obraColor.height);
  };

  onMount(() => {
    obraCanvas.setAttribute("width", `${2 * obraCanvas.offsetWidth}`);
    obraCanvas.setAttribute("height", `${2 * obraCanvas.offsetHeight}`);
  });

  $: obraImgCss = `--obraImgUrl: url('${baseurl}imgs/obras/${obra.img}');`;

  $: if (selectedEmotion) {
    console.log("emo changed");
    selectedEmotionValue = obra.emotions[selectedEmotion];
    drawCanvas();
  }
</script>

<Modal visible={obra != null} on:close={() => (obra = null)}>
  <div class="cordial-modal" on:click={handleClick}>
    <div>{obra.artist} - {obra.title} ({obra.year})</div>
    <div class="images-container">
      <div class="image-container" style={obraImgCss}>
        <div class="obra-image" />
      </div>

      <div class="emotion-selection-container">
        <EmotionSelection bind:selectedEmotion {obra} />
      </div>

      <div class="canvas-container">
        <canvas class="obra-canvas" bind:this={obraCanvas} />
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

  .images-container {
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

      .obra-image {
        width: 100%;
        height: 100%;
        background-image: var(--obraImgUrl);
        background-position: top left;
        background-repeat: no-repeat;
        background-size: contain;
        box-sizing: border-box;
      }
    }

    .emotion-selection-container {
      flex-grow: 1;
      flex-basis: 0;
      box-sizing: border-box;
    }

    .canvas-container {
      position: relative;
      flex-grow: 1;
      flex-basis: 0;
      height: 100%;
      box-sizing: border-box;

      .obra-canvas {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
    }
  }
</style>
