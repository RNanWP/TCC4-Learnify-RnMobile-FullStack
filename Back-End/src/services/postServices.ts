import { Post, IPost } from "../models/Post";
import { Comment } from "../models/Comment";
import { Types } from "mongoose";

// Buscar post por palavra chave no titulo ou conteudo
export async function searchPostService(query: string): Promise<IPost[]> {
  const searchRegex = new RegExp(query, "i");

  return Post.find({
    $or: [
      { title: { $regex: searchRegex } },
      { content: { $regex: searchRegex } },
    ],
  })
    .sort({ createdAt: -1 })
    .populate("author", "name avatarUrl")
    .exec();
}

// Retorna todos os posts para gerenciamento (ADM)
export async function getAdminPostService(): Promise<IPost[]> {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("author", "name avatarUrl")
    .exec();

  return posts.filter((post: IPost) => post.author);
}

export async function getAllPostsService(): Promise<IPost[]> {
  return Post.find()
    .sort({ createdAt: -1 })
    .populate("author", "name avatarUrl")
    .exec();
}

export async function getPostByIdService(id: string): Promise<IPost | null> {
  return Post.findById(id).populate("author", "name avatarUrl").exec();
}

export async function createPostService(data: {
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
}): Promise<IPost> {
  const post = new Post(data);
  return post.save();
}

export async function updatePostService(
  id: string,
  data: Partial<{ title: string; content: string }>
): Promise<IPost | null> {
  return Post.findByIdAndUpdate(id, data, { new: true }).exec();
}

export async function deletePostService(id: string): Promise<IPost | null> {
  await Comment.deleteMany({ post: id });
  return Post.findByIdAndDelete(id).exec();
}

export async function toggleLikeService(postId: string, userId: string) {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post não encontrado");
  }

  const userObjectId = new Types.ObjectId(userId);
  const isLiked = post.likes.some((id) => id.equals(userObjectId));

  if (isLiked) {
    post.likes = post.likes.filter((id) => !id.equals(userObjectId));
  } else {
    post.likes.push(userObjectId);
  }

  await post.save();
  return post;
}
