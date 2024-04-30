import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';
import { LoginUserDTO, UpdateUserDTO, UserDTO } from 'src/utils/dto/user.dto';
import { toUserDTO, toUserEntity } from 'src/utils/mappers/user.mapper';
import { comparePassword, hashPassword } from 'src/utils/password.utils';
import { JwtService } from '@nestjs/jwt';
import { removeUndefined } from 'src/utils/mappers/generic.mapper';

@Injectable()
export class UserService {

    private userRepository: Repository<UserEntity>;
    private logger = new Logger(UserService.name)
    constructor(private readonly dataSource: DataSource) {
        this.userRepository = this.dataSource.getRepository(UserEntity)
    }

    async createUser(userDto: UserDTO): Promise<UserDTO> {
        try {
            const entity = toUserEntity(userDto)
            entity.password = hashPassword(entity.password)
            const user = this.userRepository.create(entity)
            const savedUser = await this.userRepository.save(user)
            return toUserDTO(savedUser)
        } catch (e) {
            if (e.errno === 1062) {
                this.logger.error(e.message, e.stack)
                throw new HttpException('Username/Email already exists', HttpStatus.CONFLICT)
            }
            this.logger.error(e.message, e.stack)
            throw new InternalServerErrorException('Something went wrong. Try again!')
        }
    }

    async findUserByUsernameOrEmail(usernameOrEmail: string): Promise<UserEntity> {

        const user = await this.userRepository.createQueryBuilder('user')
            .where('user.email = :email OR user.username = :username')
            .setParameters({ email: usernameOrEmail, username: usernameOrEmail })
            .getOne()

        if (!user) {
            throw new BadRequestException('User not found')
        }

        return user
    }

    async findUserById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id } })
        return user
    }

    async findAndUpdateUser(id: number, updateUserDto: UpdateUserDTO): Promise<UserDTO> {
        const savedUser = await this.findUserById(id)
        if (!savedUser) {
            throw new UnauthorizedException()
        }

        const props = removeUndefined(updateUserDto)
        await this.userRepository.update(id, { ...props })
        const user = await this.findUserById(id)
        return toUserDTO(user)
    }
}