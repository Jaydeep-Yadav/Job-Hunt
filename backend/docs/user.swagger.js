/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - password
 *               - role
 *               - phoneNumber
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [jobseeker, recruiter]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: User already exist with this email.
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Internal Server Error.
 * 
 */
