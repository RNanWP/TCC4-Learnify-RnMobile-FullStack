import { User, IUser } from "../models/User";
import { JWT_SECRET } from "../config";
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

interface CreateUserPayload {
  name: IUser["name"];
  email: IUser["email"];
  password: IUser["password"];
  role?: IUser["role"];
}

export async function registerUserService(
  userData: CreateUserPayload
): Promise<IUser> {
  const user = new User(userData);
  return user.save();
}

export async function updateAvatarService(userId: string, avatarUrl: string) {
  return await User.findByIdAndUpdate(
    userId,
    { avatarUrl: avatarUrl },
    { new: true }
  );
}

export async function loginUserService(
  email: string,
  password: string
): Promise<{ user: IUser; token: string } | null> {
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return null;
  }

  const payload = { id: user._id, email: user.email, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, {});

  return { user, token };
}

// Admin Delete
export async function deleteUserService(id: string): Promise<IUser | null> {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return null;
  }
  await Post.deleteMany({ author: id });
  await Comment.deleteMany({ author: id });

  return user;
}

// Admin: Retorna todos os usuários
export async function getAllUsersService(): Promise<IUser[]> {
  return User.find().sort({ createdAt: -1 }).exec();
}
