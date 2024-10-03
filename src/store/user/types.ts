import { ThunkCallbacks } from "@/src/shared/createThunkWithCallbacks";
import { AxiosResponse } from "axios";

export interface UserState {
    data: User
    loading: boolean,
    loginError: string,
    signupError: string,
    emailConfirmation: boolean;
}
export interface User {
  id: string,
  username: string,
  password: string,
  email: string,
  isActivated: boolean,
  role: string,
  donateCurrency: number,
  gameCurrency: number
}
export interface UserResponse{
  user: User,
  accessToken: string
}

export interface LoginArgs extends ThunkCallbacks<any> {
    username: string;
    password: string;
  }
  export interface RegistrationArgs extends ThunkCallbacks<any> {
    username: string;
    password: string;
    email: string;
  }
