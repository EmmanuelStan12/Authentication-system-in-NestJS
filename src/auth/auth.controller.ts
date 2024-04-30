import { Controller, Post } from '@nestjs/common';
import { LoginUserDTO, UserDTO } from 'src/utils/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/login')
    async login(loginUserDto: LoginUserDTO) {
        return this.authService.signIn(loginUserDto)
    }

    @Post('/register')
    async register(createUserDto: UserDTO) {
        return this.authService.register(createUserDto)
    }
}
