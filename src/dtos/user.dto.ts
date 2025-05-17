import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z\s]{3,}$/, {
    message:
      "Name must contain only letters and spaces, and be at least 3 characters long.",
  })
  names: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?:\+2507|2507|07)\d{8}$/, {
    message:
      "Phone must start with +2507, 2507, or 07 and be followed by exactly 8 digits.",
  })
  phone: string;
}
