/* import VideoModel from '../models/VideoModel.js';

export async function createVideo(req, res, next) {
  try {
    const video = new VideoModel(req.body);
    await video.save();
    res.status(201).json(video);
  } catch (error) {
    next(error);
  }
}

export async function getVideoById(req, res, next) {
  try {
    const video = await VideoModel.findById(req.params.id);
    if (!video) {
      res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
}

export async function updateVideo(req, res, next) {
  try {
    const video = await VideoModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!video) {
      res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
}

export async function deleteVideo(req, res, next) {
  try {
    const video = await VideoModel.findByIdAndDelete(req.params.id);
    if (!video) {
      res.status(404).json({ message: 'Video not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function getAllVideos(req, res, next) {
  try {
    const videos = await VideoModel.find();
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
} */
