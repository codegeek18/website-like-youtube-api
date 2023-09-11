import likedVideo from '../models/likedVideo.js';
import mongoose from 'mongoose';

export const likeVideoController = async (req, res) => {
    const likedVideoData = req.body;

    // console.log(likedVideoData)
    const addToLikedVideo = new likedVideo(likedVideoData);

    try {
        await addToLikedVideo.save();
        res.status(200).json('Added to LikedVideo');
        // console.log("Done!")
    } catch (error) {
        res.status(400).json(error);
    }
};

export const getAllLikeVideoController = async (req, res) => {
    try {
        const files = await likedVideo.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(404).send(error.message);
    }  
};

export const deleteLikedVideoController = async (req, res) => {
    const { videoId: VideoId, Viewer: Viewer } = req.params;
    try {
        await likedVideo.findOneAndDelete({
            videoId: VideoId, Viewer: Viewer
        });
        res.status(200).json({ message: "Removed from your Liked Videos" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};