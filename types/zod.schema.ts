import { z } from "zod";

const UserSchema = z.object({
    user_id: z.number().transform((val) => Number(val)),
    user_location_id: z
        .number()
        .transform((val) => Number(val))
        .optional(),
    user_default_location: z.number({
        coerce: true,
        required_error: "Location is required",
        invalid_type_error: "Location must be valid data",
    }),
    firstname: z.number({
        coerce: true,
        required_error: "Firstname is required",
        invalid_type_error: "Firstname must be valid data",
    }),
    lastname: z.number({
        coerce: true,
        required_error: "Lastname is required",
        invalid_type_error: "Lastname must be valid data",
    }),
    user_email: z.number({
        coerce: true,
        required_error: "Email is required",
        invalid_type_error: "Email must be valid data",
    }),
});

export {
    UserSchema
};
