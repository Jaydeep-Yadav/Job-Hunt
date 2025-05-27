import ApiError from '../utils/apiError.js';

const zodValidate = (schema) => (req, _ , next) => {
  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    const errors = parsed.error.errors.map(e => e.message);
    return next(new ApiError(400, 'Validation failed', errors));
  }

  req.body = parsed.data; // Overwrite with validated & cleaned data
  next();
};

export default zodValidate;
