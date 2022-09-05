<script lang="ts">
  import { CordialType, EmotionOrder } from "../types/cordiais.types";

  export let obra: CordialType;
  export let selectedEmotion = EmotionOrder[0];

  let obraCanvas: HTMLCanvasElement;

  const sizeCanvas = (_: CordialType) => {
    if (!obraCanvas) return;
    obraCanvas.setAttribute("width", `${2 * obraCanvas.offsetWidth + 5}`);
    obraCanvas.setAttribute("height", `${2 * obraCanvas.offsetHeight + 5}`);
  };

  const drawCanvas = (selectedEmotionValue: number, obraColor: string) => {
    if (!obraCanvas) return;

    // clear canvas
    const ctx = obraCanvas.getContext("2d");
    ctx.fillStyle = "#7f7f7f";
    ctx.fillRect(0, 0, obraCanvas.width, obraCanvas.height);

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

    ctx.fillStyle = "#7f7f7f";
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
    const squareThreshold = 0.7;

    const obraShape = {
      height: obraBackground.height - 2 * borderWidth,
      width: obraBackground.width - 2 * borderWidth,
      x: obraBackground.x + borderWidth,
      y: obraBackground.y + borderWidth,
      color: obraColor,
    };

    if (
      squareSide < squareThreshold * obraBackground.width &&
      squareSide < squareThreshold * obraBackground.height
    ) {
      obraShape.height = squareSide;
      obraShape.width = squareSide;
      obraShape.x = obraBackground.x + (obraBackground.width - squareSide) / 2;
      obraShape.y = obraBackground.y + (obraBackground.height - squareSide) / 2;
    }

    ctx.fillStyle = obraShape.color;
    ctx.fillRect(obraShape.x, obraShape.y, obraShape.width, obraShape.height);
  };

  $: sizeCanvas(obra);
  $: drawCanvas(obra.emotions[selectedEmotion], obra.dominant_color);
</script>

<canvas width="0" height="0" class="obra-canvas" bind:this={obraCanvas} />

<style lang="scss">
  .obra-canvas {
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
</style>
