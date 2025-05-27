const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Hunt API",
      version: "1.0.0",
      description: "API documentation for Job Hunt project",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./docs/*.js"], // files where you add Swagger comments
};

export default swaggerOptions;
