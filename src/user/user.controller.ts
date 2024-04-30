import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDTO, UserDTO } from 'src/utils/dto/user.dto';
import { toUserDTO } from 'src/utils/mappers/user.mapper';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Get('profile')
    async profile(@Req() request: Request): Promise<UserDTO> {
        const authPayload: Record<string, any> = request['payload']
        const user = await this.userService.findUserByUsernameOrEmail(authPayload.username)
        return toUserDTO(user)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.findUserById(id)
        return toUserDTO(user)
    }

    @Put('update')
    async updateUser(@Body() updateUserDto: UserDTO, @Req() request: Request): Promise<UserDTO> {
        const authPayload: Record<string, any> = request['payload']
        const id = authPayload.id
        return this.userService.findAndUpdateUser(id, updateUserDto)
    }


}
