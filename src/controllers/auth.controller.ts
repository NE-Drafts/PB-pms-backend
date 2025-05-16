import { Request, Response } from "express";
import prisma from "../prisma/prisma-client";
import ServerResponse from "../helpers/serverResponse";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
  try {
    const { names, email, phone, password, role } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser)
      return ServerResponse.error(
        res,
        `${existingUser.email === email ? "Email" : "Phone"} already exists`
      );

    const hashedPassword = hashSync(password, 12);
    const newUser = await prisma.user.create({
      data: {
        names,
        email,
        phone,
        password: hashedPassword,
        role,
      },
    });

    return ServerResponse.created(res, "User created successfully", {
      user: newUser,
    });
  } catch (error) {
    return ServerResponse.error(res, "Register failed", error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return ServerResponse.unauthenticated(res, "Invalid email or password");
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid)
      return ServerResponse.unauthenticated(res, "Invalid email or password");
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "3d" }
    );
    return ServerResponse.success(res, "Login succssful", { user, token });
  } catch (error) {
    return ServerResponse.error(res, "Login failed", error);
  }
};

const authController = {
    register,
    login,
}

export default authController;