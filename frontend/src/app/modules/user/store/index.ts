import {defineStore} from "pinia";
import {userRepository} from "@/data/repository/singleton.ts";
import type {IUserForm} from "@/domain/user/interface/form.ts";
import Cookies from "js-cookie";
import type {IStoreOption} from "@/app/modules/user/store/interface.ts";
import {isAxiosError} from "axios";
import type {IUserDtoEntities} from "@/domain/user/interface/entities.ts";

const cacheUserInitialData = {email: '', password: ''} as IUserForm


const useAuthStore = defineStore('auth', {
        state: () => ({
            userData: null as null | IUserDtoEntities,
            cacheUserData: cacheUserInitialData,
            loading: false,
            error: null as string | null
        }),

        actions: {
            async login(port: IUserForm, {onSuccess}: IStoreOption) {
                this.loading = true
                this.error = null
                try {
                    const {accessToken, ...userData} = await userRepository.login(port)
                    this.cacheUserData = cacheUserInitialData
                    this.userData = userData
                    Cookies.set('accessToken', accessToken, {expires: 1, path: '/'})

                    onSuccess?.()
                } catch (err: unknown) {
                    if (isAxiosError(err)) {
                        this.error = err.response?.data?.message ?? err.message
                    } else if (err instanceof Error) {
                        this.error = err.message
                    } else {
                        this.error = 'Неизвестная ошибка'
                    }
                } finally {
                    this.loading = false
                }
            },
            async registration(port: IUserForm, {onSuccess}: IStoreOption) {
                this.loading = true
                this.error = null
                try {
                    await userRepository.registration(port)
                    this.cacheUserData = port as IUserForm
                    onSuccess?.()
                } catch (err: unknown) {
                    if (isAxiosError(err)) {
                        this.error = err.response?.data?.message ?? err.message
                    } else if (err instanceof Error) {
                        this.error = err.message
                    } else {
                        this.error = 'Неизвестная ошибка'
                    }
                } finally {
                    this.loading = false
                }
            },
            async getMe() {

                this.loading = true
                this.error = null
                try {
                    const data = await userRepository.getMe()
                    this.userData = data
                    // onSuccess?.()
                } catch (err: unknown) {
                    if (isAxiosError(err)) {
                        this.error = err.response?.data?.message ?? err.message
                    } else if (err instanceof Error) {
                        this.error = err.message
                    } else {
                        this.error = 'Неизвестная ошибка'
                    }
                } finally {
                    this.loading = false
                }
            }
        }
    }
)

export {
    useAuthStore,
}
