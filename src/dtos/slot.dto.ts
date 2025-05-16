import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateSlotDto {
  @IsString({ message: "Slot must be a string" })
  @IsNotEmpty({ message: "Slot number is required" })
  readonly slotNumber: string;
}
