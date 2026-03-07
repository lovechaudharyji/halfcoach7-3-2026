const User = require("../models/user-model");

const deleteUserById = async (req, res) => {
try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted"});
} catch (error) {
    
}

};

module.exports = deleteUserById ;