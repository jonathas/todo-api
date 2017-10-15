import Task from "../controllers/tasks";

export = (app) => {

    const endpoint = process.env.API_BASE + "tasks";

    /**
    * @api {post} /api/v1/tasks Create a task
    * @apiVersion 1.0.0
    * @apiName Create
    * @apiGroup Task
    * @apiPermission authenticated user
    *
    * @apiParam (Request body) {String} name The task name
    *
    * @apiExample {js} Example usage:
    * const data = {
    *   "name": "Do the dishes"
    * }
    *
    * $http.defaults.headers.common["Authorization"] = token;
    * $http.post(url, data)
    *   .success((res, status) => doSomethingHere())
    *   .error((err, status) => doSomethingHere());
    *
    * @apiSuccess (Success 201) {String} message Task saved successfully!
    * @apiSuccess (Success 201) {String} id The task id
    *
    * @apiSuccessExample {json} Success response:
    *     HTTPS 201 OK
    *     {
    *      "message": "Task saved successfully!",
    *      "id": "57e903941ca43a5f0805ba5a"
    *    }
    *
    * @apiUse UnauthorizedError
    */
    app.post(endpoint, Task.create);

    /**
    * @api {delete} /api/v1/tasks/:id Delete a task
    * @apiVersion 1.0.0
    * @apiName Delete
    * @apiGroup Task
    * @apiPermission authenticated user
    *
    * @apiParam {String} id The task id
    *
    * @apiExample {js} Example usage:
    * $http.defaults.headers.common["Authorization"] = token;
    * $http.delete(url)
    *   .success((res, status) => doSomethingHere())
    *   .error((err, status) => doSomethingHere());
    *
    * @apiSuccess {String} message Task deleted successfully!
    *
    * @apiSuccessExample {json} Success response:
     *     HTTPS 200 OK
     *     {
     *      "message": "Task deleted successfully!"
     *    }
     *
     * @apiUse UnauthorizedError
    */
    app.delete(endpoint + "/:id", Task.delete);

    /**
    * @api {get} /api/v1/tasks/:id Retrieve a task
    * @apiVersion 1.0.0
    * @apiName GetOne
    * @apiGroup Task
    * @apiPermission authenticated user
    *
    * @apiParam {String} id The task id
    *
    * @apiExample {js} Example usage:
    * $http.defaults.headers.common["Authorization"] = token;
    * $http.get(url)
    *   .success((res, status) => doSomethingHere())
    *   .error((err, status) => doSomethingHere());
    *
    * @apiSuccess {String} _id The task id
    * @apiSuccess {String} name The task name
    *
    * @apiSuccessExample {json} Success response:
     *     HTTPS 200 OK
     *     {
     *        "_id": "57e8e94ea06a0c473bac50cc",
     *        "name": "Do the disehs",
     *        "__v": 0
     *      }
     *
     * @apiUse UnauthorizedError
    */
    app.get(endpoint + "/:id", Task.getOne);

    /**
    * @api {get} /api/v1/tasks Retrieve all tasks
    * @apiVersion 1.0.0
    * @apiName GetAll
    * @apiGroup Task
    * @apiPermission authenticated user
    *
    * @apiExample {js} Example usage:
    * $http.defaults.headers.common["Authorization"] = token;
    * $http.get(url)
    *   .success((res, status) => doSomethingHere())
    *   .error((err, status) => doSomethingHere());
    *
    * @apiSuccess {String} _id The task id
    * @apiSuccess {String} name The task name
    *
    * @apiSuccessExample {json} Success response:
    *     HTTPS 200 OK
    *     [{
    *       "_id": "57e8e94ea06a0c473bac50cc",
    *       "name": "Do the disehs"
    *      },
    *      {
    *       "_id": "57e903941ca43a5f0805ba5a",
    *       "name": "Take out the trash"
    *     }]
    *
    * @apiUse UnauthorizedError
    */
    app.get(endpoint, Task.getAll);

    /**
    * @api {put} /api/v1/tasks/:id Update a task
    * @apiVersion 1.0.0
    * @apiName Update
    * @apiGroup Task
    * @apiPermission authenticated user
    *
    * @apiParam {String} id The task id
    *
    * @apiParam (Request body) {String} name The task name
    *
    * @apiExample {js} Example usage:
    * const data = {
    *   "name": "Run in the park"
    * }
    *
    * $http.defaults.headers.common["Authorization"] = token;
    * $http.put(url, data)
    *   .success((res, status) => doSomethingHere())
    *   .error((err, status) => doSomethingHere());
    *
    * @apiSuccess {String} message Task updated successfully!
    *
    * @apiSuccessExample {json} Success response:
     *     HTTPS 200 OK
     *     {
     *      "message": "Task updated successfully!"
     *    }
     *
     * @apiUse UnauthorizedError
    */
    app.put(endpoint + "/:id", Task.update);

};
