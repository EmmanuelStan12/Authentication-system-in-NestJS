import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDTO, UserDTO } from 'src/utils/dto/user.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/utils/annotations.utils';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Public()
    @Post('/login')
    async login(@Body() loginUserDto: LoginUserDTO) {
        return this.authService.signIn(loginUserDto)
    }

    @Public()
    @Post('/register')
    async register(@Body() createUserDto: UserDTO) {
        return this.authService.register(createUserDto)
    }
}
