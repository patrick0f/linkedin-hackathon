export interface IUser {
    id?: string;
    firstName: string;
    lastName: string;
    userId: string;
    profilePhoto?: string;
    bio?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IUserDocument extends IUser {
    id: string;
    createdAt: string;
    updatedAt: string;
} 