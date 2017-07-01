import { ITask, model as Task } from "../models/task";

class Tasks {

    public getAll = async (req, res) => {
        try {
            const tasks = await Task.find({}).exec();
            res.status(200).json(tasks);
        } catch (err) {
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

    public create = (req, res) => {
        try {
            
        } catch (err) {
            res.status(err.status).json({ message: err.message, errors: err.errors });
        }
    }

    public update = (req, res) => {
        try {
            
        } catch (err) {
            res.status(err.status).json({ message: err.message, errors: err.errors });
        }
    }

    private validateRequest = (req) => {
        req.checkBody("name", "The name cannot be empty").notEmpty();

        let errors = req.validationErrors();
        if (errors) throw { status: 400, message: "Missing parameters", errors: errors };
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