<script lang="ts">
    import type { CordialType } from './types/cordiais.types';
    import { EmotionOrder } from './types/cordiais.types';
    export let obra: CordialType;
    let topEmotion: string;
    $: topEmotion = EmotionOrder.reduce((a:string, b:string) => obra.emotions[a] > obra.emotions[b] ? a : b);
</script>

<div class="cordial">
    <div class="title">{obra.title} - {obra.year}</div>
    <div class="artist">{obra.artist}</div>
    <div class="medium">
        {obra.medium} / {`${obra.dimension.width} x ${obra.dimension.height} ${obra.dimension.unit}`}
    </div>
    <div class="collection">{obra.collection}</div>

    {#each EmotionOrder as e}
        <div class="emotion">{e}: {obra.emotions[e]}</div>
    {/each}

    <div class="image" style={`background-image: url('./imgs/obras/${obra.img}');`}></div>
</div>

<style lang="scss">
    .cordial {
        .title {
            color: rgb(128, 0, 0);
        }
        .artist {
            color: rgb(0, 128, 0);
        }
        .medium {
            color: rgb(0, 0, 128);
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
