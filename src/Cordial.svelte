<script lang="ts">
    import type { CordialType } from './types/cordiais.types';
    import { EmotionOrder } from './types/cordiais.types';
    export let obra: CordialType;
    let topEmotion: string;
    $: topEmotion = EmotionOrder.reduce((a:string, b:string) => obra.emotions[a] > obra.emotions[b] ? a : b);
</script>

<div class="cordial">
    <div class="title">{obra.title}</div>
    <div class="year">{obra.year}</div>
    <div class="artist">{obra.artist}</div>
    <div class="medium">{obra.medium}</div>
    <div class="dimensions">{`${obra.dimension.width} x ${obra.dimension.height} ${obra.dimension.unit}`}</div>
    <div class="collection">{obra.collection}</div>

    {#each EmotionOrder as e}
        <div class="emotion">{e}: {obra.emotions[e]}</div>
    {/each}

    <div class="image" style={`background-image: url('./imgs/obras/${obra.img}');`}></div>
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
        .image {
            width: 33%;
            height: 300px;
            background-position: top left;
            background-repeat: no-repeat;
            background-size: contain;
        }
    }
</style>
