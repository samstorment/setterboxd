<script lang="ts">
    import type { Film } from '$lib';
    import { UniqueSet } from "$lib/set";
    import { fly, fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { send, receive } from '$lib/transition';
	import Venn from './Venn.svelte';

    export let data;

    let l = false;
    let r = false;
    let m = true;

    let films: UniqueSet<Film>;

    $: { 
        if (l && r && m) {
            films = data.left.union(data.right);
        } else if (l && r) {
            films = data.left
                .union(data.right)
                .difference(data.left.intersection(data.right));
        } else if (l && m) {
            films = data.left;
        } else if (r && m) {
            films = data.right;
        } else if (r) {
            films = data.right.difference(data.left);
        } else if (l) {
            films = data.left.difference(data.right);
        } else if (m) {
            films = data.right.intersection(data.left);
        } else {
            films = new UniqueSet();
        }
    } 

</script>

<div id="page">

    <header>
        <h1>Setterboxd</h1>
    </header>

    <div class="panels">

        <div class="panel-left">
            <div class="sticky-left">
                <Venn left={data.left} right={data.right} bind:l bind:r bind:m />
            </div>
        </div>
        
        <div class="panel-right">
            {#if films.size() > 0}
                <h2 transition:fly={{ x: 500 }}>{films.size()} Films Selected</h2>
            {/if}
            
            <div class="films">
                {#each films as f, i (f.id)}
                    <figure animate:flip={{ duration: 200 }} in:receive={{ key: f.id }} out:send={{ key: f.id }}>
                        <figcaption>{f.title} - {f.year}</figcaption>
                        <img src={f.poster} alt={f.title}>
                    </figure>
                {/each}
            </div>
        </div>
    </div>
</div>




<style>
    #page {
        position: relative;
        height: 100%;
        overflow-x: hidden;
    }

    header {
        padding: .5rem 1rem;
    }

    h2 {
        margin-bottom: 1rem;
    }

    .films {
        /* display: flex;
        flex-wrap: wrap; */
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(90px, 100%), 1fr));
        gap: 1rem;
        margin: 0 auto;
    }

    figcaption {
        display: none;
    }

    img {
        border-radius: 4px;
        transition: scale ease-in-out 200ms;
    }

    img:hover {
        scale: 1.25;
        z-index: 1;
    }


    .panels {
        display: flex;
        background: #14181c url(bg.webp) 0 -1px repeat-x;
        justify-content: center;
    }

    .panel-left {
        padding: 3rem 0;
    }

    .sticky-left {
        position: sticky;
        top: 64px;
    }



    .panel-right {
        padding: 5rem 5rem 5rem 2rem;
        max-width: 800px;
        flex: 1;
    }
</style>