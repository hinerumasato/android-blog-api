import { Category } from "@/models";
import { AbstractService } from "./abstractService";
import { ModelStatic, Model } from "sequelize";

export class CategoryService extends AbstractService<Category> {
    findAll = (): Promise<Category[]> => {
        return Category.findAll();
    }
    findById = (id: number): Promise<Category | null> => {
        return Category.findOne({ where: { id } });
    }
    create = (data: Category): Promise<Category> => {
        return Category.create({
            id: data.id,
            name: data.name,

        });
    }
    update = (id: number, data: Category): Promise<[affectedCount: number]> => {
        return Category.update({
            id: data.id,
            name: data.name,
        }, { where: { id } });
    
    }
    delete = (id: number): Promise<number> => {
        return Category.destroy({ where: { id } });
    };
    protected get model(): ModelStatic<Model<{}, {}>> {
        return Category;
    }

}