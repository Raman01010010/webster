const multer = require('multer');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set your desired destination path
  },
  filename: function (req, file, cb) {
    // Use Date.now() to make sure that the filename is unique
    cb(null, 'profileImage-' + Date.now() + '.' + file.originalname.split('.').pop());
    },
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;
