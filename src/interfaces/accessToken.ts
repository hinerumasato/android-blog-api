import { User } from "@/models";

export interface AccessTokenValue {
    user: User,
    expires: number,
}

export interface AccessToken {
    [key: string]: AccessTokenValue;
}