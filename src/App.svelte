<script lang="ts">
  import {
    CordialType,
    FilterType,
    OrderType,
    MenuItemType,
  } from "./types/cordiais.types";
  import CordialModal from "./components/CordialModal.svelte";
  import ModalContent from "./components/ModalContent.svelte";
  import Menu from "./components/Menu.svelte";
  import MenuOrder from "./components/MenuOrder.svelte";
  import MenuFilter from "./components/MenuFilter.svelte";
  import MenuLanguage from "./components/MenuLanguage.svelte";
  // import VLibras from "./components/VLibras.svelte";

  const baseurl = `${window.location.origin}${window.location.pathname}`;

  let orderedObras: Array<CordialType> = [];
  let selectedObra: CordialType = null;

  let urlObra: CordialType = null;
  let urlObraTimeout = null;
  const urlObraTimeoutValue = 5 * 60 * 1000;

  let selectedMenuItem = MenuItemType.None;
  let subMenuLocation = 0;
  let menuButtonHeight = 0;

  let filterBy: FilterType = FilterType.NoFilter;
  let orderBy: OrderType = OrderType.Date;

  const resetUrlObraTimeout = () => {
    if (urlObraTimeout) clearTimeout(urlObraTimeout);
    if (urlObra)
      urlObraTimeout = setTimeout(
        () => handleCordialSelection(urlObra),
        urlObraTimeoutValue
      );
  };

  const parseObraFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const obraParam = urlParams.get("obra");
    if (obraParam != null) {
      urlObra = orderedObras.filter((o) =>
        o.title.toLowerCase().includes(obraParam.toLowerCase())
      )[0];

      if (urlObra) handleCordialSelection(urlObra);
      resetUrlObraTimeout();
    }
  };

  const closeModal = () => {
    selectedMenuItem = MenuItemType.None;
    resetUrlObraTimeout();
  };

  const closeCordial = () => {
    selectedObra = null;
    resetUrlObraTimeout();
  };

  const handleCordialSelection = (obra: CordialType) => {
    selectedObra = obra;
    closeModal();
  };

  const handleLanguageChange = () => {
    closeModal();
  };

  const handleKeyDown = (e: Event) => {
    if ((e as KeyboardEvent).key === "Escape") {
      if (
        selectedMenuItem == MenuItemType.About ||
        selectedMenuItem == MenuItemType.Greetings ||
        selectedMenuItem == MenuItemType.Info
      ) {
        closeModal();
      }

      if (selectedObra) {
        closeCordial();
      }
    }
  };

  document.addEventListener("keydown", handleKeyDown);

  const reorderObras = (o: OrderType) => {
    return orderedObras.sort((a, b) => {
      if (o == OrderType.Date) {
        return a.year_sort - b.year_sort;
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
          obra.marcantonio &&
          obra.artist_death < 1953 &&
          obra.dimension.height &&
          obra.dimension.width
        );
      });

    const newLength = Math.floor(obrasList.length / 10) * 10;
    orderedObras = obrasList.slice(0, newLength);
    orderedObras = reorderObras(orderBy);
    parseObraFromUrl();
  }

  let getObrasPromise = getObras();
  $: orderedObras = reorderObras(orderBy);
  $: noFilter = filterBy == FilterType.NoFilter;
</script>

{#await getObrasPromise}
  <p>...waiting</p>
{:then}
  <div class="container">
    {#each orderedObras as obra (obra.slug)}
      <div
        class="face"
        class:color={(noFilter || obra[filterBy]) && !selectedObra}
        on:click={() => handleCordialSelection(obra)}
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

{#if selectedObra == null}
  <Menu
    bind:selectedItem={selectedMenuItem}
    bind:subMenuLocation
    bind:menuButtonHeight
  />

  <MenuLanguage on:languagechange={handleLanguageChange} />
{/if}

{#if selectedMenuItem == MenuItemType.Greetings || selectedMenuItem == MenuItemType.About || selectedMenuItem == MenuItemType.Info}
  <ModalContent {selectedMenuItem} on:close={closeModal} {menuButtonHeight} />
{:else if selectedMenuItem == MenuItemType.OrderBy}
  <MenuOrder bind:orderBy left={subMenuLocation} />
{:else if selectedMenuItem == MenuItemType.FilterBy}
  <MenuFilter bind:filterBy left={subMenuLocation} />
{/if}

{#if selectedObra}
  <CordialModal on:close={closeCordial} bind:obra={selectedObra} bind:orderBy />
{/if}

<!-- <VLibras /> -->

<style lang="scss">
  @import "./sass/globals.scss";

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
    user-select: none;

    @media screen and (max-width: $mobile-max-width) {
      width: calc(100% / 3);
      padding-bottom: calc(100% / 3);
    }

    cursor: initial;
    pointer-events: none;
    filter: grayscale(1);
    transition: filter 0.05s linear;

    &.color {
      cursor: pointer;
      pointer-events: all;
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
    transition: filter 0.15s linear;

    &:hover {
      filter: brightness(1.2);
    }
  }
</style>
