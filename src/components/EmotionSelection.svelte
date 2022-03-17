<script lang="ts">
  import { CordialType, EmotionOrder } from "../types/cordiais.types";
  export let selectedEmotion: string;
  export let obra: CordialType;
</script>

<div class="emotion-selection">
  {#each EmotionOrder as e}
    <label class="emotion-option" class:selected={selectedEmotion == e}>
      <input type="radio" bind:group={selectedEmotion} value={e} />
      {`${e}: ${obra.emotions[e]}`}
    </label>
  {/each}
</div>

<style lang="scss">
  .emotion-selection {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input[type="radio"] {
    width: 0;
  }

  .emotion-option {
    display: inline;
    cursor: pointer;
  }

  .emotion-option.selected {
    color: yellowgreen;
  }
</style>
