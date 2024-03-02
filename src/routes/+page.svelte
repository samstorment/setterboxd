<script lang="ts">
    import type { Film } from '$lib';
    import { UniqueSet } from "$lib/set";
    import { fly, fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { send, receive } from '$lib/transition';
	import Venn from './Venn.svelte';
	import Search from './Search.svelte';

    let left = new UniqueSet<Film>();
    let right = new UniqueSet<Film>();

    let leftName: string | undefined;
    let rightName: string | undefined;

    let l = false;
    let r = false;
    let m = false;

    let films: UniqueSet<Film>;

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

</script>

<div id="page">

    <header>
        <h1>Setterboxd</h1>
    </header>

    <div class="panels">

        <div class="panel-left">
            <div class="sticky-left">
                <div class="searches">
                    <Search id="l" bind:films={left} bind:name={leftName} />
                    <Search id="r" bind:films={right} bind:name={rightName} />
                </div>
                <Venn {left} {right} {leftName} {rightName} bind:l bind:r bind:m />
            </div>
        </div>
        
        <div class="panel-right">
            {#if films.size() > 0}
                <h2 transition:fly={{ x: 500 }}>{films.size()} Films Selected</h2>
            {/if}
            
            <div class="films">
                {#each films as f, i (f.id)}
                    <!-- animate:flip={{ duration: 200 }} in:receive={{ key: f.id }} out:send={{ key: f.id }} -->
                    <figure>
                        <figcaption>{f.title} - {f.year}</figcaption>
                        <img src="https://image.tmdb.org/t/p/w200{f.poster}" alt={f.title}>
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
        padding: 2rem 0;
    }

    .sticky-left {
        position: sticky;
        top: 64px;
    }


    .searches {
        display: flex;
        gap: 2rem;
        justify-content: center;
    }


    .panel-right {
        padding: 2rem;
        max-width: 800px;
        flex: 1;
    }
</style>