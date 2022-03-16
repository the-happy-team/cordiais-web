<script lang="ts">
  import type { CordialType } from "../types/cordiais.types";
  import { EmotionOrder } from "../types/cordiais.types";
  import CordialCanvas from "./CordialCanvas.svelte";
  import EmotionSelection from "./EmotionSelection.svelte";
  import Modal from "./Modal.svelte";

  export let obra: CordialType;

  const baseurl = window.location.href.replace(window.location.hash, "");

  let selectedEmotion = EmotionOrder[0];

  const handleClick = (e) => {
    e.stopPropagation();
  };

  $: obraImgCss = `--obraImgUrl: url('${baseurl}imgs/obras/${obra.img}');`;
</script>

<Modal visible={obra != null} on:close={() => (obra = null)}>
  <div class="cordial-modal" on:click={handleClick}>
    <div>{obra.artist} - {obra.title} ({obra.year})</div>
    <div class="images-container">
      <div class="image-container" style={obraImgCss}>
        <div class="obra-image" />
      </div>

      <div class="emotion-selection-container">
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
    }
  }
</style>
