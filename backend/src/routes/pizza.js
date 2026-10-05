const express = require("express");
const { getAllPizza, getPizzaFromDB, createPizza } = require("../controllers/pizzaController");

const router = express.Router();

/**
 * @swagger
 * /api/pizza:
 *   get:
 *     tags: [Pizza]
 *     summary: Get all pizzas from the database
 *     responses:
 *       200:
 *         description: A list of pizzas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pizza'
 */

/**
 * @swagger
 * /api/pizza:
 *   post:
 *     tags: [Pizza]
 *     summary: Create a new pizza
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pizza'
 *     responses:
 *       200:
 *         description: Pizza created successfully
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pizza:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - description
 *         - image
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 *         image:
 *           type: string
 */

// GET all from DB
router.get("/", getPizzaFromDB);

// POST new pizza
router.post("/", createPizza);

module.exports = router;
