import asyncHandler from '../utils/asyncHandler';
import FileModel from '../models/FileModel.js';

export const getFiles = asyncHandler(async (req, res) => {
  const files = await FileModel.find();
  res.status(200).json({ success: true, data: files });
});

export const getFileById = asyncHandler(async (req, res) => {
  const file = await FileModel.findById(req.params.id);
  if (!file) {
    res.status(404);
    throw new Error('File not found');
  }
  res.status(200).json({ success: true, data: file });
});

export const createFile = asyncHandler(async (req, res) => {
  const file = await FileModel.create(req.body);
  res.status(201).json({ success: true, data: file });
});

export const updateFile = asyncHandler(async (req, res) => {
  let file = await FileModel.findById(req.params.id);
  if (!file) {
    res.status(404);
    throw new Error('File not found');
  }
  file = await FileModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: file });
});

export const deleteFile = asyncHandler(async (req, res) => {
  const file = await FileModel.findById(req.params.id);
  if (!file) {
    res.status(404);
    throw new Error('File not found');
  }
  await file.remove();
  res.status(200).json({ success: true, data: {} });
});
