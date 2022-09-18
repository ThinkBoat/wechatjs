export interface SessionStorage {
    get: (key: string) => unknown 
    set: (key: string, value: unknown, ttl?: number) => void
    delete: (key: string) => void
}