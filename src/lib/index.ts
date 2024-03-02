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
