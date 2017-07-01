import { IUser } from "./user";
import * as mongoose from "mongoose";

export interface ITask extends mongoose.Document {
    name: {
        type: string,
        require: true
    },
    scheduled_date: Date,
    user: IUser
};

export const schema = new mongoose.Schema({
        name: {
        type: String,
        require: true
    },
    scheduled_date: {
        type: Date,
        default: new Date()
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

export const model = mongoose.model<ITask>("Task", schema);

export const cleanCollection = (): Promise<any> => model.remove({}).exec();

export default model;