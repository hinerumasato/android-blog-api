import { Category } from "@/models";
import { CategoryService } from "@/services/categoryService";
import { Arrays, ResponseBody } from "@/utils";
import { Request, Response } from "express";
import { ForeignKeyConstraintError } from "sequelize";

class CategoryController {
    private categoryService: CategoryService;
    constructor() {
        this.categoryService = new CategoryService();
    }

    public findAll = async (req: Request, res: Response) => {
        const { name } = req.query;
        let data: Array<Category> | null = 
            (Arrays.isContainElementValid([name])) 
            ? await this.categoryService.findAllByCondition({ name })
            : await this.categoryService.findAll();
        if(Arrays.isEmpty(data)) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Not found'
            })
        } else {
            data = data as Array<Category>;
            return res.status(200).json({
                statusCode: 200,
                message: 'Get list category success',
                data: data
            })
        }
    }

    public findById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const category = await this.categoryService.findById(id);
        if(category) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Success',
                data: category
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'Not found'
            })
        }
    }

    public create = async (req: Request, res: Response) => {
        const invalidFields = ResponseBody.getInvalidCategoryFields(req.body);
        if(!Arrays.isEmpty(invalidFields)) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid fields, these fields are required',
                fields: invalidFields
            });
        }
        const { name } = req.body;
        const category = Category.build({ name });
        const result = await this.categoryService.create(category);
        if(result) {
            return res.status(201).json({
                statusCode: 201,
                message: 'Category created successfully',
                data: result
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server error'
            });
        }
    }

    public update = async (req: Request, res: Response) => {
        const { name } = req.body;
        const id = parseInt(req.params.id);
        const invalidFields = ResponseBody.getInvalidCategoryFields(req.body);
        if(!Arrays.isEmpty(invalidFields)) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid fields, these fields are required',
                fields: invalidFields
            });
        }
        const category = Category.build({ name });
        const result = await this.categoryService.update(id, category);
        const [affectedCount] = result;
        if(affectedCount > 0) {
            return res.json({
                statusCode: 200,
                message: 'Category updated successfully',
                affectedCount: affectedCount
            });
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'Category not found'
            });
        }
    }

    public delete = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        try {
            const affectedCount = await this.categoryService.delete(id);
            if(affectedCount > 0) {
                return res.json({
                    statusCode: 200,
                    message: 'Category deleted successfully',
                    affectedCount: affectedCount
                });
            } else {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Category not found'
                });
            }
        } catch (error) {
            const sequelizeError = error as ForeignKeyConstraintError;
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server error',
                error: sequelizeError.message
            });
        }
    }
}

export default new CategoryController();