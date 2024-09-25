export interface User{
    id: string,
    username: string,
    password: string,
    email: string,
    twoFA: boolean
}

export interface UserState{
    data: User
}