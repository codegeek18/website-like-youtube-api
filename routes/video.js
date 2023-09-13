import express from 'express';
import { uploadVideo, getAllVideos } from '../controllers/video.js';
import { likeController } from '../controllers/like.js';
import { viewController } from '../controllers/views.js';
import { likeVideoController, getAllLikeVideoController, deleteLikedVideoController } from '../controllers/likeVideo.js';
import { watchLaterController, getAllWatchLaterController, deleteWatchLaterController } from '../controllers/watchLater.js';
import { historyController, getAllHistoryController, clearHistoryController } from '../controllers/history.js';
import { uploadVideoToStorage, upload } from '../Helpers/fileHelpers.js';
import auth from '../middleware/auth.js';

const routes = express.Router();

// routes.post("/uploadVideo", auth, upload.single("file"),uploadVideo);
routes.post("/uploadVideo", auth, upload.single("file"), uploadVideoToStorage, uploadVideo);
routes.get("/getvideos", getAllVideos);
routes.patch('/like/:id', auth, likeController);
routes.patch('/view/:id', viewController);

routes.post('/likeVideo', auth, likeVideoController);
routes.get('/getAllLikedVideos', getAllLikeVideoController);
routes.delete('/deleteLikedVideo/:videoId/:Viewer', auth,deleteLikedVideoController);

routes.post('/watchLater', auth, watchLaterController);
routes.get('/getAllWatchLaterVideos', getAllWatchLaterController);
routes.delete('/deleteWatchLater/:videoId/:Viewer', auth, deleteWatchLaterController);

routes.post('/history', auth, historyController);
routes.get('/getAllHistory', getAllHistoryController);
routes.delete('/clearHistory/:userId', auth, clearHistoryController);

export default routes;