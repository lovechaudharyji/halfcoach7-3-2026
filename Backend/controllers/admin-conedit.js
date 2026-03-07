const User = require("../models/user-model");

const getUserByID = async (req, res) => {
try {
    const id = req.params.id;
  const data =  await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
} catch (error) {
    
}

};

module.exports = getUserByID ;