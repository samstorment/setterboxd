<script lang="ts">
	import { emptyPersonSearch, type Side } from "$lib";
	import type { Credit, Person } from "$lib/movie-types";
	import { UniqueSet } from "$lib/set";
	import { tick } from "svelte";
    import { outsideClick } from '$lib/actions/outside-click';
	import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    export let side: Side;

    export let id: 'left' | 'right';

    let input: HTMLInputElement;
    let form: HTMLFormElement;
    let selected: HTMLButtonElement;

    let loading = false;

    let timeout = 0;

    let q = "";

    let search = emptyPersonSearch;
    let searching = false;

    async function onSubmit() {

        clearTimeout(timeout);
        const res = await fetch(`/api/search/person?q=${q}`);
        search = await res.json();

        loading = false;
    }

    async function onResultClick(p: Person) {
        if (p.id === side.person?.id) {
            searching = false;
            return;
        };

        const res = await fetch(`/api/credits/${p.id}`);
        const credits: Credit[] = await res.json();

        q = p.name;
        searching = false;

        side = { person: p, credits: new UniqueSet(...credits) };
        
        const params = $page.url.searchParams;
        params.set(id, p.id.toString());
        await goto("?" + params.toString(), { replaceState: true });

        selected.focus();
    }

    function onChange() {

        loading = true;
        search = emptyPersonSearch;

        clearTimeout(timeout);

        if (q === '') return loading = false;

        timeout = setTimeout(onSubmit, 250);
    }

    async function onSelectedClick() {
        searching = true; 
        q = '';
        await tick();
        input.focus();
    }

    function onFormOutsideClick() {
        searching = false;
    }

    async function onDeselect() {
        side = { person: undefined, credits: new UniqueSet() };
        q = '';
        search = emptyPersonSearch;

        const params = $page.url.searchParams;
        params.delete(id);
        await goto("?" + params.toString(), { replaceState: true });

        input.focus();
    }
</script>

<div class="search">
    {#if side.person && !searching}
        <div class="selected">
            <button type="button" class="person" on:click={onSelectedClick} bind:this={selected}>
                {#if side.person.profile_path}
                    <img src="https://image.tmdb.org/t/p/w200{side.person.profile_path}" alt="{side.person.name}">
                {/if}
                <div class="text">
                    <div>{side.person.name}</div>
                    <div class="small">{side.person.known_for_department}</div>
                </div>
            </button>
            <button class="deselect" on:click={onDeselect}>&times;</button>
        </div>
    {:else}
        <form on:submit|preventDefault={onSubmit} bind:this={form} use:outsideClick on:outsideclick={onFormOutsideClick}>
            <input 
                type="search" name="q" {id} required autocomplete="off" 
                bind:value={q} on:input={onChange} bind:this={input}
            >
            <div class="results" inert={search.results.length === 0}>
                {#if loading}
                    <div class="loading">Loading</div>
                {/if}
                <ul>
                    {#each search.results as p}
                        <li>
                            <button on:click={() => onResultClick(p)} type="button">
                                {#if p.profile_path}
                                <img src="https://image.tmdb.org/t/p/w200{p.profile_path}" alt="{p.name}">
                                {/if}
                                <div class="text">
                                    <div>{p.name}</div>
                                    <div class="small">{p.known_for_department}</div>
                                </div>
                            </button>
                        </li>
                    {/each}
                </ul>
            </div>
        </form>
    {/if}
</div>

<style>
    .search {
        flex: 1;
    }

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
        top: calc(100% - 4px);
        width: 100%;
        background-color: white;
        padding: 0;
        overflow: auto;
        border-bottom-left-radius: .5rem;
        border-bottom-right-radius: .5rem;
        transition: max-height ease-in-out 200ms;
    }

    .loading {
        color: gray;
        padding: .5rem;
    }

    .results ul {
        list-style-type: none;
        padding: 0;
    }

    form:focus-within .results {
        display: block;
        max-height: 300px;
    }

    form:focus-within .results::before {
        content: '';
        width: 100%;
        background-color: lightgray;
        height: 1px;
        position: absolute;
        top: 0;
    }

    input {
        height: 50px;
        padding: .75rem;
        border: none;
        border-radius: .25rem;
        font-size: 1.2rem;
        outline: none;
    }
    
    li {
        border-bottom: 1px solid lightgray;
        padding: .1rem;
    }

    li:hover {
        background-color: rgb(231, 231, 231);
    }


    ul button {
        padding: .1rem;
        display: flex;
        border: none;
        gap: .5rem;
        color: black;
        width: 100%;
        background-color: transparent;
        cursor: pointer;
    }

    ul button:not(:has(img)) {
        padding: .5rem;
    }

    img {
        max-width: 40px;
        aspect-ratio: 1 / 1.2;
        object-fit: cover;
    }

    .text {
        flex: 1;
        text-align: left;
        line-height: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .small {
        font-size: .85rem;
        color: gray;
    }

    .selected {
        position: relative;
        overflow: hidden;
        border-radius: .25rem;

    }

    .selected button.person {
        display: flex;
        width: 100%;
        padding: 0;
        border: none;
        overflow: hidden;
        padding: .2rem;
        height: 50px;
    }

    .selected button.deselect {
        position: absolute;
        right: 0;
        top: 50%;
        translate: 0 -50%;
        width: 35px;
        height: 100%;
        font-size: 1.75rem;
        border: none;
        color: dimgray;
    }

    .selected .text {
        margin-left: .5rem;
    }
</style>