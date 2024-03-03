<script lang="ts">
    import { UniqueSet } from "$lib/set";
    import type { Credit } from '$lib/movie-types';
    import { fade, fly } from 'svelte/transition';
	import Venn from './Venn.svelte';
	import Search from "./Search.svelte";

    let left = new UniqueSet<Credit>();
    let right = new UniqueSet<Credit>();

    let l = false;
    let r = false;
    let m = false;

    let leftName: string | undefined;
    let rightName: string | undefined;

    let films: UniqueSet<Credit>;

    $: { 
        if (l && r && m) {
            films = left.union(right);
        } else if (l && r) {
            films = left
                .union(right)
                .difference(left.intersection(right));
        } else if (l && m) {
            films = left;
        } else if (r && m) {
            films = right;
        } else if (r) {
            films = right.difference(left);
        } else if (l) {
            films = left.difference(right);
        } else if (m) {
            films = right.intersection(left);
        } else {
            films = new UniqueSet();
        }
    }

    let displayedFilms: Credit[] = [];

    $: {
        displayedFilms = [...films].sort((a, b) => b.popularity - a.popularity);
    }
</script>

<div id="page">

    <header>
        <h1>Setterboxd</h1>
        <p>About</p>
        <p>Some More</p>
        <p>Hello World</p>
    </header>

    <div class="panels">

        <div class="panel-left">
            <div class="sticky-left">
                <Venn bind:left bind:right bind:l bind:r bind:m bind:leftName bind:rightName />
                <div class="searches">
                    <Search id="left" bind:films={left} bind:name={leftName} />
                    <Search id="right" bind:films={right} bind:name={rightName} />
                </div>
            </div>
        </div>
        
        <div class="panel-right">
            <h2>{films.size()} Films Selected</h2>
            {#if films.size() > 0}
    
                <div class="films" transition:fade={{ duration: 300 }}>
                    {#each displayedFilms as f, i (f.id)}
                        <!-- animate:flip={{ duration: 200 }} in:receive={{ key: f.id }} out:send={{ key: f.id }} -->
                        <figure>
                            <figcaption>{f.title} - {f.release_date}</figcaption>
                            <img src="https://image.tmdb.org/t/p/w200{f.poster_path}" alt={f.title}>
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
        /* padding: 2rem 0; */
    }

    .sticky-left {
        position: sticky;
        top: 64px;
    }

    .ven-container {
        padding: 2rem 5rem;
        z-index: 1;
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


</style>