import UserRepository from "@/data/repository/user.ts";
import axios, {type AxiosError, HttpStatusCode} from "axios";
import Cookies from "js-cookie";


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BACKEND,
    withCredentials: true,
})

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })
    failedQueue = []
}

axiosInstance.interceptors.response.use(
    (response) => {
        const access = Cookies.get('accessToken')
        if (access)
            response.headers['Authorization'] = 'Bearer ' + access//todo:: разобраться где хранить
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest: any = error.config

        if (
            error.response?.status === HttpStatusCode.Unauthorized &&
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject})
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    return axiosInstance(originalRequest)
                })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const {data} = await axiosInstance.post('/auth/refresh')
                const newAccessToken = data.accessToken

                Cookies.set('accessToken', newAccessToken, {expires: 1})
                processQueue(null, newAccessToken)

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return axiosInstance(originalRequest)
            } catch (err) {
                processQueue(err, null)
                Cookies.remove('accessToken')
                return Promise.reject(err)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

const userRepository = new UserRepository(axiosInstance)


export {
    userRepository,
    axiosInstance
}
