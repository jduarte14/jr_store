const User = require('../models/Users');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const { name, email, password, permission } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Missing data",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            permission: permission
        });

        await user.save();

        if (!permission) {
            return res.status(200).json({
                status: "success",
                message: "User created successfully",
                user: user,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Administrator created successfully",
            administrator_user: user,
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};


const editUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, permission } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const updateUser = await User.findByIdAndUpdate({ _id: id }, { name, email, password: hashedPassword, permission });

        if (!updateUser) {
            return res.status(400).json({
                response: "error",
                error: "Need to send all data",
            });
        }
        return res.status(200).json({
            response: "success",
            message: "User updated successfully",
            user_updated: updateUser,
        })
    }
    catch (error) {
        return res.status(500).json({
            response: "error",
            error: error.message,
        });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(400).json({
                response: "error",
                error: "No users found",
            });
        }
        return res.status(200).json({
            response: "success",
            users: users,
        });
    } catch (error) {
        return res.status(500).json({
            response: "error",
            error: error.message,
        });
    }
}

const getSingleUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, permission } = req.body;
        const foundUser = await User.findById({ _id: id }, { name, email, password, permission });
        if (!foundUser) {
            return res.status(400).json({
                response: "error",
                message: "User not found"
            })
        }
        return res.status(200).json({
            response: "success",
            user_found: foundUser,
        })
    }
    catch (error) {
        return res.status(500).json({
            response: "error",
            error: error.message,
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, permission } = req.body;
        const deletedUser = await User.findByIdAndDelete({ _id: id }, { name, email, password, permission });
        if (!deletedUser) {
            return res.status(400).json({
                response: "error",
                message: "User not found"
            });
        }
        return res.status(200).json({
            response: "success",
            message: "User deleted successfully",
            user_deleted: deletedUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            response: "error",
            error: error.message
        });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                response: "error",
                message: "Invalid email or password"
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                response: "error",
                message: "Invalid email or password"
            });
        }
        return res.status(200).json({
            response: "success",
            message:"Login successful"
        })
    }
    catch (error) {
        return res.status(500).json({
            response: "error",
            error: error.message,
        })
    }
}

module.exports = {
    createUser,
    getUsers,
    editUser,
    getSingleUser,
    deleteUser,
    loginUser
};
