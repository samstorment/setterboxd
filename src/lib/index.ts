export interface Film {
    id: ReturnType<typeof crypto.randomUUID>;
    title: string;
    director: string;
    year: number;
    poster: string;
} 

export interface VenData {
    left: Film[],
    right: Film[]
}


class UniqueSet<T> {
    private set: Set<T>;

    constructor() {
        this.set = new Set<T>();
    }

    add(obj: T): boolean {
        if (!this.hasDuplicateId(obj)) {
            this.set.add(obj);
            return true;
        }
        return false;
    }

    private hasDuplicateId(obj: T): boolean {
        const id = (obj as any).id; // Assuming id is a property of the object
        for (const item of this.set) {
            const itemId = (item as any).id;
            if (itemId !== undefined && itemId === id) {
                return true;
            }
        }
        return false;
    }

    // Implement other Set methods as needed
    // e.g., delete, has, clear, etc.

    // You can also provide other utility methods here
}