const router = require('express').Router();
const fs = require('fs');
// 5429e53411446494f4e1d0135d038c5b62c0a8c0
const cors = require('cors');

router.post("/", cors(), (req, res) => {
    console.log(req.files)
    try{
    if (!req.files) {

        res.status(500).json({
          status: 500,
          message: 'No file uploaded',
        });
      } else {
        console.log("req.files.displayImage:", req.files.displayImage)
        //Use the name of the input field (i.e. "displayImage") to retrieve the uploaded file
        let displayImage = req.files.displayImage;
        
        //let photoAddress = './uploads/' + displayImage.name
  
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        displayImage.mv('./uploads/' + displayImage.name);
        console.log("entered else")        
        // router.put("/user/" + req.session.user_id)

        //send response
        res.send({
          status: 200,
          message: 'File is uploaded',
          data: {
            name: displayImage.name,
            mimetype: displayImage.mimetype,
            size: displayImage.size,
          },
        });
      }
    }
    catch(err){
      console.log('HERE')
        res.status(500).json({error: err});
    }
})

module.exports = router;