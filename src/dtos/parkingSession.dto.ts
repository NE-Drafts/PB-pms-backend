import { IsNotEmpty, IsString } from "class-validator";

export class CreateParkingSession {

    @IsNotEmpty()
    @IsString()
    readonly vehiclePlateNumber: string;

    @IsNotEmpty()
    @IsString()
    readonly slotNumber: string;
}