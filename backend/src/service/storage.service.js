const ImageKit = require("imagekit");
const mongoose = require("mongoose");

const imagekit = new ImageKit({
    publicKey: process.env.ImageKit_PublicKey,
    privateKey: process.env.ImageKit_PrivateKey,
    urlEndpoint: process.env.ImageKit_UrlEndpoint
});

function uploadFile(file) {
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: file.buffer,
            fileName: new mongoose.Types.ObjectId().toString(),
            folder: "Ai_Face_audio"
        }, (error, result) => {
            if (error) {
                console.error("❌ ImageKit Upload Error:", error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = uploadFile;
