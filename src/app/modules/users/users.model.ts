import { Schema, Types, model } from "mongoose";
import { IUser, UserModel } from "./users.interface";
import bcrypt from 'bcrypt';
import config from "../../../config";

const userSchema = new Schema<IUser>(
    {
        name: {
            type: {
                firstName: {
                    type: String,
                    required: true,
                },
                middleName: {
                    type: String
                },
                lastName: {
                    type: String,
                    required: true,
                }

            }
        },
        img: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
)

userSchema.statics.isUserExist = async function (
    id: string
): Promise<any> {
    const objectId = new Types.ObjectId(id);
    return await User.findById(objectId, {
        _id: 1,
        name: 1,
        img: 1,
        email: 1,
        password: 1,
    });

}

userSchema.statics.isPasswordMatched = async function (
    givenPassword: string,
    savedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
}


userSchema.pre('save', async function (next) {
    const user = this
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bycrypt_salt_rounds)
    )
    next()
})


export const User = model<IUser, UserModel>('User', userSchema)