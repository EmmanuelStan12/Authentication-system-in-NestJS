import { CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";

export class AppGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()

        const allowedMethods = ['POST', 'PUT', 'PATCH'];

        console.log(request.method)
        if (allowedMethods.includes(request.method) && (request.body === undefined || Object.keys(request.body).length === 0)) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        return true;
    }

}