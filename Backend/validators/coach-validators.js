// validators/coach-validators.js
const { z } = require("zod");

const coachSignupSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .min(3, { message: "Name must be at least 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),

    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),

    coachType: z
        .string({ required_error: "Coach Type is required" })
        .min(3, { message: "Coach Type must be at least 3 characters" }),

    country: z
        .string({ required_error: "Country is required" })
        .min(2, { message: "Country name is too short" }),

    password: z
        .string({ required_error: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters" })
        .max(255, { message: "Password must not be more than 255 characters" }),

    
});

module.exports = coachSignupSchema;
