import { Model } from "sequelize";

export interface CanCRUD<T extends Model> {
    findAll: () => Promise<Array<T>>;
    findById: (id: number) => Promise<T | null>;
    create: (data: T) => Promise<T>;
    update: (id: number, data: T) => Promise<[affectedCount: number]>;
    delete: (id: number) => Promise<number>;
    findAllByCondition: (params: { [key: string]: any }) => Promise<Array<T> | null>;
}