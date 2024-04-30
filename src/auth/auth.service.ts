import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginUserDTO, UserDTO } from 'src/utils/dto/user.dto';
import { comparePassword } from 'src/utils/password.utils';

@Injectable()
export class AuthService {

    private logger = new Logger(UserService.name)
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async register(createUserDto: UserDTO): Promise<Record<string, any>> {
        return await this.userService.createUser(createUserDto)
    }

    async signIn(userDto: LoginUserDTO): Promise<Record<string, any>> {
        const { email, password } = userDto
        try {

            const user = await this.userService.findUserByUsernameOrEmail(email)
            const isPasswordValid = comparePassword(password, user.password)

            if (!isPasswordValid) {
                throw new UnauthorizedException('Email/Password is invalid')
            }

            const payload = { sub: user.id, username: user.username }
            const accessToken = await this.jwtService.signAsync(payload)

            const result = { ...user }
            delete result['password']
            result['accessToken'] = accessToken
            return result
        } catch (e) {
            this.logger.error(e.message, e.stack)
            if (e instanceof UnauthorizedException) {
                throw e
            }
            throw new InternalServerErrorException('Something went wrong. Try again!')
        }
    }

}
