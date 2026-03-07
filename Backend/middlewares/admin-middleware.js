const adminMiddleware = async (req, res, next) => {
try {
    console.log(req.user);
   // res.status(200).json({ msg: req.user.isAdmin });
   const adminRole = req.user.isAdmin;
   if (!adminRole) {
    return res
    .status(403)
    .json({ message: "Access denied"});
   }

   next();
} catch (error) {
    next(error);
}
};

module.exports = adminMiddleware;