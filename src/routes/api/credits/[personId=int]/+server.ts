import type { Film } from '$lib';
import * as api from '$lib/movie-api.js';
import type { MovieCredits } from '$lib/movie-types.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {

    const res = await api.get<MovieCredits>(`/person/${params.personId}/movie_credits?language=en-US`);

    const films = [...res.cast, ...res.crew]
        .sort((a, b) => b.popularity - a.popularity);

    return json(films);
}