import { Request, Response } from "express";
import ServerResponse from "../helpers/serverResponse";
import prisma from "../prisma/prisma-client";

const registerVehicle = async (req: Request, res: Response) => {
  try {
    const { plateNumber, userId, vehicleType, model } = req.body;

    const existingVehicle = await prisma.vehicle.findFirst({
      where: {
        plateNumber,
      },
    });

    if (existingVehicle)
      return ServerResponse.error(
        res,
        "Vehicle with this plate number already exists"
      );

    const newVehicle = await prisma.vehicle.create({
      data: {
        plateNumber,
        userId,
        vehicleType,
        model,
      },
    });

    return ServerResponse.created(res, "Vehicle registered successfully", {
      vehicle: newVehicle,
    });
  } catch (error) {
    return ServerResponse.error(res, "Vehicle registration failed", error);
  }
};

const getUserVehicles = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const vehicles = await prisma.vehicle.findMany({
      where: {
        userId,
      },
    });
    if (!vehicles)
      return ServerResponse.error(res, "No vehicles found for this user");
    return ServerResponse.success(res, "Vehicles retried successfully", {
      vehicles,
    });
  } catch (error) {}
};

const getVehicle = async (req: Request, res: Response) => {
  try {
    const { plateNumber } = req.params;
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        plateNumber,
      },
    });
    if (!vehicle) return ServerResponse.error(res, "Vehicle not found");
    return ServerResponse.success(res, "Vehicle retrieved successfully", {
      vehicle,
    });
  } catch (error) {
    return ServerResponse.error(res, "Vehicle retrieval failed", error);
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {        
    const vehicles = await prisma.vehicle.findMany();
    if (!vehicles) return ServerResponse.error(res, "No vehicles found");
    return ServerResponse.success(res, "Vehicles retrived successfully", {
      vehicles,
    });
  } catch (error) {
    return ServerResponse.error(res, "Vehicles retrieval failed", error);
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { plateNumber, model } = req.body;
    const { vehicleId } = req.params;
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: vehicleId,
      },
    });
    if (!vehicle) return ServerResponse.error(res, "Vehicle not found");
    const updatedVehicle = await prisma.vehicle.update({
      where: {
        id: vehicleId,
      },
      data: {
        plateNumber: plateNumber ?? vehicle.plateNumber,
        model: model ?? vehicle.model,
      },
    });

    return ServerResponse.success(res, "Vehicle updated successfully", {
      vehicle: updatedVehicle,
    });
  } catch (error) {
    return ServerResponse.error(res, "Vehicle update failed", error);
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const { plateNumber } = req.params;
    const vehicle = prisma.vehicle.delete({
      where: {
        plateNumber,
      },
    });
    if (!vehicle) return ServerResponse.error(res, "Vehicle Not found");
    return ServerResponse.success(res, "Vehicle deleted", vehicle);
  } catch (error) {
    return ServerResponse.error(res, "Vehicle delete failed", error);
  }
};

const vehicleController = {
  registerVehicle,
  getVehicle,
  getUserVehicles,
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
};

export default vehicleController;
