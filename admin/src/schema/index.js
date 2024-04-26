import * as Yup from "yup";

export const validationLogin = Yup.object().shape({
  password: Yup.string().required("Not be empty"),
  email: Yup.string().required("Not be empty").email("Invalid email"),
});
