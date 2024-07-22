

var multer  = require('multer')
var  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const fileExtension = file.originalname.split('.').pop();
        const init=file.originalname.split('.')[0]  // Get the file extension
        const timestamp = Date.now(); // Get the current timestamp
        
        const filename = `${init}${timestamp}.${fileExtension}`;
        
   req.filename=filename
   // console.log(filename)
      cb(null, filename)
    }
})
var upload = multer({ storage: storage })
module.exports={upload}
