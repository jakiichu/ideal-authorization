import type {IUserDtoEntities} from "@/domain/user/interface/entities.ts";

interface ILoginDto extends IUserDtoEntities {
    accessToken: string
}

type IGetAllUserDto = IUserDtoEntities

export type {
    ILoginDto,
    IGetAllUserDto
}
