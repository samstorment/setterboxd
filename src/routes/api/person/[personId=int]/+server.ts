import * as api from '$lib/movie-api.js';
import type { Person } from '$lib/movie-types.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const person = await api.get<Person>(`/person/${params.personId}?language=en-US`);
    return json(person);
}