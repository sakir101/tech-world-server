import { Model } from "mongoose";


export type IUserName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export type IUser = {
    name: IUserName
    img: string
    email: string
    password: string
}

export type UserModel = {
    isUserExist(
        id: string
    ): Promise<any>

    isPasswordMatched(
        givenPassword: string,
        savedPassword: string
    ): Promise<boolean>

} & Model<IUser>

export type IUsersFilters = {
    searchTerm?: string;
}
