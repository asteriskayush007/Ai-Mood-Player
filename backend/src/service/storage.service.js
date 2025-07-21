var ImageKit = require("imagekit");
var mongoose = require("mongoose")
var imagekit = new ImageKit({
    publicKey : process.env.ImageKit_PublicKey,
    privateKey : process.env.ImageKit_PrivateKey,
    urlEndpoint : process.env.ImageKit_UrlEndpoint
});

function uploadFile(file){
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: file.buffer,
            fileName: (new mongoose.Types.ObjectId()).toString(),
            folder:"Ai_Face_audio"
        }, (error, result) => {
            if (error) {
                console.log("ImageKit Upload Error:", error); // 👈 Add this
                reject(error);
            } else {
                resolve(result);
            }
        })
    });
}


module.exports = uploadFile;