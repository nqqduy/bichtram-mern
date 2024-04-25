import { FastField, Form, Formik } from "formik";
import { AiOutlineDelete } from "react-icons/ai";
import { BiPlusCircle } from "react-icons/bi";
import Wrapper from "./style";
import { Button, FormRow, Loading } from "../../../../components";
// import { validationCategory } from "../../../schema";

export default function AddAndEditProductPopup({
  isEditing,
  initialValues,
  setShowPopup,
  handleSubmit,
  title,
  isLoading,
}) {
  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        // validationSchema={validationCategory}
      >
        {(formikProps) => {
          return (
            <Form className="form-product">
              <h5>{title}</h5>
              <hr />
              <div className="form-center-product">
                <FastField
                  name="name"
                  component={FormRow}
                  type="text"
                  labelText="Product name"
                  placeholder="Product name"
                />
                <FastField
                  name="name"
                  component={FormRow}
                  type="text"
                  labelText="Product type"
                  placeholder="Product type"
                />
                <FastField
                  name="name"
                  component={FormRow}
                  type="text"
                  labelText="Product price"
                  placeholder="Product price"
                />
                <FastField
                  name="name"
                  component={FormRow}
                  type="text"
                  labelText="Product brand"
                  placeholder="Product brand"
                />
                <div className="btn-container-product">
                  {isLoading ? (
                    <Loading center />
                  ) : (
                    <>
                      <Button
                        type="submit"
                        classname="btn-custom  btn-icon"
                        text={isEditing ? "Cập Nhật" : "Thêm"}
                        icon={<BiPlusCircle className="front-icon" />}
                      />
                      <Button
                        type="button"
                        classname="btn-custom  btn-icon btn-delete"
                        text="Hủy"
                        icon={<AiOutlineDelete className="front-icon" />}
                        handleFunction={setShowPopup}
                      />
                    </>
                  )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
}
