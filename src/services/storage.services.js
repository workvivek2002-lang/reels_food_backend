const ImageKit = require("@imagekit/nodejs").default

const imagekit = new ImageKit({
    publicKey: "public_RUfqINGNFtkYCVhT3f6ncwAOhpI",
    privateKey: "private_0FU5p8waPVo4kEKSYyPlDd5H5ow=",
    urlEndpoint: "private_0FU5p8waPVo4kEKSYyPlDd5H5ow"
})

async function uploadFile(file, fileName) {
    try {
        const result = await imagekit.files.upload({
            file:file,
            fileName:fileName,
            folder:"FoodVideo"
        })
        return result
    } catch (err) {
        console.log(err);

    }
}

module.exports = { uploadFile }