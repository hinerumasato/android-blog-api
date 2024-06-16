export class UserDTO {
    private id: number | null;
    private username: string;
    private email: string;
    private fullName: string;
    private avatar: string | null;

    public constructor(id: number | null, username: string, email: string, fullName: string, avatar: string | null = null) {
        this.id = id;
        this.username = username
        this.email = email
        this.fullName = fullName;
        this.avatar = avatar;
        
    }
}