import { Request, Response } from "express";
import ServerResponse from "../helpers/serverResponse";
import prisma from "../prisma/prisma-client";

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) return ServerResponse.error(res, "User not found");
    return ServerResponse.success(res, "User retrieved successfully", { user });
  } catch (error) {
    return ServerResponse.error(res, "Internal server error");
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return ServerResponse.success(res, "All users", { users });
  } catch (error) {
    return ServerResponse.error(res, "Internal Server error");
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: { id },
    });
    if (!user) return ServerResponse.error(res, "User not found");
    return ServerResponse.success(res, "User deleted successfully", { user });
  } catch (error) {
    return ServerResponse.error(res, "Internal Server error");
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const { names, email, phone } = req.body;
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) return ServerResponse.error(res, "User not found");

    if (!names || !email || !phone) {
      return ServerResponse.success(res, "Found nothing to update", { user });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        names: names ?? user.names,
        email: email ?? user.email,
        phone: phone ?? user.phone,
      },
    });

    return ServerResponse.success(res, "Updated user successfully", {
      user: updatedUser,
    });
  } catch (error) {
    return ServerResponse.error(res, "Internal server error", error);
  }
};

const usersController = {
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
};

export default usersController;
