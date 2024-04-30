import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';
import { UserDTO } from 'src/utils/dto/user.dto';
import { toUserDTO, toUserEntity } from 'src/utils/mappers/user.mapper';

@Injectable()
export class UserService {

    private userRepository: Repository<UserEntity>;
    private logger = new Logger(UserService.name)
    constructor(private readonly dataSource: DataSource) {
        this.userRepository = this.dataSource.getRepository(UserEntity)
    }

    async createUser(userDto: UserDTO): Promise<UserDTO> {
        try {
            const user = await this.userRepository.create(toUserEntity(userDto))
            const savedUser = await this.userRepository.save(user)
            return toUserDTO(savedUser)
        } catch (e) {
            if (e.code == 23505) {
                this.logger.error(e.message, e.stack)
                throw new HttpException('Username already exists', HttpStatus.CONFLICT)
            }
            this.logger.error(e.message, e.stack)
            throw new InternalServerErrorException('Something went wrong. Try again!')
        }
    }

    async loginUser(userDto: UserDTO): Promise<UserDTO> {

    }
}
