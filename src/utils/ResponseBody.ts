export class ResponseBody {
    static getInvalidPostFields = (body: any) => {
        const { title, content, userId, categoryId } = body;
        const invalidFiels = [];
        if(!title) invalidFiels.push('title');
        if(!content) invalidFiels.push('content');
        if(!userId) invalidFiels.push('userId');
        if(!categoryId) invalidFiels.push('categoryId');
        return invalidFiels;
    }

    static getInvalidUserFields = (body: any) => {
        const { username, password, email, fullName } = body;
        const invalidFiels = [];
        if(!username) invalidFiels.push('username');
        if(!password) invalidFiels.push('password');
        if(!email) invalidFiels.push('email');
        if(!fullName) invalidFiels.push('fullName');
        return invalidFiels;
    }

    static getInvalidCategoryFields = (body: any) => {
        const { name } = body;
        const invalidFiels = [];
        if(!name) invalidFiels.push('name');
        return invalidFiels;
    }
}