import { MOVIE_DB_API_KEY } from "$env/static/private";

const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${MOVIE_DB_API_KEY}`
};


export async function get<T>(endpoint: `/${string}`, init?: RequestInit) {

    const url = new URL(`https://api.themoviedb.org/3${endpoint}`);
    url.searchParams.append('api_key', MOVIE_DB_API_KEY);

    const res = await fetch(url, { headers, ...init });
    return await res.json() as T;
}