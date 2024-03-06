<script lang="ts">
	import { fly } from "svelte/transition";
	import type { PageData } from "./$types";
	import type { Venn } from "$lib";

    export let venn: Venn;

    export let l: boolean;
    export let r: boolean;
    export let m: boolean;

    $: left = venn.left.credits;
    $: right = venn.right.credits;

    $: leftName = venn.left.person?.name;
    $: rightName = venn.right.person?.name;

    $: leftOnly = [...left.difference(right)].filter(f => f.poster_path);
    $: rightOnly = [...right.difference(left)].filter(f => f.poster_path);
    $: midOnly = [...right.intersection(left)].filter(f => f.poster_path);
</script>


<div class="ven">
    <div 
        class="slice left"
        class:active={l}
        class:posters={leftOnly.length > 0}
    >
        {#key leftName}
            <div class="label" in:fly={{ y: -200 }}>
                {#if leftName}
                    <span>{leftName}</span>
                {/if}
                <span>{left.difference(right).size()} Films</span>
            </div>
        {/key}

        <svg 
            version="1.2" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="-2 -2 80 104" 
            width="76" height="100"
        >
            <path 
                on:click={() => l = !l}
                on:keypress={() => l = !l}
                role="button"
                class="path"
                tabindex="0"
                id="l" 
                fill-rule="evenodd"
                d="m50 100c-27.7 0-50-22.4-50-50 0-27.7 22.3-50 50-50 9.1 0 17.6 2.4 25 6.7-15 8.6-25 24.8-25 43.3 0 18.5 10 34.7 25 43.3-7.4 4.3-15.9 6.7-25 6.7z"
            />
        </svg>

        {#each leftOnly as f, i}
            <div 
                class="pop"
                style="--nth: {i}; --n: {leftOnly.length};"
            >
                <img src="https://image.tmdb.org/t/p/w200{f.poster_path}" alt={f.title}>
            </div>
        {/each}
    </div>

    <div 
        class="slice mid"
        class:active={m}
        class:posters={midOnly.length > 0}
    >

        <div class="label">
            <span>Shared</span>
            <span>{left.intersection(right).size()} Films</span>
        </div>

        <svg 
            version="1.2" 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-2 -2 54 92"
            width="50" height="88"
        >
            <path 
                on:click={() => m = !m}
                on:keypress={() => m = !m}
                role="button"
                class="path"
                tabindex="0"
                id="m" 
                fill-rule="evenodd"
                d="m50 44c0 18.5-10 34.7-25 43.3-15-8.6-25-24.8-25-43.3 0-18.5 10-34.7 25-43.3 15 8.6 25 24.8 25 43.3z"
            />
        </svg>

        {#each midOnly as f, i}
            <div 
                class="pop"
                style="--nth: {i}; --n: {midOnly.length};"
            >
                <img src="https://image.tmdb.org/t/p/w200{f.poster_path}" alt={f.title}>
            </div>
        {/each}
    </div>

    <div 
        class="slice right" 
        class:active={r}
        class:posters={rightOnly.length > 0}
        data-name="{rightName}"
    >

        {#key rightName}
            <div class="label" in:fly={{ y: -200 }}>
                {#if rightName}
                    <span>{rightName}</span>
                {/if}
                <span>{right.difference(left).size()} Films</span>
            </div>
        {/key}

        <svg 
            version="1.2" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="-2 -2 80 104" 
            width="76" height="100"
        >
            <path 
                on:click={() => r = !r}
                on:keypress={() => r = !r}
                role="button"
                class="path"
                tabindex="0"
                id="r"
                fill-rule="evenodd"
                d="m50 100c-27.7 0-50-22.4-50-50 0-27.7 22.3-50 50-50 9.1 0 17.6 2.4 25 6.7-15 8.6-25 24.8-25 43.3 0 18.5 10 34.7 25 43.3-7.4 4.3-15.9 6.7-25 6.7z"
            />
        </svg>

        
        {#each rightOnly as f, i}
            <div 
                class="pop"
                style="--nth: {i}; --n: {rightOnly.length};"
            >
                <img src="https://image.tmdb.org/t/p/w200{f.poster_path}" alt={f.title}>
            </div>
        {/each}
    </div>

</div>



<style>
    .ven {
        display: flex;
        position: relative;
        justify-content: center;
        padding: 2rem 5rem;
        z-index: 1;
        --width-side: min(275px, calc(100vw / 4));
        --height-side: calc(var(--width-side) * 100 / 76);
        --width-mid: calc(var(--width-side) * 50 / 76);
        --height-mid: calc(var(--width-mid) * 88 / 50);
    }


    svg {
        width: 100%;
        height: auto;
        display: flex;
        overflow: hidden;
    }
    

/* 
    .ven:has(:is(.left.posters, .right.posters) :is(.path:hover, .path:focus-visible)) .searches {
        transition-delay: 0ms;
        top: -3.5rem;
    } */

    .slice {
        position: relative;
        transition: scale ease-in-out 200ms, opacity ease-in-out 200ms;
    }


    .active {
        filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.5));
        stroke: white;
        stroke-width: .5;
    }

    .slice:has(.path:hover, .path:focus-visible) {
        scale: 1.08 1.08;
    }


    .left, .right {
        width: var(--width-side);
    }

    .left {
        fill: #ff8000;
    }

    .mid {
        width: var(--width-mid);
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        scale: .9 .9;
        z-index: 3;
        border-radius: 50%;
        fill: #00e054;
    }

    .mid svg {
        border-radius: 50%;
    }

    .right {
        fill: #40bcf4;
    }

    .right svg {
        rotate: 180deg;
    }
    

    .mid:has(.path:hover, .path:focus-visible) {
        scale: 1.02 .98;
    }

    .path {
        transition: filter ease-in-out 200ms;
        filter: brightness(.5);
        cursor: pointer;
    }


    .active .path {
        filter: brightness(1);
    }

    .path:focus {
        outline: none;
    }

    .label {
        transition: color ease-in-out 200ms, opacity ease-in-out 200ms, text-shadow ease-in-out 200ms;
        position: absolute;
        top: 50%;
        opacity: .6;
        color: white;
        text-align: center;
        display: flex;
        flex-direction: column;
        pointer-events: none;
        font-weight: bold;
        /* background-color: green; */
        z-index: 2;
    }

    .label span:first-child {
        font-size: 1.25rem;
    }

    .label span:nth-child(2) {
        font-size: 1rem;
    }
    
    .left .label {
        left: 8px;
        right: calc(var(--width-side) * 1 / 3 + 8px);
        translate: 0 -50%;
    }

    .mid .label {
        left: 50%;
        translate: -50% -50%;
    }

    .right .label {
        right: 8px;
        left: calc(var(--width-side) * 1 / 3 + 8px);
        translate: 0 -50%;
    }


    .active .label {
        color: rgb(241, 241, 241);
        opacity: 1;
    }

    .left.active .label {
        text-shadow: 1px 1px 4px #3a1d00;
    }

    .mid.active .label {
        text-shadow: 1px 1px 4px #003012;
    }

    .right.active .label {
        text-shadow: 1px 1px 4px #112d3a;
    }

    .pop {
        position: absolute;

        --pop-size: 40px;
        --radius: calc(var(--height-side) / 2 + var(--pop-size) / 2);
        --start-angle: 65deg;
        --end-angle: 295deg;
        --offset-per: calc((var(--end-angle) - var(--start-angle)) / (var(--n) - 1));
        --angle-offset: calc((var(--nth)) * var(--offset-per));

        width: var(--pop-size);
        /* height: var(--pop-size); */
        border-radius: 4px;
        /* border-radius: 50%; */
        overflow: hidden;
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        pointer-events: none;

        top: 50%;
        translate: -50% -50%;

        --show-all-time: 100ms;
        transition: translate linear 200ms, opacity ease-in-out 200ms, inset ease-in-out 200ms;
        transition-delay: calc((var(--show-all-time) / (var(--n))) * (var(--n) - var(--nth)));

    }

    .pop img {
        object-fit: cover;
    }

    .left .pop {
        left: 100%;
    }

    .right .pop {
        right: 100%;
        translate: 50% -50%;
        --start-angle: 115deg;
        --end-angle: 345deg;
        --angle-offset: calc(-1 * (var(--nth)) * var(--offset-per));
    }

    .mid .pop {

        left: 50%;

        --interior-angle: ((var(--n) - 2) * 180deg / var(--n));

        --radius: calc(var(--width-mid) * .6 + var(--pop-size) / 2);
        --start-angle: calc(90deg - var(--interior-angle) + 180deg);
        --end-angle: calc(var(--start-angle) + 360deg);
        --offset-per: calc((var(--end-angle) - var(--start-angle)) / (var(--n)));
        --angle-offset: calc((var(--nth)) * var(--offset-per));
    }

    .left:has(.path:is(:hover, :focus-visible)) .pop {
        opacity: 1;
        --recenter-x: var(--radius) / 2 - 50%;
        translate: calc(cos((var(--start-angle) + var(--angle-offset))) * var(--radius) - var(--recenter-x)) 
                   calc(sin((var(--start-angle) + var(--angle-offset))) * var(--radius) * -1 - 50%);
    }

    .right:has(.path:is(:hover, :focus-visible)) .pop {
        opacity: 1;
        --recenter-x: var(--radius) / 2 + 50%;
        translate: calc(cos((var(--start-angle) + var(--angle-offset))) * var(--radius) + var(--recenter-x)) 
                   calc(sin((var(--start-angle) + var(--angle-offset))) * var(--radius) * -1 - 50%);
    }

    .mid:has(.path:is(:hover, :focus-visible)) .pop {
        opacity: 1;
        translate: calc(cos((var(--start-angle) + var(--angle-offset))) * var(--radius) - 50%) 
                   calc(sin((var(--start-angle) + var(--angle-offset))) * var(--radius) * -1 - 50%);
    }

    .slice:has(.path:is(:hover, :focus-visible)) .pop {
        transition-delay: calc((var(--show-all-time) / (var(--n))) * var(--nth));
    }
    

    @media (max-width: 1200px) {
        .label span:is(:first-child, :last-child) {
            font-size: .8rem;
        }

        .ven {
            --width-side: min(300px, calc(100vw / 2 - 1rem));
            padding: 2rem 1rem;
        }

        .pop {
            display: none;
            /* --pop-size: 20px;
            --radius: calc(var(--height-side) / 2); */
        }
    }


    @media (max-width: 480px) {

        /* .label {
            display: none;
        } */
    }
</style>