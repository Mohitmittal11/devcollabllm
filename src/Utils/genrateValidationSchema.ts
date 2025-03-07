import * as Yup from "yup";

export const loginValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string()
      .required("Password is Required")
      .min(6, "Password must be of at least 6 Digits"),
  });
};

export const PasswordValidationSchema = () => {
  return Yup.object().shape({
    // currentPassword: "",
    // newPassword: "",
    // confirmPassword: "",
    currentPassword: Yup.string()
      .required("Password is Required")
      .min(6, "Password must be of at least 6 Digits"),
    newPassword: Yup.string()
      .required("New Password is Required")
      .min(6, "Password must be of at least 6 Digits"),
    confirmPassword: Yup.string()
      .required("Confirm Password is Required")
      .min(6, "Password must be of at least 6 Digits")
      .oneOf([Yup.ref("newPassword")], "Password Must Be Matched"),
  });
};

export const projectValidationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required("Project Name is Required"),
    description: Yup.string(),
  });
};

export const addDeveloperValidationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().email().required("Email is Required"),
  });
};
