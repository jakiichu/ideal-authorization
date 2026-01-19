import {type AxiosInstance} from "axios";
import type {IUserPort} from "@/domain/user/interface/port.ts";
import type {IGetAllUserDto, ILoginDto} from "@/domain/user/interface/dto.ts";

class UserRepository {
    private interceptor: AxiosInstance
    readonly prefix: string

    constructor(interceptor: AxiosInstance) {
        this.interceptor = interceptor
        this.prefix = '/auth'
    }

    async login(port: IUserPort): Promise<ILoginDto> {
        return this.interceptor.post(`${this.prefix}/login`, port).then(res => res.data)
    }

    async registration(port: IUserPort) {
        return this.interceptor.post(`${this.prefix}/register`, port).then(res => res.data)
    }

    async getMe(): Promise<IGetAllUserDto> {
        return this.interceptor.get(`${this.prefix}/me`).then(res => res.data)
    }

}

export default UserRepository;
