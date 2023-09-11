import history from '../models/history.js';
import mongoose from 'mongoose';

export const historyController = async (req, res) => {
    const historyData = req.body;
    const {videoId, Viewer } = historyData;
    // console.log(historyData);
    const addToHistory = new history(historyData);
    // console.log(addToHistory)

    try {
        const existingHistory = await history.findOne({ videoId:videoId, Viewer:Viewer });
        // console.log(existingHistory);
        if (!existingHistory) {
            await addToHistory.save();
            res.status(200).json('Added to History');
            // console.log("Done!")
        }
        
    } catch (error) {
        res.status(400).json(error);
    }
};

export const getAllHistoryController = async (req, res) => {
    try {
        const files = await history.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(404).send(error.message);
    }  
};

export const clearHistoryController = async (req, res) => {
    const { userId: userId } = req.params;
    try {
        await history.deleteMany({
            Viewer: userId
        });
        res.status(200).json({ message: "Removed from your History" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};