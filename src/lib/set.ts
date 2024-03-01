interface Identifiable {
    id: string | number;
}

export class UniqueSet<T extends Identifiable> {
    private set: Set<T>;

    constructor(...items: T[]) {
        this.set = new Set<T>();
        items.forEach(item => {
            if (!this.hasDuplicateId(item)) {
                this.set.add(item);
            }
        });
    }

    add(obj: T): boolean {
        if (!this.hasDuplicateId(obj)) {
            this.set.add(obj);
            return true;
        }
        return false;
    }

    delete(obj: T): boolean {
        if (this.set.has(obj)) {
            this.set.delete(obj);
            return true;
        }
        return false;
    }

    has(obj: T): boolean {
        return this.toArray().some(item => item.id === obj.id);
    }

    clear(): void {
        this.set.clear();
    }

    size(): number {
        return this.set.size;
    }

    union(otherSet: UniqueSet<T>): UniqueSet<T> {
        const unionSet = new UniqueSet<T>(...this.set, ...otherSet.set);
        return unionSet;
    }

    intersection(otherSet: UniqueSet<T>): UniqueSet<T> {
        const intersectionSet = new UniqueSet<T>();
        this.set.forEach(item => {
            if (otherSet.has(item)) {
                intersectionSet.add(item);
            }
        });
        return intersectionSet;
    }

    difference(otherSet: UniqueSet<T>): UniqueSet<T> {
        const differenceSet = new UniqueSet<T>();
        this.set.forEach(item => {
            if (!otherSet.has(item)) {
                differenceSet.add(item);
            }
        });
        return differenceSet;
    }

    private hasDuplicateId(obj: T): boolean {
        return this.toArray().some(item => item.id === obj.id);
    }

    toArray(): T[] {
        return Array.from(this.set);
    }

    [Symbol.iterator](): Iterator<T> {
        let items = this.toArray();
        let index = 0;
        return {
            next(): IteratorResult<T> {
                if (index < items.length) {
                    return { value: items[index++], done: false };
                } else {
                    return { value: undefined as any, done: true };
                }
            }
        };
    }
}