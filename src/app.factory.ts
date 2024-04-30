import { HttpException, HttpStatus } from "@nestjs/common";
import { ValidationError } from "class-validator";

export function validationExceptionFactory(errors: ValidationError[]): any {
    const messages = errors.map((error) => {
        // Access the validation constraint message
        return Object.values(error.constraints)[0];
    });
    return new HttpException(messages, HttpStatus.BAD_REQUEST);
}