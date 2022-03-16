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
  .emotion-option.selected {
    color: yellowgreen;
  }
</style>
