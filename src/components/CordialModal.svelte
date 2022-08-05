<script lang="ts">
  import {
    CordialType,
    EmotionOrder,
    OrderType,
  } from "../types/cordiais.types";
  import CordialModalDesktop from "./CordialModalDesktop.svelte";
  import CordialModalMobile from "./CordialModalMobile.svelte";
  import Modal from "./Modal.svelte";

  export let obra: CordialType;
  export let orderBy: OrderType = OrderType.happiness;

  const isMobile = window.matchMedia("(max-width: 700px)").matches;

  $: selectedEmotion =
    orderBy == OrderType.Date ? EmotionOrder[0] : OrderType[orderBy];
</script>

<Modal on:close>
  {#if isMobile}
    <CordialModalMobile {obra} bind:selectedEmotion />
  {:else}
    <CordialModalDesktop {obra} bind:selectedEmotion />
  {/if}
</Modal>
