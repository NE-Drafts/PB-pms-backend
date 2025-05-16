import { Request, Response } from "express";
import ServerResponse from "../helpers/serverResponse";
import prisma from "../prisma/prisma-client";

const createParkingSession = async (req: Request, res: Response) => {
  try {
    const { vehiclePlateNumber } = req.body;

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        plateNumber: vehiclePlateNumber,
      },
    });
    if (!vehicle) return ServerResponse.error(res, "Vehicle not found");
    const existingVehicleSession = await prisma.payment.findFirst({
      where: {
        AND: [
          { status: "PENDING" },
          {
            session: {
              vehicleId: vehicle.id,
            },
          },
        ],
      },
    });
    if (existingVehicleSession)
      return ServerResponse.error(res, "This vehicle has an unpaid session");
    const slot = await prisma.parkingSlot.findFirst({
      where: {
        slotStatus: "AVAILABLE",
      },
    });
    if (!slot) return ServerResponse.error(res, "No available parking slots");
    if (slot.slotStatus === "OCCUPIED")
      return ServerResponse.error(res, "Parking slot is already occupied");

    const parkingSession = await prisma.parkingSession.create({
      data: {
        vehicleId: vehicle.id,
        slotId: slot.id,
        entryTime: new Date(),
      },
    });

    await prisma.payment.create({
      data: {
        sessionId: parkingSession.id,
      },
    });

    await prisma.parkingSlot.update({
      where: {
        id: slot.id,
      },
      data: {
        slotStatus: "OCCUPIED",
        vehicleId: vehicle.id,
      },
    });

    return ServerResponse.created(res, "Parking session created successfully", {
      parkingSession,
    });
  } catch (error) {
    return ServerResponse.error(res, "Internal server error 500");
  }
};

const getParkingSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parkingSession = await prisma.parkingSession.findUnique({
      where: { id },
    });
    if (!parkingSession)
      return ServerResponse.error(res, "Parking session not found");
    return ServerResponse.success(
      res,
      "Parking session retrieved successfully",
      { parkingSession }
    );
  } catch (error) {
    return ServerResponse.error(res, "Internal server error 500");
  }
};

const getVehicleParkingSessions = async (req: Request, res: Response) => {
  try {
    const { plateNumber } = req.params;
    const vehicle = await prisma.vehicle.findUnique({
      where: { plateNumber },
    });
    if (!vehicle) return ServerResponse.error(res, "Vehicle not found");
    const parkingSessions = await prisma.parkingSession.findMany({
      where: { vehicleId: vehicle.id },
    });
    return ServerResponse.success(res, "All vehicle parking sessions", {
      parkingSessions,
    });
  } catch (error) {
    return ServerResponse.error(res, "Internal server error 500");
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const parkingSessions = await prisma.parkingSession.findMany();
    return ServerResponse.success(res, "All parking sessions", {
      parkingSessions,
    });
  } catch (error) {
    return ServerResponse.error(res, "Internal server error 500");
  }
};

const exitParkingSession = async (req: Request, res: Response) => {
    try {
        const {plateNumber} = req.body
        const vehicle = await prisma.vehicle.findUnique({
            where: {
                plateNumber
            }
        })

        if(!vehicle) return ServerResponse.error(res, "Vehicle not found")

        const parkingSession = await prisma.parkingSession.findFirst({
            where: {
                AND: [
                    {vehicleId: vehicle.id},
                    {status: "ACTIVE"}
                ]
            }
        })

        if(!parkingSession) return ServerResponse.error(res, "This vehicle is not in a parking session");

        const exitTime = new Date()
        const hoursSpent = Math.ceil((exitTime.getTime() - parkingSession.entryTime.getTime()) / (1000 * 60 * 60))
        const amount = BigInt(hoursSpent * parseInt((process.env.PARKING_HOURLY_PAY_RATE ?? "5000") as string))

        await prisma.payment.update({
            where: {
                sessionId: parkingSession.id
            },
            data: {
                amount: amount,
                status: "COMPLETED",

            }
        })

        await prisma.parkingSlot.update({
            where: {
                id: parkingSession.slotId
            },
            data: {
                slotStatus: "AVAILABLE",
                vehicleId: null
            }
        })

        const updatedParkingSession = await prisma.parkingSession.update({
            where: {
                id: parkingSession.id
            },
            data: {
                status: "COMPLETED",
                exitTime
            }
        })

        return ServerResponse.success(res, "Parking session exited successfully", {updatedParkingSession})
    } catch (error) {
        return ServerResponse.error(res, "Internal server error 500")
    }
};

const parkingSessionController = {
    createParkingSession,
    getAll,
    getParkingSession,
    getVehicleParkingSessions,
    exitParkingSession
}

export default parkingSessionController;