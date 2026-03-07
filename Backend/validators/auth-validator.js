const {z} = require("zod");

const signupSchema = z.object({
    username: z
    .string({ required_error: "Name is required"})
    .trim()
    .min(3,{message: "Name must be at lest of 3"})
    .max(255,{ message: "Name must not be more than 255 character"}),

    email: z
    .string({ required_error: "Email is required"})
    .trim()
    .email({message: "Invalid email address"})
    .min(3,{message: "Email must be at lest of 3"})
    .max(255,{ message: "Email must not be more than 255 character"}),

    phone: z
    .string({ required_error: "Phone is required"})
    .trim()
    .min(10,{message: "Phone must be atleast 10 character"}),

    password: z
    .string({ required_error: "Password is required"})
    .min(7,{message: "Password must be atleast 6 character"})
    .max(255,{ message: "Password must not be more than 255 character"})
});

module.exports = signupSchema;