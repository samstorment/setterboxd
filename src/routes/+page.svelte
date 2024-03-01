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
    <div class="overlay">
        <div class="line"></div>
    </div>

    <h1>Setterboxd</h1>

    
    <Venn left={data.left} right={data.right} bind:l bind:r bind:m />

    
    <h2>{films.size()} Films Selected</h2>

    <div class="films">
        {#each films as f, i (f.id)}
            <figure animate:flip={{ duration: 200 }} in:receive={{ key: f.id }} out:send={{ key: f.id }}>
                <figcaption>{f.title} - {f.year}</figcaption>
                <img src={f.poster} alt={f.title}>
            </figure>
        {/each}
    </div>
</div>




<style>
    #page {
        padding: 1rem;
    }

    h1, h2 {
        text-align: center;
    }

    h2 {
        margin-bottom: 1rem;
    }

    .films {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        max-width: 600px;
        margin: 0 auto;
    }

    .films figcaption {
        display: none;
    }

    .films img {
        max-width: 50px;
        border-radius: 4px;
    }
</style>