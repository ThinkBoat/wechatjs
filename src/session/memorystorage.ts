import { SessionStorage } from ".";

export class MemoryStorage implements SessionStorage {
    private data: Record<string, unknown>

    constructor() {
        this.data = {}
    }


    get(key: string) {
        return this.data[key]
    }

    set(key: string, value: unknown, ttl?: number) {
        if (value) {
            this.data[key] = value
        }
    };

    delete(key: string) {
        delete this.data[key]
    };
}