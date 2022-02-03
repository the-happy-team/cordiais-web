<script lang="ts">
  import type { CordialType } from "./types/cordiais.types";
  import { EmotionOrder } from "./types/cordiais.types";
  import Cordial from "./Cordial.svelte";

  let allObras: Array<CordialType>;
  let filteredObras: Array<CordialType>;
  let selectedObra: CordialType;
  let obrasReady = false;
  let filterNudes = false;
  let filterMarcantonio = false;

  const emoFilters = EmotionOrder.map((e) => {
    return {
      emo: e,
      min: 0,
      max: 50,
      enabled: false,
    };
  });

  async function getObras() {
    let response = await fetch(`${window.location.href}data/obras.json`);
    let obras = await response.json();
    const obrasList = Object.keys(obras).map((o) => obras[o]);
    return obrasList.sort((a, b) => a.artist.localeCompare(b.artist));
  }

  getObras().then((obras) => {
    allObras = obras.filter((obra) => "emotions" in obra);
    filteredObras = [...allObras];
    selectedObra = filteredObras[0];
    obrasReady = true;
  });

  let updateFiltered = () => {
    filteredObras = [...allObras];
    if (filterNudes) {
      filteredObras = filteredObras.filter((obra) => obra.nudes);
    }
    if (filterMarcantonio) {
      filteredObras = filteredObras.filter((obra) => obra.marcantonio);
    }

    emoFilters.forEach(({ emo, min, max, enabled }) => {
      if (enabled) {
        filteredObras = filteredObras.filter((o) => {
          return o.emotions[emo] <= max && o.emotions[emo] >= min;
        });
      }
    });

    selectedObra = filteredObras[0];
  };
</script>

<div class="filters">
  <div class="filter-group">
    <input
      type="checkbox"
      bind:checked={filterNudes}
      on:change={updateFiltered}
    />
    Nudes
  </div>
  <div class="filter-group">
    <input
      type="checkbox"
      bind:checked={filterMarcantonio}
      on:change={updateFiltered}
    />
    Marcantonio
  </div>

  {#each emoFilters as ef}
    <div class="filter-group">
      <input
        type="checkbox"
        bind:checked={ef.enabled}
        on:change={updateFiltered}
      />
      <input bind:value={ef.min} on:change={updateFiltered} />% &lt;
      {ef.emo} &lt; <input bind:value={ef.max} on:change={updateFiltered} />%
    </div>
  {/each}
</div>

{#if obrasReady}
  <select bind:value={selectedObra}>
    {#each filteredObras as obra}
      <option value={obra}>{obra.artist} - {obra.title}</option>
    {/each}
  </select>{filteredObras.length}
  {#if filteredObras.length > 0}
    <Cordial obra={selectedObra} />
  {/if}
{/if}

<style lang="scss">
  .filters {
    display: flex;
    flex-direction: column;

    .filter-group {
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: baseline;
      margin: 4px 0;

      input {
        margin-right: 8px;
      }
    }
  }
</style>
