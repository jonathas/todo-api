import Task from "../models/task";

class Tasks {

    public getAll = async (req, res) => {
        try {
            const tasks = await Task.find({}).exec();
            res.status(200).json(tasks);
        } catch (err) {
            /* istanbul ignore next */
            res.status(400).json(err);
        }
    }

    public getOne = async (req, res) => {
        try {
            let task = await Task.findById(req.params.id).exec();

            if (task === null) {
                return res.status(404).json({ message: "This task doesn't exist" });
            }

            res.status(200).json(task);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    public create = async (req, res) => {
        try {
            this.validateRequest(req);

            let Data = new Task(req.body);
            await Data.save();

            res.status(201).json({ "message": "Task saved successfully!", "id": Data._id });
        } catch (err) {
            res.status(400).json({ "message": "Missing parameters", errors: err });
        }
    }

    public update = async (req, res) => {
        try {
            this.validateRequest(req);

            await Task.findByIdAndUpdate(req.params.id, req.body);

            res.status(200).json({ "message": "Task updated successfully!" });
        } catch (err) {
            res.status(400).json({ "message": "Missing parameters", errors: err });
        }
    }

    private validateRequest = (req) => {
        req.checkBody("name", "The name cannot be empty").notEmpty();
        req.body.user = req.app.get("user")._id;

        let errors = req.validationErrors();
        if (errors) throw errors;
    }

    public delete = async (req, res) => {
        try {
            await Task.findByIdAndRemove(req.params.id);
            res.status(200).json({ "message": "Task deleted successfully!" });
        } catch (err) {
            res.status(400).json({ "message": `Error delete task: ${err}` });
        }
    }

}

export default new Tasks();