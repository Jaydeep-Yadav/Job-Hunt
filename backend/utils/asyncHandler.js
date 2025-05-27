const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error); // Pass any caught error to Express error handler
    }
  };
};

export default asyncHandler;
