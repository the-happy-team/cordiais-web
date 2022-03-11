<script lang="ts">
  import { readable } from "svelte/store";
  import FilterProtoypeApp from "./FilterProtoypeApp.svelte";
  import NewApp from "./NewApp.svelte";

  const hash = readable(window.location.hash, (set) => {
    const update = () => set(window.location.hash);
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  });
</script>

{#if $hash.endsWith("#/new")}
  <NewApp />
{:else}
  <FilterProtoypeApp />
{/if}
