export const documentSpecs = {
  fileName: 'Document',
  allowedMimeTypes: ['text/plain', 'application/pdf'],
  sizeLimitInMB: 15,
};
export const pictureSpecs = {
  fileName: 'Picture',
  allowedMimeTypes: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
  sizeLimitInMB: 5,
};
export const videoSpecs = {
  fileName: 'Video',
  allowedMimeTypes: [
    'video/x-flv',
    'video/mp4',
    'video/MP2T',
    'video/3gpp',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv',
  ],
  sizeLimitInMB: 500,
};
