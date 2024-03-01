<script lang="ts">
    import type { Film } from '$lib';
    import { UniqueSet } from "$lib/set";
    import { fly, fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { send, receive } from '$lib/transition';

    export let data;

    let l = false;
    let r = false;
    let m = true;

    let films: UniqueSet<Film>;

    let leftFilms = data.left.difference(data.right);
    let rightFilms = data.right.difference(data.left);
    let midFilms = data.right.intersection(data.left);

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
            films = rightFilms;
        } else if (l) {
            films = leftFilms;
        } else if (m) {
            films = midFilms;
        } else {
            films = new UniqueSet();
        }
    } 

</script>

<div id="page">
    <h1>Setterboxd</h1>

    <div class="ven">
        <div 
            class="slice left"
            class:active={l}
        >
            <div class="label">
                <span>Just Hannah</span>
                <span>{data.left.difference(data.right).size()} Films</span>
            </div>

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

            {#each leftFilms as f, i}
                <div 
                    class="pop"
                    style="--nth: {i}; --n: {leftFilms.size()};"
                >
                    <img src={f.poster} alt={f.title}>
                </div>
            {/each}
        </div>

        <div 
            class="slice mid"
            class:active={m}
        >

            <div class="label">
                <span>Shared</span>
                <span>{data.left.intersection(data.right).size()}</span>
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

            {#each midFilms as f, i}
                <div 
                    class="pop"
                    style="--nth: {i}; --n: {midFilms.size()};"
                >
                    <img src={f.poster} alt={f.title}>
                </div>
            {/each}
        </div>

        <div 
            class="slice right" 
            class:active={r}
        >

            <div class="label">
                <span>Just Sam</span>
                <span>{data.right.difference(data.left).size()} Films</span>
            </div>

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

            
            {#each rightFilms as f, i}
                <div 
                    class="pop"
                    style="--nth: {i}; --n: {rightFilms.size()};"
                >
                    <img src={f.poster} alt={f.title}>
                </div>
            {/each}
        </div>
    </div>

    
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


    .ven {
        display: flex;
        position: relative;
        justify-content: center;
        --width-side: 300px;
        --height-side: calc(var(--width-side) * 100 / 76);
        --width-mid: calc(var(--width-side) * 50 / 76);
        --height-mid: calc(var(--width-mid) * 88 / 50);
        padding: 5rem 1rem;
    }

    svg {
        width: 100%;
        height: auto;
        display: flex;
        overflow: hidden;
    }

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
    }

    .label span:first-child {
        font-size: 1.25rem;
    }

    .label span:nth-child(2) {
        font-size: 1rem;
    }
    
    .left .label {
        left: 15%;
        translate: 0 -50%;
    }

    .mid .label {
        left: 50%;
        translate: -50% -50%;
    }

    .right .label {
        z-index: 2;
        right: 15%;
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
        background-color: black;
        border-radius: 4px;
        /* border-radius: 50%; */
        overflow: hidden;
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        pointer-events: none;

        top: var(--radius);

        --show-all-time: 250ms;
        transition: translate ease-in-out 200ms, opacity ease-in-out 200ms, top ease-in-out 200ms;
        transition-delay: calc(var(--show-all-time) / (var(--n) - var(--nth) + 1));
    }

    .pop img {
        object-fit: cover;
    }

    .left .pop {
        translate: calc(var(--width-side) / 4) -50%;
        left: var(--radius);
    }

    .right .pop {
        translate: calc(-1 * var(--width-side) / 4) -50%;
        right: var(--radius);
        --start-angle: 115deg;
        --end-angle: 345deg;
        --angle-offset: calc(-1 * (var(--nth)) * var(--offset-per));

    }

    .mid .pop {
        /* opacity: 1; */
        top: 50%;
        left: 50%;
        translate: -50% -50%;

        --interior-angle: ((var(--n) - 2) * 180deg / var(--n));

        --radius: calc(var(--width-mid) * .6 + var(--pop-size) / 2);
        --start-angle: calc(90deg - var(--interior-angle) + 180deg);
        --end-angle: calc(var(--start-angle) + 360deg);
        --offset-per: calc((var(--end-angle) - var(--start-angle)) / (var(--n)));
        --angle-offset: calc((var(--nth)) * var(--offset-per));
    }

    .left:has(.path:is(:hover, :focus-visible)) .pop {
        opacity: 1;
        translate: calc(cos((var(--start-angle) + var(--angle-offset))) * var(--radius) - 100%) 
                   calc(sin((var(--start-angle) + var(--angle-offset))) * var(--radius) * -1 - 100%);
    }

    .right:has(.path:is(:hover, :focus-visible)) .pop {
        opacity: 1;
        translate: calc(cos((var(--start-angle) + var(--angle-offset))) * var(--radius) + 100%) 
                   calc(sin((var(--start-angle) + var(--angle-offset))) * var(--radius) * -1 - 100%);
    }

    .mid:has(.path:is(:hover, :focus-visible)) .pop {
        opacity: 1;
        translate: calc(cos((var(--start-angle) + var(--angle-offset))) * var(--radius) - 50%) 
                   calc(sin((var(--start-angle) + var(--angle-offset))) * var(--radius) * -1 - 50%);
    }

    @media (max-width: 680px) {
        .ven {
            --width-side: calc(100vw / 3);
        }

        .label span:is(:first-child, :last-child) {
            font-size: .8rem;
        }
    }

    @media (max-width: 480px) {

        .label {
            display: none;
        }
    }

</style>