<script lang="ts">
  import { readable } from "svelte/store";
  import PrototypeApp from "./prototype-app/PrototypeApp.svelte";
  import NewApp from "./NewApp.svelte";

  const hash = readable(window.location.hash, (set) => {
    const update = () => set(window.location.hash);
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  });
</script>

{#if $hash.endsWith("#/pesquisa") || $hash.endsWith("#pesquisa")}
  <PrototypeApp />
{:else}
  <NewApp />
{/if}
