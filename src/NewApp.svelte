<script lang="ts">
  import type { CordialType } from "./types/cordiais.types";
  import { FilterType, OrderType } from "./types/cordiais.types";

  let allObras: Array<CordialType>;
  let orderedObras: Array<CordialType>;
  let selectedObra: CordialType;
  let filterBy: FilterType = FilterType.NoFilter;

  const handleFaceClick = (o: CordialType) => {
    orderedObras.forEach((item, i) => {
      if (item.slug === o.slug) {
        orderedObras.splice(i, 1);
        orderedObras.unshift(null);
        orderedObras[0] = o;
      }
    });
  };

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
    const baseurl = window.location.href.replace(window.location.hash, "");
    let response = await fetch(`${baseurl}data/obras.json`);
    let obras = await response.json();

    const obrasList = Object.keys(obras).map((o) => obras[o]);
    obrasList.sort((a, b) => a.artist.localeCompare(b.artist));

    allObras = obrasList.filter(
      (obra) => "emotions" in obra && "face_rectangle" in obra
    );
    orderedObras = [...allObras];
    orderedObras = reorderObras(OrderType.Date);
    selectedObra = orderedObras[0];
  }

  let getObrasPromise = getObras();
</script>

{#await getObrasPromise}
  <p>...waiting</p>
{:then number}
  <div class="container">
    {#each orderedObras as obra (obra.slug)}
      <div
        class="face"
        class:color={filterBy == FilterType.NoFilter || obra[filterBy]}
        on:click={() => handleFaceClick(obra)}
      >
        <div
          class="face-content"
          style={`background-image: url('./imgs/faces/${obra.img}');`}
        />
      </div>
    {/each}
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<style lang="scss">
  .container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100vh;
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
