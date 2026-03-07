const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDirectory = "./uploads/";

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedType = /jpeg|jpg|png/;
  const extname = allowedType.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedType.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Only JPG, JPEG, and PNG files are allowed!"), false);
  }
};

const fileSizeLimit = 2 * 1024 * 1024; // 5MB limit

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: fileSizeLimit,
  },
}); // Assuming the field name is profilePicture

module.exports = upload;
