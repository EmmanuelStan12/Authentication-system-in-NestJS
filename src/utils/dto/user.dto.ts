import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator"

export class LoginUserDTO {
    @IsNotEmpty({ message: 'Email/Username is required' })
    usernameOrEmail: string;

    @IsNotEmpty({ message: 'Password must not be empty' })
    password: string;
}

export class UpdateUserDTO {
    @MinLength(3, { message: 'First name must be at least 3 characters long' })
    @MaxLength(100, { message: 'First name cannot exceed 100 characters' })
    firstname: string;

    @MinLength(3, { message: 'Last name must be at least 3 characters long' })
    @MaxLength(100, { message: 'Last name cannot exceed 100 characters' })
    lastname: string;

    @MinLength(3, { message: 'Username must be at least 3 characters long' })
    @MaxLength(100, { message: 'Username cannot exceed 100 characters' })
    username: string;
}

export class UserDTO {
    @IsNotEmpty({ message: 'First name is required' })
    @MinLength(3, { message: 'First name must be at least 3 characters long' })
    @MaxLength(100, { message: 'First name cannot exceed 100 characters' })
    firstname: string;

    @IsNotEmpty({ message: 'Last name is required' })
    @MinLength(3, { message: 'Last name must be at least 3 characters long' })
    @MaxLength(100, { message: 'Last name cannot exceed 100 characters' })
    lastname: string;

    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsNotEmpty({ message: 'Username is required' })
    @MinLength(3, { message: 'Username must be at least 3 characters long' })
    @MaxLength(100, { message: 'Username cannot exceed 100 characters' })
    username: string;

    id?: number; // Make id optional

    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(100, { message: 'Password cannot exceed 100 characters' })
    @IsNotEmpty({ message: 'Password is required' })
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password must contain at least one digit or special character, one uppercase letter, one lowercase letter' }
    )
    password: string;

    constructor(firstname: string, lastname: string, email: string, username: string, password: string, id?: number) {
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.username = username
        this.id = id
        this.password = password
    }

}
