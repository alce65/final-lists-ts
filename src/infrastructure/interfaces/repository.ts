export type basicT = { id: number | string };

export type basicResponse = { ok: boolean };

export interface Repository<T extends basicT, R extends basicResponse> {
    getAllItems: () => Promise<Array<T>>;
    getItem: (id: T['id']) => Promise<T>;
    addItem: (item: T) => Promise<T>;
    updateItem: (item: Partial<T>) => Promise<T>;
    deleteItem: (id: T['id']) => Promise<R>;
}

export interface FBResponse {
    ok: boolean;
}
