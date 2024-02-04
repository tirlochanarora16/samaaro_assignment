import TasksModel from "../db/task.model.js";

export const getAllTasks = async (req, res) => {
  try {
    const filterKeys = Object.keys(req.query);
    const filterValues = Object.values(req.query).filter(
      (value) => value.trim().length > 0
    );
    // ensuring none of the filters, if present, has empty value
    if (filterKeys.length !== filterValues.length) {
      return res
        .status(400)
        .json({ msg: "please provide values for all the filters" });
    }

    const tasks = await TasksModel.find({ ...req.query }).sort({
      createdAt: "desc",
    });
    return res.status(200).json({ tasks });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const createNewTask = async (req, res) => {
  try {
    const { author, title } = req.body;

    // if required fields are not present, then sending an error
    if (!author || !title) {
      return res.status(400).json({ msg: "required missing fields" });
    }

    // creating, saving and sending back a new task
    const newTask = await TasksModel.create({
      ...req.body,
    });

    await newTask.save();

    return res.status(201).json(newTask);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const updateTask = async (req, res) => {
  try {
    // finding a task by id and updating the necessary fields for that document
    const updateTask = await TasksModel.findByIdAndUpdate(req.query._id, {
      ...req.body,
    });

    await updateTask.save();

    return res.status(200).json({ msg: "resource updated successfully!" });
  } catch (err) {
    if (err.message.includes("Cannot read properties of null")) {
      return res
        .status(404)
        .json({ msg: "Invalid id. Check the key or value" });
    }
    console.log(err);
    res.status(500).json(err);
  }
};

export const deleteTask = async (req, res) => {
  try {
    // deleting a task by id
    await TasksModel.findByIdAndDelete(req.query._id);

    return res.status(200).json({ status: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
