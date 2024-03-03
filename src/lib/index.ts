import type { PersonSearch } from "./movie-types";

export interface Film {
    id: ReturnType<typeof crypto.randomUUID> | number;
    title: string;
    director: string;
    year: number;
    poster?: string | null;
} 

export interface VenData {
    left: Film[],
    right: Film[]
}


export const emptyPersonSearch: PersonSearch = { page: 1, results: [], total_pages: 1, total_results: 0 };