import { MulterError } from 'multer';
import ApiError from '../utils/apiError.js';

const errorHandler = (err, _ , res, __ ) => {
  
  // Handle API Error
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors.length ? err.errors : undefined,
    });
  }

  // Handle Multer Error
  if (err instanceof MulterError || err.message?.includes("Only")) {
    return res.status(400).json({
      success: false,
      message: "File upload error",
      error: err.message,
    });
  }

  // Handle unexpected errors
  console.error('Unexpected Error:', err);

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error!',
  });
};

export default errorHandler;
