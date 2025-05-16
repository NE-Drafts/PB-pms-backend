import { VehicleType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString, IsUUID, Matches } from "class-validator";

export class CreateVehicleDto {

    @IsNotEmpty()
    @IsString()
    readonly plateNumber: string;

    @IsNotEmpty()
    @IsString()
    readonly model: string;

    @IsNotEmpty()
    @IsEnum(VehicleType)
    readonly vehicleType: VehicleType;

    @IsNotEmpty()
    @IsUUID()
    readonly userId: string;
}

export class UpdateVehicleDto {

    @IsNotEmpty()
    @IsString()
    readonly model: string;

    @IsNotEmpty()
    @IsString()
    readonly plateNumber: string;
}