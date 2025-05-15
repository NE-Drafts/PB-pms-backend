import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator";
import { Role } from "../types/auth.types";

export class LoginDTO {
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/, {
        message: 'Password must have at least 6 characters, one symbol, one number, and one uppercase letter.',
    })
    readonly password: string;

}

export class RegisterDTO {
    
    @IsNotEmpty()
    @Matches(/^[a-zA-Z\s]{3,}$/, {
    message: 'Name must contain only letters and spaces, and be at least 3 characters long.',
  })
    names: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/^(?:\+2507|2507|07)\d{8}$/, {
    message: 'Phone must start with +2507, 2507, or 07 and be followed by exactly 8 digits.',
  })
    phone: string;

    @IsNotEmpty()
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/, {
        message: 'Password must have at least 6 characters, one symbol, one number, and one uppercase letter.',
    })
    password: string;

    @IsNotEmpty()
    role: Role;

}