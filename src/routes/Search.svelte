<script lang="ts">
	import { emptyPersonSearch, type Film } from "$lib";
	import type { Credit, Media, Person, PersonSearch } from "$lib/movie-types";
	import { UniqueSet } from "$lib/set";
    import { slide, scale, fade, fly } from 'svelte/transition';
	import { tick } from "svelte";
    import { outsideClick } from '$lib/actions/outside-click';

    export let id: 'left' | 'right';
    export let films: UniqueSet<Credit>;
    export let name: string | undefined;

    let input: HTMLInputElement;
    let form: HTMLFormElement;
    let selected: HTMLButtonElement;

    let timeout = 0;

    let q = "";

    let person: Person | undefined;

    let search = emptyPersonSearch;
    let searching = false;

    async function onSubmit() {
        console.log('submitted');
        clearTimeout(timeout);
        const res = await fetch(`/api/search/person?q=${q}`);
        search = await res.json();
    }

    async function onResultClick(p: Person) {
        const res = await fetch(`/api/credits/${p.id}`);
        const creditList: Credit[] = await res.json();
        person = p;
        q = p.name;
        name = p.name;
        films = new UniqueSet(...creditList);
        searching = false;
        await tick();
        selected.focus();
    }

    function onChange() {

        clearTimeout(timeout);

        if (q === '') {
            search = emptyPersonSearch;
            return;
        }

        timeout = setTimeout(onSubmit, 500);
    }

    async function onSelectedClick() {
        searching = true; 
        await tick(); 
        input.focus();
    }

    function onFormOutsideClick() {
        searching = false;
        q = person?.name ?? '';
    }

    function onDeselect() {
        person = undefined;
        name = undefined;
        q = '';
        films = new UniqueSet();
        search = emptyPersonSearch;
    }
</script>

<div class="search">
    {#if person && !searching}
        <div class="selected">
            <button type="button" class="person" on:click={onSelectedClick} bind:this={selected}>
                {#if person.profile_path}
                <img src="https://image.tmdb.org/t/p/w200{person.profile_path}" alt="{person.name}">
                {/if}
                <div class="text">
                    <div>{person.name}</div>
                    <div class="small">{person.known_for_department}</div>
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
            <ul class="results">
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
        list-style-type: none;
        padding: 0;
        overflow: auto;
        border-bottom-left-radius: .5rem;
        border-bottom-right-radius: .5rem;
        transition: max-height ease-in-out 200ms;
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
        padding: 1rem;
        border: none;
        border-radius: .25rem;
        outline: none;
    }
    
    li {
        border-bottom: 1px solid lightgray;
        padding: .1rem;
    }

    li:hover {
        background-color: rgb(231, 231, 231);
    }

    li:not(:has(img)) {
        padding: .5rem;
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