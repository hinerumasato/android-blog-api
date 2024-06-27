import { Post } from "@/models";

export class UserDTO {
    private id: number | null;
    private username: string;
    private email: string;
    private fullName: string;
    private avatar: string | null;
    private DOB: Date | null;
    private story: string | null;
    private relationship: string | null;
    private relationshipDescription: string | null;
    private nationality: string | null;
    private nationalityDescription: string | null;
    private company: string | null;
    private companyDescription: string | null;
    private posts: Array<Post> | null;

    public constructor(
        id: number | null, 
        username: string, 
        email: string, 
        fullName: string, 
        avatar: string | null = null,
        DOB: Date | null = null,
        story: string | null = null,
        relationship: string | null = null,
        relationshipDescription: string | null = null,
        nationality: string | null = null,
        nationalityDescription: string | null = null,
        company: string | null = null,
        companyDescription: string | null = null,
        posts: Array<Post> | null = null
    ) {
        this.id = id;
        this.username = username
        this.email = email
        this.fullName = fullName;
        this.avatar = avatar;
        this.DOB = DOB;
        this.story = story;
        this.relationship = relationship;
        this.relationshipDescription = relationshipDescription;
        this.nationality = nationality;
        this.nationalityDescription = nationalityDescription;
        this.company = company;
        this.companyDescription = companyDescription;
        this.posts = posts;
    }
}