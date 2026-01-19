interface IStoreOption {
    onSuccess?: () => Promise<void>
    onError?: () => Promise<void>
}

export type {
    IStoreOption
}
