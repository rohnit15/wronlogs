import { Post } from "@models/schemas/post";

export const createPost = async (postData: any) => {
    const post = new Post(postData);
    await post.save();
    return post;
};