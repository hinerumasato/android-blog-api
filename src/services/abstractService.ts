import { Model, ModelStatic } from "sequelize";
import { CanCRUD } from "@/interfaces/canCRUD";
import { Objects } from "@/utils";

export abstract class AbstractService<T extends Model> implements CanCRUD<T> {
    abstract findAll: () => Promise<T[]>;
    abstract findById: (id: number) => Promise<T | null>;
    abstract create: (data: T) => Promise<T>;
    abstract update: (id: number, data: T) => Promise<[affectedCount: number]>;
    abstract delete: (id: number) => Promise<number>;
    
    findAllByCondition = (params: { [key: string]: any }): Promise<Array<T> | null> => {
        const filtered = Objects.filterValidFields(params);
        return this.model.findAll({
            where: {
                ...filtered
            }
        }) as Promise<T[] | null>;
    }

    protected abstract get model(): ModelStatic<Model<{}, {}>>;
}