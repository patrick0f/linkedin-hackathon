export interface IPost {
  _id: string;
  description: string;
  user: {
    userId: string;
    profilePhoto: string;
    firstName: string;
    lastName: string;
  };
  imageUrl?: string;
  likes?: string[];
  comments?: IComment[];
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  _id: string;
  text: string;
  user: {
    userId: string;
    profilePhoto: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
} 