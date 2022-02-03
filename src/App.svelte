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
  let filterCollection = "";

  const emoFilters = EmotionOrder.map((e) => {
    return {
      emo: e,
      min: 0,
      max: 50,
      enabled: false,
    };
  });

  const allCollections = [""];

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

    [...new Set(filteredObras.map((o) => o.collection))].forEach((c) =>
      allCollections.push(c)
    );
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
        filteredObras = filteredObras.filter((obra) => {
          return obra.emotions[emo] <= max && obra.emotions[emo] >= min;
        });
      }
    });

    if (filterCollection != "") {
      filteredObras = filteredObras.filter((obra) => {
        return obra.collection == filterCollection;
      });
    }
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
      <input
        class="filter-number"
        bind:value={ef.min}
        on:change={updateFiltered}
      />% &lt;
      <div class="filter-emo-label">{ef.emo}</div>
      &lt;
      <input
        class="filter-number"
        bind:value={ef.max}
        on:change={updateFiltered}
      />%
    </div>
  {/each}

  {#if obrasReady}
    <select bind:value={filterCollection} on:change={updateFiltered}>
      {#each allCollections as collection}
        <option value={collection}>
          {collection}
        </option>
      {/each}
    </select>
  {/if}
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
      .filter-number {
        display: block;
        width: 50px;
        border: none;
        border-bottom: 1px solid #aaa;
      }
      .filter-emo-label {
        width: 120px;
        text-align: center;
      }
    }
  }
</style>
