<script lang="ts">
    import { UniqueSet } from "$lib/set";
    import type { Credit } from '$lib/movie-types';
    import { fade, fly } from 'svelte/transition';
	import Venn from './Venn.svelte';
	import Search from "./Search.svelte";
	import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";

    export let data;

    $: left = data.left.credits;
    $: right = data.right.credits;

    let l = false;
    let r = false;
    let m = true;

    let selected: UniqueSet<Credit>;

    $: { 
        if (l && r && m) {
            selected = left.union(right);
        } else if (l && r) {
            selected = left
                .union(right)
                .difference(left.intersection(right));
        } else if (l && m) {
            selected = left;
        } else if (r && m) {
            selected = right;
        } else if (r) {
            selected = right.difference(left);
        } else if (l) {
            selected = left.difference(right);
        } else if (m) {
            selected = right.intersection(left);
        } else {
            selected = new UniqueSet();
        }
    }

    let displayedFilms: Credit[] = [];

    $: {
        displayedFilms = [...selected].sort((a, b) => b.popularity - a.popularity);
    }

    $: posterW = displayedFilms.length <= 5 ? 300 : 200;

</script>

<div id="page">

    <header>
        <h1>Setterboxd</h1>
    </header>

    <div class="panels">

        <div class="panel-left">
            <div class="sticky-left">
                <Venn bind:venn={data} bind:l bind:r bind:m />
                <div class="searches">
                    <Search id="left" bind:side={data.left} />
                    <Search id="right" bind:side={data.right} />
                </div>
            </div>
        </div>
        
        <div class="panel-right">
            <h2>{selected.size()} Films Selected</h2>
            {#if selected.size() > 0}
    
                <div class="films" transition:fade={{ duration: 300 }}>
                    {#each displayedFilms as f, i (f.id)}
                        <!-- animate:flip={{ duration: 200 }} in:receive={{ key: f.id }} out:send={{ key: f.id }} -->
                        <figure>
                            <figcaption>{f.title} - {f.release_date}</figcaption>
                            <img src="https://image.tmdb.org/t/p/w{posterW}{f.poster_path}" alt={f.title}>
                        </figure>
                    {/each}
                </div>
            {/if}
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
        display: flex;
        gap: 2rem;
        align-items: center;
    }
    
    header > * {
        transition: opacity ease-in-out 250ms;

    }

    :global(#page:has(:is(.left.posters, .right.posters) .path:is(:hover, :focus-visible)) header > *)  {
        opacity: 0;
    }

    h2 {
        margin-bottom: 1rem;
    }

    .films {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(120px, 100%), 1fr));
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


    .sticky-left {
        position: sticky;
        top: 64px;
    }

    .searches {
        transition: top ease-in-out 200ms;
        transition-delay: 110ms;
        display: flex;
        width: calc(100% - 10rem);
        gap: 1rem;
        margin: 0 auto;
        z-index: -1;
    }



    .panel-right {
        padding: 2rem;
        max-width: 1000px;
        flex: 1;
        height: calc(100vh - 64px);
        overflow-y: auto;
        overflow-x: hidden;
    }

    @media (max-width: 1200px) {
        .panels {
            flex-direction: column;
        }

        .panel-right {
            padding: 0 1rem 2rem 1rem;
            height: auto;
        }

        .sticky-left {
            display: flex;
            flex-direction: column-reverse;    
            padding-top: 1rem;
        }

        
        .searches {
            width: 100%;
            max-width: 600px;
            flex-direction: column;
            padding: 0 1rem;
            z-index: 1;
        }

        :global(.searches:has(.left :is(.loading, li)) .right) {
            opacity: .25;
        }
    }

</style>