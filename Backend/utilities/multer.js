const multer = require("multer")
const path = require("path")    
const { v4: uuidv4 } = require("uuid")

const storage = multer.diskStorage({    
  destination: (req, file, cb) => {
    cb(null, "public/images/uploads/");
  },    
  filename: (req, file, cb) => {    
    cb(null, `${uuidv4()}-${file.originalname}`)    
  },    
})  

const upload = multer({ storage })

module.exports = upload