<script lang="ts">
  import { onMount } from "svelte/internal";
  import { CordialType, EmotionOrder } from "../types/cordiais.types";

  export let obra: CordialType;
  export let selectedEmotion = EmotionOrder[0];

  let obraCanvas: HTMLCanvasElement;

  const drawCanvas = (selectedEmotionValue: number) => {
    if (!obraCanvas) return;

    const emo2color = (emo: string) => {
      if (emo == "background") return "#7f7f7f";
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

    obraBackground.x = obraCanvas.width - obraBackground.width;
    obraBackground.y = 0;

    ctx.fillStyle = emo2color("background");
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
    const squareSide = Math.sqrt(0.01 * selectedEmotionValue * obWH);
    const squareThreshold = 0.8;

    const obraColor = {
      height: obraBackground.height - 2 * borderWidth,
      width: obraBackground.width - 2 * borderWidth,
      x: obraBackground.x + borderWidth,
      y: obraBackground.y + borderWidth,
    };

    if (
      squareSide < squareThreshold * obraBackground.width &&
      squareSide < squareThreshold * obraBackground.height
    ) {
      obraColor.height = squareSide;
      obraColor.width = squareSide;
      obraColor.x = obraBackground.x + (obraBackground.width - squareSide) / 2;
      obraColor.y = obraBackground.y + (obraBackground.height - squareSide) / 2;
    }

    ctx.fillStyle = emo2color(selectedEmotion);
    ctx.fillRect(obraColor.x, obraColor.y, obraColor.width, obraColor.height);
  };

  onMount(() => {
    obraCanvas.setAttribute("width", `${2 * obraCanvas.offsetWidth}`);
    obraCanvas.setAttribute("height", `${2 * obraCanvas.offsetHeight}`);
  });

  $: drawCanvas(obra.emotions[selectedEmotion]);
</script>

<canvas class="obra-canvas" bind:this={obraCanvas} />

<style lang="scss">
  .obra-canvas {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
</style>
