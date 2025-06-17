export interface IPost {
  id: string;
  user_id: string;
  post_text: string;
  "Picture link"?: string;
  Comments?: string[];
  num_of_likes?: number;
  created_at?: string;
  updated_at?: string;
}

export interface IComment {
  id: string;
  text: string;
  user: {
    userId: string;
    profilePhoto: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
} 