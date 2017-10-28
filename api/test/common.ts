process.env.NODE_ENV = "test";

import "mocha";
import { IUser, model as User } from "../models/user";
import * as Task from "../models/task";

const express = require("../config/express")();

export const request = require("supertest")(express);

export const chai = require("chai");
export const should = chai.should();

const testUser = { "username": "testuser", "password": "mytestpass" };

const createUser = async (): Promise<void> => {
    const UserModel = new User(testUser);
    await UserModel.save();
};

const getUser = async (): Promise<IUser> => {
    let users = await User.find({});
    if (users.length === 0) {
        await createUser();
        return await getUser();
    } else {
        return users[0];
    }
};

export const login = async (): Promise<any> => {
    let user = await getUser();
    return request.post(process.env.API_BASE + "login")
        .send({ "username": user.username, "password": testUser.password })
        .expect(200);
};

export const cleanCollections = (): Promise<any> => {
    const cleanUp = [
        Task.cleanCollection()
        // Add more
    ];
    return Promise.all(cleanUp);
};

