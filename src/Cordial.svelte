<script lang="ts">
    import type { CordialType } from './types/cordiais.types';
    import { EmotionOrder } from './types/cordiais.types';
    export let ficha: CordialType;
    let topEmotion: string = 'angry';

    $: {
        topEmotion = EmotionOrder.reduce((a:string, b:string) => ficha.emotions[a] > ficha.emotions[b] ? a : b);
    }

</script>

<div class="cordial">
    <div class="title">{ficha.title}</div>
    <div class="year">{ficha.year}</div>
    <div class="artist">{ficha.artist}</div>
    <div class="medium">{ficha.medium}</div>
    <div class="dimensions">{`${ficha.dimension.width} x ${ficha.dimension.height} ${ficha.dimension.unit}`}</div>
    <div class="collection">{ficha.collection}</div>
    <div class="emotion">{topEmotion}</div>

</div>

<style lang="scss">
    .cordial {
        .title {
            color: pink;
        }
        .year {
            color: aquamarine;
        }
        .artist {
            color: blueviolet;
        }
        .medium {
            color: dodgerblue;
        }
        .dimensions {
            color: goldenrod;
        }
        .collection {
            color: hotpink;
        }
    }
</style>
