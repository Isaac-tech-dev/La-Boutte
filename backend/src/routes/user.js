const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

// Create Express Router
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User login and registration
 *   - name: Pizza
 *     description: All pizza-related operations
 *   - name: Cart
 *     description: Manage your cart
 */


/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - confirmpassword
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmpassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: User Created Successfully
 *       400:
 *         description: Bad Request
 */
router.post("/signup", registerUser);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags: [Authentication]
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login Successful
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 */
router.post("/signin", loginUser);

/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignup:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - confirmpassword
 *       properties:
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: StrongPassword123
 *         confirmpassword:
 *           type: string
 *           format: password
 *           example: StrongPassword123
 *
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: StrongPassword123
 */


module.exports = router;
