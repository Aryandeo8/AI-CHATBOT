import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Document } from "mongoose";



export interface IUser extends Document {
    _id: string;
    email: string;
    password: string;
    refreshToken?: string;
  
    // Instance methods
    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
},
{
    timestamps: true
}    
)
userSchema.pre<IUser>("save", async function (next) {
    if(!this.isModified("password")) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
      } catch (error) {
        next(error as Error);
      }
})

userSchema.methods.isPasswordCorrect = async function(password:string) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function():string{
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string
        }
    )
}
userSchema.methods.generateRefreshToken = function(): string{
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET as string,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string
        }
    )
}

export const User = mongoose.model<IUser>("User", userSchema)