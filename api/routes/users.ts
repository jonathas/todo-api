import User from "../controllers/users";

export = (app) => {

    const endpoint = process.env.API_BASE + "users";

    /**
    * @api {post} /api/v1/users Create a user
    * @apiVersion 1.0.0
    * @apiName Create
    * @apiGroup User
    * @apiPermission authenticated user
    *
    * @apiParam (Request body) {String} name The name of the user
    * @apiParam (Request body) {String} username The username
    * @apiParam (Request body) {String} password The user password
    *
    * @apiExample {js} Example usage:
    * const data = {
    *   "name": "Jonathas",
    *   "username": "jon",
    *   "password": "mynicepass"
    * }
    *
    * $http.defaults.headers.common["Authorization"] = token;
    * $http.post(url, data)
    *   .success((res, status) => doSomethingHere())
    *   .error((err, status) => doSomethingHere());
    *
    * @apiSuccess (Success 201) {String} message User saved successfully!
    * @apiSuccess (Success 201) {String} id The user id
    *
    * @apiSuccessExample {json} Success response:
    *     HTTPS 201 OK
    *     {
    *      "message": "User saved successfully!",
    *      "id": "57e903941ca43a5f0805ba5a"
    *    }
    *
    * @apiUse UnauthorizedError
    */
    app.post(endpoint, User.create);

    /**
    * @api {delete} /api/v1/users/:id Delete a user
    * @apiVersion 1.0.0
    * @apiName Delete
    * @apiGroup User
    * @apiPermission authenticated user
    *
    * @apiParam {String} id The user id
    *
    * @apiExample {js} Example usage:
    * $http.defaults.headers.common["Authorization"] = token;
    * $http.delete(url)
    *   .success((res, status) => doSomethingHere())
    *   .error((err, status) => doSomethingHere());
    *
    * @apiSuccess {String} message User deleted successfully!
    *
    * @apiSuccessExample {json} Success response:
     *     HTTPS 200 OK
     *     {
     *      "message": "User deleted successfully!"
     *    }
     *
     * @apiUse UnauthorizedError
    */
    app.delete(endpoint + "/:id", User.delete);

    /**
    * @api {get} /api/v1/users/:id Retrieve a user
    * @apiVersion 1.0.0
    * @apiName GetOne
    * @apiGroup User
    * @apiPermission authenticated user
    *
    * @apiParam {String} id The user id
    *
    * @apiExample {js} Example usage:
    * $http.defaults.headers.common["Authorization"] = token;
    * $http.get(url)
    *   .success((res, status) => doSomethingHere())
    *   .error((err, status) => doSomethingHere());
    *
    * @apiSuccess {String} _id The user id
    * @apiSuccess {String} name The name of the user
    * @apiSuccess {String} username The username
    * @apiSuccess {String} password The password
    *
    * @apiSuccessExample {json} Success response:
     *     HTTPS 200 OK
     *     {
     *        "_id": "57e8e94ea06a0c473bac50cc",
     *        "name": "Jonathas",
     *        "username": "jon",
     *        "password": "mynicepass",
     *        "__v": 0
     *      }
     *
     * @apiUse UnauthorizedError
    */
    app.get(endpoint + "/:id", User.getOne);

    /**
    * @api {get} /api/v1/users Retrieve all users
    * @apiVersion 1.0.0
    * @apiName GetAll
    * @apiGroup User
    * @apiPermission authenticated user
    *
    * @apiExample {js} Example usage:
    * $http.defaults.headers.common["Authorization"] = token;
    * $http.get(url)
    *   .success((res, status) => doSomethingHere())
    *   .error((err, status) => doSomethingHere());
    *
    * @apiSuccess {String} _id The user id
    * @apiSuccess {String} name The name of the user
    * @apiSuccess {String} username The username
    * @apiSuccess {String} password The password
    *
    * @apiSuccessExample {json} Success response:
    *     HTTPS 200 OK
    *     [{
    *       "_id": "57e8e94ea06a0c473bac50cc",
    *       "name": "Jonathas",
    *       "username": "jon",
            "password": "mynicepass"
    *      },
    *      {
    *       "_id": "57e903941ca43a5f0805ba5a",
    *       "name": "Jon",
    *       "username": "jonathas",
    *       "password": "myverysecretpass"
    *     }]
    *
    * @apiUse UnauthorizedError
    */
    app.get(endpoint, User.getAll);

    /**
    * @api {put} /api/v1/users/:id Update a user
    * @apiVersion 1.0.0
    * @apiName Update
    * @apiGroup User
    * @apiPermission authenticated user
    *
    * @apiParam {String} id The user id
    *
    * @apiParam (Request body) {String} name The name of the user
    * @apiParam (Request body) {String} username The username
    * @apiParam (Request body) {String} password The user password
    *
    * @apiExample {js} Example usage:
    * const data = {
    *   "name": "Jon Ribeiro"
    * }
    *
    * $http.defaults.headers.common["Authorization"] = token;
    * $http.put(url, data)
    *   .success((res, status) => doSomethingHere())
    *   .error((err, status) => doSomethingHere());
    *
    * @apiSuccess {String} message User updated successfully!
    *
    * @apiSuccessExample {json} Success response:
     *     HTTPS 200 OK
     *     {
     *      "message": "User updated successfully!"
     *    }
     *
     * @apiUse UnauthorizedError
    */
    app.put(endpoint + "/:id", User.update);

};
