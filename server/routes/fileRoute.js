const express = require("express");
const router = express.Router();
const { v2 } = require("cloudinary");

v2.config({
  api_key: "859192987521754",
  cloud_name: "ddkczxqph",
  api_secret: "QaNxcXYCRaxPNcS4FCmSziXRBIk",
});

// Upload one file
router.post("/1", async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      v2.uploader
        .upload_stream(
          {
            resource_type: "auto",
            public_id: fileModel.getName() + "-" + Date.now(),
            folder: "bichtram",
          },

          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(fileModel.getBuffer());
    });

    res.json({ message: "successfully", url: result.url });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
