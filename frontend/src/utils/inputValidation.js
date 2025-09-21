import * as Yup from "yup";

export const addProductSchema = Yup.object({
  name: Yup.string("Name must be a string")
    .required("Name is required.")
    .min(3, "Name must be at least 3 characters long.")
    .max(25, "Name must not exceed 20 characters."),
  price: Yup.number()
    .typeError("Price must be a valid number.")
    .positive("Price must be a positive number.")
    .required("Price is required."),
  img: Yup.string()
    .required("Url is required.")
    .matches(/^https?:\/\/.+\/.+$/, "Image url is not valid"),
});
