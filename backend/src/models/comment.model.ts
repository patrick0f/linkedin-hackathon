export interface IComment {
    id?: string;
    text: string;
    user: {
        id: string;
        name: string;
        imageUrl: string;
    };
    postId: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICommentDocument extends IComment {
    id: string;
    createdAt: string;
    updatedAt: string;
} 