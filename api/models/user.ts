import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

export interface IUser extends mongoose.Document {
    name: string;
    username: string;
    password: string;
    admin: boolean;
    comparePassword(candidatePassword: string): Boolean;
};

export const schema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: Boolean
}, {timestamps: { createdAt: "created_at", updatedAt: "updated_at" }});

schema.pre("save", function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

schema.pre("update", function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

schema.methods.comparePassword = function(candidatePassword: string): Boolean {
    return bcrypt.compareSync(candidatePassword, this.password);
};

export const model = mongoose.model<IUser>("User", schema);

export const cleanCollection = (callback) => model.remove({}, callback);

export default model;
