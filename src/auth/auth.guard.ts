import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "src/utils/annotations.utils";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if (isPublic) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenHeader(request)

        if (!token) {
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: '' })
            request['payload'] = payload
        } catch (e) {
            throw new UnauthorizedException()
        }
        return true
    }

    extractTokenHeader(request: Request): string | undefined {
        const [type, token] = request.headers.get('authorization')?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined;
    }
}