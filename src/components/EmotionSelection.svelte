<script lang="ts">
  import { CordialType, EmotionOrder } from "../types/cordiais.types";
  import { emotions as _emotions } from "../langs/strings";
  import { language } from "../stores.js";

  export let selectedEmotion: string;
  export let obra: CordialType;

  $: emotions = _emotions[$language];
</script>

<div class="emotion-selection">
  {#each EmotionOrder as e}
    <label class="emotion-option" class:selected={selectedEmotion == e}>
      <input type="radio" bind:group={selectedEmotion} value={e} />
      {`${emotions[e]}: ${obra.emotions[e].toFixed(2)} %`}
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
    appearance: none;
    display: none;
  }

  .emotion-option {
    display: inline;
    cursor: pointer;
    font-size: 13px;
    font-weight: 400;

    @media screen and (max-width: 1025px) and (min-width: 1023px) and (orientation:landscape) {
      font-size: 12px;
    }
  }

  .emotion-option.selected {
    color: var(--color-highlight);
    font-weight: 600;
  }
</style>
