const Coach = require("../models/coach-model");

const deleteCoachById = async (req, res) => {
try {
    const id = req.params.id;
    await Coach.deleteOne({ _id: id });
    return res.status(200).json({ message: "Coach Deleted"});
} catch (error) {
    
}

};

module.exports = deleteCoachById ;