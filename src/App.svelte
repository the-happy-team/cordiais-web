<script lang="ts">
	import type { CordialType } from './types/cordiais.types';
	import Cordial from './Cordial.svelte';
	let ficha_test: CordialType = {
		title: 'mtitle',
		year: '1981',
		medium: 'agua',
		dimension: {width: 42, height: 182, unit: 'cm'},
		artist: 'fulano',
		collection: 'my col',
		emotions: {
			happiness: 0.275,
			neutral: 1.276,
			surprise: 4.155,
			sadness: 0.198,
			disgust: 0.685,
			anger: 91.541,
			fear: 1.87
		}
	};

	setTimeout(() => ficha_test.emotions.disgust = 92.111, 1000);
</script>

<main>
	<Cordial ficha={ficha_test} />
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
