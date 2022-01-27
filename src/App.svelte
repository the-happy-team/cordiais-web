<script lang="ts">
	import type { CordialType } from './types/cordiais.types';
	import Cordial from './Cordial.svelte';

	let allObras: Array<CordialType>;
	let selectedObra: CordialType;
	let obrasReady = false;

	async function getObras() {
		let response = await fetch(`${window.location.href}data/obras.json`);
		let obras = await response.json();
		return Object.keys(obras).map(o => obras[o]);
	}

	getObras().then((obras) => {
		allObras = obras.filter(obra => 'emotions' in obra);
		// allObras = allObras.filter(obra => obra.emotions.neutral < 50);
		selectedObra = allObras[0];
		obrasReady = true;
	});
</script>

<main>
	{#if obrasReady}
		<select bind:value={selectedObra} >
			{#each allObras as obra}
				<option value={obra}>{obra.title}</option>
			{/each}
		</select>
		<Cordial obra={selectedObra} />
	{/if}
</main>

<style>
	main {
		max-width: 600px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
