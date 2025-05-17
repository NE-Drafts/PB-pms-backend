import { Request, Response } from "express";
import ServerResponse from "../helpers/serverResponse";
import prisma from "../prisma/prisma-client";
import { convertBigIntToString } from "../helpers/utils";

const getAllPayments = async (req: Request, res: Response) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        session: {
          include: {
            vehicle: {
              include: {
                owner: true,
              },
            },
          },
        },
      },
    });    

    const serializedData = convertBigIntToString(payments)

    return ServerResponse.success(res, "All payments", { payments: serializedData });
  } catch (error) {
    return ServerResponse.error(res, "Internal Server error 500");
  }
};

const getVehiclePayments = async (req: Request, res: Response) => {
  try {
    const { plateNumber } = req.params;

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        plateNumber,
      },
    });

    if (!vehicle) return ServerResponse.error(res, "Vehicle not found");

    const vehiclePayments = prisma.payment.findMany({
      where: {
        session: {
          vehicleId: vehicle.id,
        },
      },
    });

    return ServerResponse.success(res, "All vehicle payments", {
      payments: vehiclePayments,
    });
  } catch (error) {
    return ServerResponse.error(res, "Internal server error 500");
  }
};

const getPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payment = await prisma.payment.findUnique({
      where: {
        id,
      },
    });
    if (!payment) return ServerResponse.error(res, "Payment not found");
    return ServerResponse.success(res, "Payment retrieved successfully", {
      payment,
    });
  } catch (error) {
    return ServerResponse.error(res, "Internal server error 500");
  }
};

const paymentController = {
  getAllPayments,
  getVehiclePayments,
  getPayment,
};

export default paymentController;
