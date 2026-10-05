require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/user");
const pizzaRoutes = require("./src/routes/pizza");
const cartRoutes = require("./src/routes/cart");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Create Express App
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  // console.log(req.path, req.method);
  next();
});

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "LABOUTTE_API",
      description: "API documentation for Laboute",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/pizza", pizzaRoutes);
app.use("/api/cart", cartRoutes);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000,
  })
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to Db & Listening on Port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
