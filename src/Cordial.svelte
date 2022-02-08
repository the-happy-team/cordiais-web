<script lang="ts">
  import type { CordialType } from "./types/cordiais.types";
  import { EmotionOrder } from "./types/cordiais.types";

  export let obra: CordialType;

  let selectedEmotion: string;

  let selectTopEmotion = (o: CordialType) => {
    selectedEmotion = EmotionOrder.reduce((a, b) =>
      o.emotions[a] > o.emotions[b] ? a : b
    );
  };

  $: selectTopEmotion(obra);
</script>

<div class="cordial">
  <div class="artist">{obra.artist}</div>
  <div class="title">{obra.title}, {obra.year}</div>
  <div class="medium">{obra.medium}</div>
  <div class="dimension">
    {`${obra.dimension.width} x ${obra.dimension.height} ${obra.dimension.unit}`}
  </div>

  <div class="collection">{obra.collection}</div>

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

  <div class="images-container">
    <div
      class="image"
      style={`background-image: url('./imgs/obras/${obra.img}');`}
    />
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

    .emotion-list {
      width: max-content;
      margin: 10px 0;
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
      display: flex;
      flex-direction: row;

      .image {
        width: 33%;
        height: 300px;
        background-position: top left;
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
  }
</style>
