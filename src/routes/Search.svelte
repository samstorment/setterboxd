<script lang="ts">
	import type { Film } from "$lib";
	import type { Person, PersonSearch } from "$lib/movie-types";
	import { UniqueSet } from "$lib/set";
	import { tick } from "svelte";

    export let id: string;
    export let films: UniqueSet<Film>;
    export let name: string | undefined

    let q = "";

    let search: PersonSearch = {
        page: 1,
        total_pages: 1,
        total_results: 0,
        results: []
    };

    async function onSubmit() {
        const res = await fetch(`/api/search/person?q=${q}`);
        search = await res.json();
    }

    async function onClick(person: Person) {
        const res = await fetch(`/api/credits/${person.id}`);
        const creditList: Film[] = await res.json();
        q = person.name;
        name = person.name;
        films = new UniqueSet(...creditList);
        await tick();
        const slice = document.querySelector(`[data-name="${name}"]`) as HTMLDivElement;

        console.log(slice);

        const path = slice.querySelector('path');

        path?.focus();
    }
</script>


<form on:submit|preventDefault={onSubmit}>
    <label for={id}>List 1</label>
    <input type="search" name="q" {id} required autocomplete="off" bind:value={q}>
    <ul class="results">
        {#each search.results.sort((a, b) => b.popularity - a.popularity) as r}
            <li>
                <button on:click={() => onClick(r)} type="button">
                    {#if r.profile_path}
                        <img src="https://image.tmdb.org/t/p/w200{r.profile_path}" alt="{r.name}">
                    {/if}
                    <div>{r.name}</div>
                    <div class="small">{r.known_for_department}</div>
                </button>
            </li>
        {/each}
    </ul>
</form>

<style>
    form {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: 0 auto;
        position: relative;
        width: 100%;
    }


    
    .results {
        max-height: 0;
        position: absolute;
        top: 100%;
        z-index: 500;
        width: 100%;
        background-color: white;
        list-style-type: none;
        padding: 0;
        overflow: auto;
        border-bottom-left-radius: .5rem;
        border-bottom-right-radius: .5rem;
        transition: max-height ease-in-out 200ms;
    }

    form:focus-within .results {
        display: block;
        max-height: 400px;

    }
    
    li {
        padding: .2rem;
        border-bottom: 1px solid lightgray;
    }

    button {
        padding: .25rem;
        display: flex;
        border: none;
        align-items: center;
        gap: .5rem;
        color: black;
        width: 100%;
        background-color: transparent;
        cursor: pointer;
    }

    li:hover {
        background-color: rgb(231, 231, 231);
    }

    img {
        max-width: 40px;
        aspect-ratio: 1;
        object-fit: cover;
    }
    
    .small {
        font-size: .85rem;
        color: gray;
    }
</style>