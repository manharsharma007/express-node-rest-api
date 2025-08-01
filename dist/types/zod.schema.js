"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = require("zod");
const UserSchema = zod_1.z.object({
    user_id: zod_1.z.number().transform((val) => Number(val)),
    user_location_id: zod_1.z
        .number()
        .transform((val) => Number(val))
        .optional(),
    user_default_location: zod_1.z.number({
        coerce: true,
        required_error: "Location is required",
        invalid_type_error: "Location must be valid data",
    }),
    firstname: zod_1.z.number({
        coerce: true,
        required_error: "Firstname is required",
        invalid_type_error: "Firstname must be valid data",
    }),
    lastname: zod_1.z.number({
        coerce: true,
        required_error: "Lastname is required",
        invalid_type_error: "Lastname must be valid data",
    }),
    user_email: zod_1.z.number({
        coerce: true,
        required_error: "Email is required",
        invalid_type_error: "Email must be valid data",
    }),
});
exports.UserSchema = UserSchema;
//# sourceMappingURL=zod.schema.js.map