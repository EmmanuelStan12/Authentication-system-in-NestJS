import { UserEntity } from "src/user/models/user.entity";
import { UserDTO } from "../dto/user.dto";

export function toUserEntity(userDto: UserDTO): UserEntity {
    const { email, firstname, lastname, username, password, id } = userDto;
    return new UserEntity(firstname, lastname, email, username, password, id)
}

export function toUserDTO(userEntity: UserEntity): UserDTO {
    delete userEntity['password']
    return { ...userEntity }
}