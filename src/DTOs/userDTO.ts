export class UserDTO {
    private username: string;
    private password: string;
    private email: string;
    private fullName: string;
    private avatar: string | null;

    public constructor(username: string, password: string, email: string, fullName: string, avatar: string | null = null) {
        this.username = username
        this.password = password;
        this.email = email
        this.fullName = fullName;
        this.avatar = avatar;
    }
}