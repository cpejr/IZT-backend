export default function asyncHandler(handler) {
  return async (req, res, next) => {
    return Promise.resolve(handler(req, res, next)).catch((err) => next(err));
  };
}
