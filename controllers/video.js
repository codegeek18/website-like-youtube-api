import videoFiles from '../models/videoFiles.js';

export const uploadVideo = async(req,res) => {
    console.log(req.file)
    if (req.file === undefined)
        res.status(404).json({ message: "Please Upload a '.mp4' video file only" });
    else {
        try {
            const file = new videoFiles({
                videoTitle: req.body.title,
                fileName: req.file.originalname,
                filePath: req.file.path,
                // filePath: filePath,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
                videoChannel: req.body.channel,
                uploader: req.body.uploader,
            })
            await file.save();
            res.status(201).send(`File uploaded succesfully`);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

export const getAllVideos = async (req, res) => {
    try {
        const files = await videoFiles.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(404).send(error.message);
    }  
};