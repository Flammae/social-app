const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");

const multerOptions = {
  dest: path.join(process.cwd(), "temp_uploads"),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed!" }, false);
    }
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

exports.readFile = multer(multerOptions);

exports.upload = (req, res, next) => {
  if (!req.file) return next();
  console.log(req.file);
  // return res.json({ working: "maybe" });
  cloudinary.uploader.upload(req.file.path).then(image => {
    req.body.image = image.url;
    fs.unlink(req.file.path, err => {
      if (err) return next(err);
      next();
    });
  });
};
