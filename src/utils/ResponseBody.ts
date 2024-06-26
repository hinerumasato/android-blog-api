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

    static getInvalidLovePostFields = (body: any) => {
        const { postId, userId } = body;
        const invalidFiels = [];
        if(!postId) invalidFiels.push('postId');
        if(!userId) invalidFiels.push('userId');
        return invalidFiels;
    }

    static getInvalidCommentFields = (body: any) => {
        const { postId, userId, content } = body;
        const invalidFiels = [];
        if(!postId) invalidFiels.push('postId');
        if(!userId) invalidFiels.push('userId');
        if(!content) invalidFiels.push('content');
        return invalidFiels;
    }
}