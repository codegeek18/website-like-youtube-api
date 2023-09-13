"use strict"
import express, { Router } from "express";
import { app } from '../config/firebase.config.js';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import multer from "multer";

const storage = getStorage(app);

// const storageOptions = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
//     },
// });

// const filefilter = (req, file, cb) => {
//     if (file.mimetype === 'video/mp4') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };
// export const upload = multer({ storage:storageOptions, filefilter:filefilter });

export const upload = multer({ storage:multer.memoryStorage() });

export const uploadVideoToStorage = async (req, res, next) => {
    try {
        console.log(req.file)
        const filePath = `uploads/${new Date().toISOString().replace(/:/g, "-") + "-" + req.file.originalname}`;
        const storageRef = ref(storage, filePath);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadUrl = await getDownloadURL(snapshot.ref);
        console.log('File successfully uploaded');
        req.file.path = downloadUrl;
        next();
    } catch (error) {
        return res.status(400).send(error.message);
    }
}