process.env.NODE_ENV = "test";

import "mocha";
import { model as User } from "../models/user";
import * as Task from "../models/task";

const express = require("../config/express")();

export const request = require("supertest")(express);

export const chai = require("chai");
export const should = chai.should();

const testUser = { "username": "testuser", "password": "mytestpass" };

const createUser = async (): Promise<any> => {
    const UserModel = new User(testUser);
    await UserModel.save();
};

const getUser = async (): Promise<any> => {
    let users = await User.find({});
    if (users === null || users.length === 0 || users === undefined) {
        await createUser();
        return await getUser();
    } else {
        return new Promise((resolve, reject) => resolve(users[0]));
    }
};

export const login = async (): Promise<any> => {
    let user = await getUser();
    return request.post("login")
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
