<script lang="ts">
  import { readable } from "svelte/store";
  import PrototypeApp from "./prototype-app/PrototypeApp.svelte";
  import App from "./App.svelte";
  import { language } from "./stores.js";
  import { Languages } from "./types/cordiais.types";

  const hash = readable(window.location.hash, (set) => {
    const update = () => set(window.location.hash);
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  });

  $: if ($hash.endsWith("en")) {
    $language = Languages.EN;
    localStorage.setItem("cordiais-lang", Languages.EN);
  } else if ($hash.endsWith("pt")) {
    $language = Languages.PT;
    localStorage.setItem("cordiais-lang", Languages.PT);
  }
</script>

{#if $hash.endsWith("#/pesquisa") || $hash.endsWith("#pesquisa")}
  <PrototypeApp />
{:else}
  <App />
{/if}
