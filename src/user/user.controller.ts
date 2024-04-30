import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDTO, UserDTO } from 'src/utils/dto/user.dto';
import { toUserDTO } from 'src/utils/mappers/user.mapper';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.findUserById(id)
        return toUserDTO(user)
    }

    @Put('update')
    async updateUser(@Body() user: UserDTO): Promise<UserDTO> {

    }

    @Get('profile')
    async profile(@Req() request: Request): Promise<UserDTO> {
        const payload
    }
}
