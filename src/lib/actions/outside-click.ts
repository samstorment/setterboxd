import type { ActionReturn } from "svelte/action";

type Params = {};

type Attributes = {
    'on:outsideclick': () => void;
}

export function outsideClick(node: HTMLElement): ActionReturn<Params, Attributes> {

    function onDown(_: MouseEvent) {
        window.addEventListener('pointerup', e => {
            
            let target = e.target as Node | null;

            if (e.target === node || node.contains(target)) {
                return;
            }

            node.dispatchEvent(new CustomEvent('outsideclick'));

        }, { once: true });
    }

    window.addEventListener('pointerdown', onDown);

    return {
        destroy() {
            window.removeEventListener('click', onDown);
        }
    };
}