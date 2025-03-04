import { User } from "./user"

export interface Portfolio {
    id?: number,
    name: string,
    user?: User,
    userId?: number,
    createdDate?: Date,
    modifiedDate?: Date
}