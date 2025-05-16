import { Request, Response } from "express";
import ServerResponse from "../helpers/serverResponse";
import prisma from "../prisma/prisma-client";

const registerSlot = async (req: Request, res: Response) => {
  try {
    const { slotNumber } = req.body;
    const existingSlot = await prisma.parkingSlot.findFirst({
      where: {
        slotNumber,
      },
    });
    if (existingSlot)
      return ServerResponse.error(
        res,
        `Slot number ${slotNumber} is already registered`
      );
    const newSlot = await prisma.parkingSlot.create({
      data: {
        slotNumber,
      },
    });
    return ServerResponse.created(res, "Slot registered successfully", {
      slot: newSlot,
    });
  } catch (error) {
    return ServerResponse.error(res, "Slot registration failed", error);
  }
};

const getSlot = async (req: Request, res: Response) => {
  try {
    const { slotNumber } = req.params;
    const slot = await prisma.parkingSlot.findUnique({
      where: {
        slotNumber,
      },
    });

    if (!slot) return ServerResponse.error(res, "Slot not found");
    return ServerResponse.success(res, "Slot retrieved successfully", { slot });
  } catch (error) {
    return ServerResponse.error(res, "Slot retrieval failed", error);
  }
};

const updateSlot = async (req: Request, res: Response) => {
  try {
    const { slotId } = req.params;
    const { slotNumber } = req.body;
    const existingSlot = await prisma.parkingSlot.findUnique({
      where: {
        id: slotId,
      },
    });
    if (!existingSlot) return ServerResponse.error(res, "Slot not found");
    const updatedSlot = await prisma.parkingSlot.update({
      where: {
        id: slotId,
      },
      data: { slotNumber },
    });
    return ServerResponse.success(res, "Slot updated successfully", {
      slot: updatedSlot,
    });
  } catch (error) {
    return ServerResponse.error(res, "Slot update failed", error);
  }
};

const getAllSlots = async (req: Request, res: Response) => {
  try {
    const slots = await prisma.parkingSlot.findMany();
    return ServerResponse.success(res, "Slots retrieved successfully", {
      slots,
    });
  } catch (error) {
    return ServerResponse.error(res, "Slots retrieve failed", error);
  }
};

const deleteSlot = async (req: Request, res: Response) => {
  try {
    const { slotNumber } = req.params;
    const slot = await prisma.parkingSlot.findUnique({
      where: {
        slotNumber,
      },
    });
    if (!slot) return ServerResponse.error(res, "Slot not found");
    const deletedSlot = await prisma.parkingSlot.delete({
      where: {
        slotNumber,
      },
    });

    return ServerResponse.success(res, "Slot deleted successfully", {
      slot: deletedSlot,
    });
  } catch (error) {
    return ServerResponse.error(res, "Slots delete failed", error);
  }
};

const slotController = {
  registerSlot,
  getAllSlots,
  getSlot,
  updateSlot,
  deleteSlot
};

export default slotController;
