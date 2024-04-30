import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/utils/dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('/signup')
    async signUp(@Body() user: UserDTO) {
        return await this.userService.createUser(user)
    }

    @Post('/signin')
    async login(@Body() user: UserDTO) {

    }
}
