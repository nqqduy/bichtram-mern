import { FastField, Form, Formik } from "formik";
import { AiOutlineDelete } from "react-icons/ai";
import { BiPlusCircle } from "react-icons/bi";
import Wrapper from "./style";
import { Button, FormRow, Loading } from "../../../../components";
// import { valida{ useRef }tionCategory } from "../../../schema";
import React, { useRef, useState } from "react";

const defaultProduct =
  "https://curie.pnnl.gov/sites/default/files/default_images/default-image_0.jpeg";
const numDetailImages = 3;

export default function AddAndEditProductPopup({
  isEditing,
  initialValues,
  setShowPopup,
  handleSubmit,
  title,
  isLoading,
}) {
  const uploadFileRef = useRef(null);
  const uploadFileDetailRefs = Array(numDetailImages)
    .fill(null)
    .map(() => React.createRef(null));
  console.log(uploadFileDetailRefs);
  const [thumbnail, setThumbnail] = useState(defaultProduct);
  const [images, setImages] = useState([
    defaultProduct,
    defaultProduct,
    defaultProduct,
  ]);

  const handChangeUploadThumbnail = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setThumbnail(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handChangeUploadDetail = (event, index) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        let newImages = [...images];
        newImages[index] = base64String;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

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
                <p>Product Thumbnail</p>
                <img
                  src={thumbnail}
                  className="imagePreview"
                  onClick={() => uploadFileRef.current.click()}
                />
                <input
                  ref={uploadFileRef}
                  id="uploadFile"
                  type="file"
                  name="image"
                  onChange={handChangeUploadThumbnail}
                  accept="image/*"
                />

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
                <div className="product-detail">
                  <p>Product Detail</p>
                  <div className="product-detail-images">
                    {images.map((_, index) => {
                      return (
                        <div key={index}>
                          <img
                            src={images[index]}
                            className="imagePreview"
                            onClick={() =>
                              uploadFileDetailRefs[index].current.click()
                            }
                          />
                          <input
                            ref={uploadFileDetailRefs[index]}
                            id="uploadFile"
                            type="file"
                            name="image"
                            onChange={(e) => handChangeUploadDetail(e, index)}
                            accept="image/*"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
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
