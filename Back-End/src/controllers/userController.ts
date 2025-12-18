import { Request, Response } from "express";
import * as userService from "../services/userServices";

// registro
export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;
    const user = await userService.registerUserService({
      name,
      email,
      password,
      role,
    });

    // const user = await userService.registerUserService(req.body);
    const userResponse = user.toObject();
    delete userResponse.password;

    res
      .status(201)
      .json({ message: "Usuário criado com sucesso!", user: userResponse });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Este email já está em uso." });
    }
    res
      .status(500)
      .json({ message: "Erro ao registrar usuário", error: error.message });
  }
}

// login
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUserService(email, password);

    if (!result) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const { user, token } = result;
    const userResponse = user.toObject();
    delete userResponse.password;

    res
      .status(200)
      .json({ message: "Login bem-sucedido!", user: userResponse, token });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao fazer login", error: error.message });
  }
}

export async function uploadAvatar(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Nenhuma imagem enviada." });
    }

    // @ts-ignore
    const userId = req.user.id;

    // @ts-ignore
    const fileUrl = req.file.location || req.file.path;

    const user = await userService.updateAvatarService(userId, fileUrl);

    res.json({ message: "Avatar atualizado!", user });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar avatar", error: error.message });
  }
}

// Atualizar Usuário (Admin/Prof)
export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const updatedUser = await userService.updateUserService(id, {
      name,
      email,
      role,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.json({ message: "Usuário atualizado com sucesso!", user: updatedUser });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Este email já está em uso." });
    }
    res
      .status(500)
      .json({ message: "Erro ao atualizar usuário", error: error.message });
  }
}

// Admin Delete
export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deletedUser = await userService.deleteUserService(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(204).send();
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao deletar usuário", error: error.message });
  }
}
// Admin: Listar todos os usuários
export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userService.getAllUsersService();
    res.json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar usuários", error: error.message });
  }
}
