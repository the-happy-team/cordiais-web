<script lang="ts">
  import { onMount } from "svelte/internal";
  import { CordialType, EmotionOrder } from "../types/cordiais.types";

  export let obra: CordialType;

  let selectedEmotion: string;
  let selectedAmout: number;
  let colorWidth: string = "0";
  let colorHeight: string = "0";
  let obraCanvas: HTMLCanvasElement;

  let vizType: string = "border";

  const selectTopEmotion = (o: CordialType) => {
    selectedEmotion = EmotionOrder.reduce((a, b) =>
      o.emotions[a] > o.emotions[b] ? a : b
    );
  };

  const drawCanvas = (vtype, _) => {
    if (!obraCanvas) return;

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
    // obraBackground.y = (obraCanvas.height - obraBackground.height) / 2;
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
    const emoNorm = 1.0 - 0.01 * selectedAmout;
    const borderWidth =
      0.25 * (obWpH - Math.sqrt(obWpH * obWpH - 4 * emoNorm * obWH));

    const obraColor = {
      height: obraBackground.height - 2 * borderWidth,
      width: obraBackground.width - 2 * borderWidth,
      x: obraBackground.x + borderWidth,
      y: obraBackground.y + borderWidth,
    };

    // calculate color dimensions
    const cmPerPixel = obra.dimension.width / obraBackground.width;
    const borderWidthCm = borderWidth * cmPerPixel;
    colorWidth = (obra.dimension.width - 2 * borderWidthCm).toFixed(2);
    colorHeight = (obra.dimension.height - 2 * borderWidthCm).toFixed(2);

    if (vtype == "square") {
      obraColor.height = Math.sqrt(0.01 * selectedAmout * obWH);
      obraColor.width = obraColor.height;
      obraColor.x = obraBackground.x + (obraBackground.width - obraColor.width) / 2;
      obraColor.y = obraBackground.y + (obraBackground.height - obraColor.height) / 2;
      colorWidth = (obraColor.width * cmPerPixel).toFixed(2);
      colorHeight = (obraColor.height * cmPerPixel).toFixed(2);
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(obraColor.x, obraColor.y, obraColor.width, obraColor.height);
  };

  onMount(() => {
    obraCanvas.setAttribute("width", `${2 * obraCanvas.offsetWidth}`);
    obraCanvas.setAttribute("height", `${2 * obraCanvas.offsetHeight}`);
    drawCanvas(vizType, selectedAmout);
  });

  $: selectTopEmotion(obra);
  $: selectedAmout = obra.emotions[selectedEmotion];
  $: drawCanvas(vizType, selectedAmout);
</script>

<div class="cordial">
  <div class="artist">{obra.artist}</div>
  <div class="title">{obra.title}, {obra.year}</div>
  <div class="medium">{obra.medium}</div>
  <div class="dimension">
    {`${obra.dimension.height} x ${obra.dimension.width} ${obra.dimension.unit}`}
  </div>

  <div class="collection">{obra.collection}</div>

  <div class="emotion-list-container">
    <div class="emotion-list">
      {#each EmotionOrder as e}
        <label class="emotion-option" class:selected={selectedEmotion == e}>
          <input
            type="radio"
            bind:group={selectedEmotion}
            name="emotions"
            value={e}
          />
          {`${e}: ${obra.emotions[e]}`}
        </label>
      {/each}
    </div>
    <div class="viz-type-selection">
      Tipo de Visualização:
      <label>
        <input type=radio bind:group={vizType} name="vizType" value={"border"}>
        Bordas Iguais
      </label>

      <label>
        <input type=radio bind:group={vizType} name="vizType" value={"square"}>
        Quadrado
      </label>
    </div>
  </div>

  <div class="images-container">
    <div
      class="image"
      style={`background-image: url('./imgs/obras/${obra.img}');`}
    />

    <div class="canvas-container">
      <canvas class="obra-canvas" bind:this={obraCanvas} />
      <div class="new-dims">
        {`${colorHeight} x ${colorWidth} ${obra.dimension.unit}`}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .cordial {
    .title {
      font-style: italic;
    }
    .artist {
      font-weight: 800;
    }
    .collection {
      color: hotpink;
    }

    .emotion-list-container {
      width: 100%;
      max-width: 600px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 10px 0;

      .emotion-list {
        width: max-content;
      }

      .viz-type-selection {
        margin-left: 12px;
      }
    }

    .emotion-option {
      cursor: pointer;
      line-height: 1.4;

      &.selected {
        color: cadetblue;
      }
      input[type="radio"] {
        display: none;
      }
    }

    .images-container {
      width: 100%;
      height: 300px;
      display: flex;
      flex-direction: row;
      box-sizing: border-box;

      .image {
        width: 33%;
        height: 100%;
        background-position: top left;
        background-repeat: no-repeat;
        background-size: contain;
      }

      .canvas-container {
        position: relative;
        width: 60%;
        height: 100%;

        .obra-canvas {
          width: 100%;
          height: 100%;
        }

        .new-dims {
          position: absolute;
          bottom: 0;
          right: 0;
          font-size: 14px;
        }
      }
    }
  }
</style>
