<script lang="ts">
  import { CordialType, FilterType, OrderType } from "./types/cordiais.types";
  import AboutModal from "./components/AboutModal.svelte";
  import ContactModal from "./components/ContactModal.svelte";
  import CordialModal from "./components/CordialModal.svelte";
  import Menu from "./components/Menu.svelte";

  const baseurl = window.location.href.replace(window.location.hash, "");

  let orderedObras: Array<CordialType> = [];
  let selectedObra: CordialType = null;

  let showAbout: boolean = false;
  let showContact: boolean = false;

  let filterBy: FilterType = FilterType.NoFilter;
  let orderBy: OrderType = OrderType.Date;

  const reorderObras = (o: OrderType) => {
    return orderedObras.sort((a, b) => {
      if (o == OrderType.Date) {
        return a.year.localeCompare(b.year);
      } else {
        return b.emotions[o] - a.emotions[o];
      }
    });
  };

  async function getObras() {
    let response = await fetch(`${baseurl}data/obras.json`);
    let obrasJson: { string: CordialType } = await response.json();

    const obrasList = Object.entries(obrasJson)
      .map(([_, v]) => v)
      .filter((obra) => {
        return (
          "emotions" in obra &&
          "face_rectangle" in obra &&
          obra.dimension.width &&
          obra.dimension.height
        );
      });
    orderedObras = [...obrasList];
    orderedObras = reorderObras(orderBy);
  }

  let getObrasPromise = getObras();
  $: orderedObras = reorderObras(orderBy);
</script>

{#await getObrasPromise}
  <p>...waiting</p>
{:then}
  <div class="container">
    {#each orderedObras as obra (obra.slug)}
      <div
        class="face"
        class:color={filterBy == FilterType.NoFilter || obra[filterBy]}
        on:click={() => (selectedObra = obra)}
      >
        <div
          class="face-content"
          style={`background-image: url('${baseurl}imgs/faces/${obra.img}');`}
        />
      </div>
    {/each}
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<Menu bind:showAbout bind:showContact />

{#if selectedObra}
  <CordialModal bind:obra={selectedObra} />
{/if}

{#if showAbout}
  <AboutModal bind:showAbout />
{/if}

{#if showContact}
  <ContactModal bind:showContact />
{/if}

<style lang="scss">
  .container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .face {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 10%;
    padding-bottom: 10%;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;

    filter: grayscale(1);
    transition: filter 0.12s linear;

    &.color {
      filter: grayscale(0);
    }
  }

  .face-content {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

    filter: brightness(1);
    transition: filter 0.12s linear;

    &:hover {
      filter: brightness(1.2);
    }
  }
</style>
