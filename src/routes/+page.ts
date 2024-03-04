import { emptyPersonSearch, type Venn, type Side } from '$lib';
import type { Credit, Person } from '$lib/movie-types.js';
import { UniqueSet } from '$lib/set.js';



export async function load({ url, fetch }): Promise<Venn> {
    const left = url.searchParams.get('left');
    const right = url.searchParams.get('right');

    async function fetchSide(id: string | null): Promise<Side> {

        if (!id || !parseInt(id)) {
            return {
                person: undefined,
                credits: new UniqueSet<Credit>()
            }
        }
    
        const personRes = await fetch(`/api/person/${id}`);
        const person: Person = await personRes.json();
    
        const creditsRes = await fetch(`/api/credits/${id}`);
        const credits: Credit[] = await creditsRes.json();
    

        return {
            person, credits: new UniqueSet(...credits)
        }
    }

    return {
        left: await fetchSide(left),
        right: await fetchSide(right)
    }
}