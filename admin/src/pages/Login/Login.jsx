import { FastField, Form, Formik } from "formik";
import FormRow from "../../components/FormRow/FormRow.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import Wrapper from "./style.js";
import { AiOutlineMail } from "react-icons/ai";
import { BiCopyright } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Login() {
  const initialValues = {
    email: "",
    workspace: "",
    password: "",
  };

  const onSubmit = async (currentUser) => {
    try {
      //   const actionResult = await dispatch(loginUser(currentUser));
      //   unwrapResult(actionResult);
      //   Swal.fire({
      //     icon: "success",
      //     title: "Đăng nhập thành công",
      //     showConfirmButton: true,
      //   });
    } catch (error) {
      //   Swal.fire({
      //     icon: "warning",
      //     title: error.message,
      //     showConfirmButton: true,
      //   });
    }
  };
  return (
    <Wrapper className="full-page">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        // validationSchema={validationLogin}
      >
        {(formikProps) => {
          return (
            <Form className="form">
              <Logo />
              <h3>đăng nhập</h3>
              <p>Chào mừng đến Shine-Aura</p>
              <FastField
                name="email"
                component={FormRow}
                type="text"
                labelText="email"
                placeholder="Nhập email"
                icon={<AiOutlineMail className="icon" size={20} />}
              />
              <FastField
                name="password"
                component={FormRow}
                type="password"
                labelText="mật khẩu"
                placeholder="Nhập mật khẩu"
                icon={<RiLockPasswordLine className="icon" size={20} />}
              />
              <button type="submit" className="btn-custom">
                Đăng nhập
              </button>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
}
export default Login;
