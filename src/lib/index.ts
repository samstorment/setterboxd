import type { Credit, Person, PersonSearch } from "./movie-types";
import type { UniqueSet } from "./set";

export interface Film {
    id: ReturnType<typeof crypto.randomUUID> | number;
    title: string;
    director: string;
    year: number;
    poster?: string | null;
} 



export const emptyPersonSearch: PersonSearch = { page: 1, results: [], total_pages: 1, total_results: 0 };



export interface Venn {
    left: Side;
    right: Side;
}

export interface Side {
    person?: Person;
    credits: UniqueSet<Credit>;
}

