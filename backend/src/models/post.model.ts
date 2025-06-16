export interface IPost {
    id?: string;
    description: string;
    user: {
        id: string;
        name: string;
        imageUrl: string;
    };
    imageUrl?: string;
    likes: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface IPostDocument extends IPost {
    id: string;
    createdAt: string;
    updatedAt: string;
} 