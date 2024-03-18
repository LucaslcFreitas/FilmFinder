export interface MockStorage extends Storage {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export class LocalStorageMock implements MockStorage {
    private store: { [key: string]: string } = {};

    getItem(key: string): string | null {
        return this.store[key] || null;
    }

    setItem(key: string, value: string): void {
        this.store[key] = value;
    }

    removeItem(key: string): void {
        delete this.store[key];
    }

    clear(): void {
        this.store = {};
    }

    key(index: number): string | null {
        const keys = Object.keys(this.store);
        return index < keys.length ? keys[index] : null;
    }

    get length(): number {
        return Object.keys(this.store).length;
    }
}
