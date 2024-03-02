import type { Film } from '$lib';
import * as api from '$lib/movie-api.js';
import type { MovieCredits } from '$lib/movie-types.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {

    const res = await api.get<MovieCredits>(`/person/${params.personId}/movie_credits?language=en-US`);

    const films = [...res.cast, ...res.crew].map(f => {
        const film: Film = {
            director: '',
            id: f.id,
            poster: f.poster_path,
            title: f.title,
            year: new Date(f.release_date).getFullYear()
        }

        return film;
    });

    return json(films);
}