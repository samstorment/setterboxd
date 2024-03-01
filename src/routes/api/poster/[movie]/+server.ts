import * as api from '$lib/movie-api.js';
import type { SearchResponse } from '$lib/movie-types.js';
import { error, json } from '@sveltejs/kit';


export async function GET({ params }) {
    const response = await api.get<SearchResponse>(`/search/movie?query=${params.movie}&include_adult=false&language=en-US&page=1`);

    if (response.results.length === 0) {
        return json({ path: null });
    }

    const [ film ] = response.results; 

    return json({
        path: `https://image.tmdb.org/t/p/w200${film.poster_path}`
    });
}