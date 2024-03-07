import { emptyPersonSearch } from '$lib';
import * as api from '$lib/movie-api.js';
import type { PersonSearch } from '$lib/movie-types.js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    
    const q = url.searchParams.get('q');

    if (!q || q?.trim() === '') {
        const emptyResult = emptyPersonSearch;
        return json(emptyResult);
    }

    const res = await api.get<PersonSearch>(`/search/person?query=${q}&include_adult=false&language=en-US&page=1`);

    res.results = res.results.sort((a, b) => b.popularity - a.popularity);

    return json(res);
}