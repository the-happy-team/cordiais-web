<script lang="ts">
	import type { CordialType } from './types/cordiais.types';
	import Cordial from './Cordial.svelte';

	let allObras: Array<CordialType>;
	let filteredObras: Array<CordialType>;
	let selectedObra: CordialType;
	let obrasReady = false;
	let filterNudes = false;
	let filterMarcantonio = false;
	let filterNeutral = false;
	let filterCut = 50;

	async function getObras() {
		let response = await fetch(`${window.location.href}data/obras.json`);
		let obras = await response.json();
		const obrasList = Object.keys(obras).map(o => obras[o]);
		return obrasList.sort((a, b) => a.artist.localeCompare(b.artist));
	}

	getObras().then((obras) => {
		allObras = obras.filter(obra => 'emotions' in obra);
		filteredObras = [...allObras];
		selectedObra = filteredObras[0];
		obrasReady = true;
	});

	let updateFiltered = () => {
		filteredObras = [...allObras];
		if (filterNudes)
			filteredObras = filteredObras.filter(obra => obra.nudes);
		if (filterMarcantonio)
			filteredObras = filteredObras.filter(obra => obra.marcantonio);
		if (filterNeutral)
			filteredObras = filteredObras.filter(obra => obra.emotions.neutral <= filterCut);

		filteredObras = filteredObras;
		selectedObra = filteredObras[0];
	}
</script>

<label>
	<input type=checkbox bind:checked={filterNudes} on:change={updateFiltered}>
	Nudes
</label>
<label>
	<input type=checkbox bind:checked={filterMarcantonio} on:change={updateFiltered}>
	Marcantonio
</label>
<label>
	<input type=checkbox bind:checked={filterNeutral} on:change={updateFiltered}>
	Neutro &lt; <input bind:value={filterCut}>%
</label>

{#if obrasReady}
	<select bind:value={selectedObra} >
		{#each filteredObras as obra}
			<option value={obra}>{obra.artist} - {obra.title}</option>
		{/each}
	</select>{filteredObras.length}
	<Cordial obra={selectedObra} />
{/if}
