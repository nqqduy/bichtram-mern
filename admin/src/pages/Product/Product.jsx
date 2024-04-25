import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Wrapper from "../../assets/styles/management";
import { Button, Loading } from "../../components";
// import { PopupCategory, SearchProCate } from "./components";
import { Space, Table, Tag } from "antd";
import { addingProduct } from "../../app/product/productSlice";
import AddAndEditProductPopup from "./components/AddAndEditProductPopup/AddAndEditProductPopup";

const { Column, ColumnGroup } = Table;
const columns = [
  {
    title: "No.",
    dataIndex: "No",
    width: "10%",
  },
  {
    title: "Name",
    dataIndex: "name",
    // render: (name) => `${name.first} ${name.last}`,
    width: "20%",
  },
  {
    title: "Type",
    dataIndex: "type",
    // filters: [
    //   { text: "Male", value: "male" },
    //   { text: "Female", value: "female" },
    // ],
    width: "20%",
  },
  {
    title: "Brands",
    dataIndex: "Brands",
  },
  {
    title: "Created On",
    data: "createdAt",
    sorter: true,
  },
];
const Product = () => {
  const isEditing = useSelector((state) => state.product.isEditing);
  const isLoading = useSelector((state) => state.product.isLoading);
  const currentProduct = useSelector((state) => state.product.currentProduct);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

  const [data, setData] = useState();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });
  //  useEffect(() => {
  //     fetchData();
  //   }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  //   const listCategory = useSelector((state) => state.category.listCategory);
  //   const isEditing = useSelector((state) => state.category.isEditing);
  //   const isLoading = useSelector((state) => state.category.isLoading);

  //   const currentCategory = useSelector(
  //     (state) => state.category.currentCategory
  //   );

  //   const [showPopup, setShowPopup] = useState(false);
  //   const dispatch = useDispatch();

  //   const [state, setState] = useState({ name: "" });
  //   const [page, setPage] = useState(1);
  //   const [pageSize, setPageSize] = useState(5);
  //   const [totalCount, setTotalCount] = useState(0);

  //   const prevPage = async () => {
  //     const pg = page === 1 ? 1 : page - 1;
  //     setPage(pg);
  //   };

  //   const nextPage = async () => {
  //     const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
  //     setPage(pg);
  //   };

  //   const allPage = () => {
  //     setPage(null);
  //     setPageSize(null);
  //   };

  //   const handlePopup = () => {
  //     setShowPopup(!showPopup);
  //   };

  //   const handleAdd = () => {
  //     dispatch(addCategory());
  //     setShowPopup(!showPopup);
  //   };

  //   const handleEdit = (currentCategory) => {
  //     dispatch(editingCategory(currentCategory));
  //     setShowPopup(!showPopup);
  //   };

  //   useEffect(() => {
  //     const fetchCategory = async () => {
  //       try {
  //         const actionResult = await dispatch(getAllCategory({ ...state }));
  //         unwrapResult(actionResult);
  //       } catch (error) {
  //         Swal.fire({
  //           icon: "warning",
  //           title: error.message,
  //           showConfirmButton: true,
  //         });
  //       }
  //     };

  //     fetchCategory();
  //   }, [dispatch, state]);

  //   const handleSubmit = async (currentCategory) => {
  //     try {
  //       if (isEditing) {
  //         const actionResult = await dispatch(updateCategory(currentCategory));
  //         unwrapResult(actionResult);
  //       } else {
  //         const actionResult = await dispatch(createCategory(currentCategory));
  //         unwrapResult(actionResult);
  //       }
  //       const action2 = await dispatch(getAllCategory()); // khi thêm thì update ngay tại bảng
  //       unwrapResult(action2);
  //       Swal.fire({
  //         icon: "success",
  //         title: isEditing ? "Sửa thành công" : "Thêm thành công",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     } catch (error) {
  //       Swal.fire({
  //         icon: "warning",
  //         title: error.message,
  //         showConfirmButton: true,
  //       });
  //     }
  //   };

  //   const handleDelete = async (id) => {
  //     try {
  //       const actionResult = await dispatch(deleteCategory(id));
  //       unwrapResult(actionResult);
  //       const action2 = await dispatch(getAllCategory()); // khi thêm thì update ngay tại bảng
  //       unwrapResult(action2);
  //     } catch (error) {
  //       Swal.fire({
  //         icon: "warning",
  //         title: error.message,
  //         showConfirmButton: true,
  //       });
  //     }
  //   };
  //   const initialValues = isEditing
  //     ? currentCategory
  //     : {
  //         name: "",
  //         description: "",
  //       };
  const handleAdd = () => {
    dispatch(addingProduct());
    setShowPopup(!showPopup);
  };
  const handlePopup = () => {
    setShowPopup(!showPopup);
  };
  const handleSubmit = async (currentProduct) => {};
  const initialValues = isEditing
    ? currentProduct
    : {
        name: "",
        type: "",
        price: "",
        brand: "",
      };
  return (
    <Wrapper>
      <h4>Product Management</h4>
      <hr />
      {/* <SearchProCate name="doanh mục" state={state} setState={setState} /> */}
      <div className="btn-container">
        <Button
          classname="btn-custom btn-icon"
          text="Add Product"
          icon={<BiPlusCircle className="front-icon" />}
          handleFunction={handleAdd}
        />
      </div>

      <Table
        columns={columns}
        rowKey={(record) => record.login.uuid}
        dataSource={data}
        pagination={tableParams.pagination}
        // loading={loading}
        onChange={handleTableChange}
      />

      {showPopup && (
        <AddAndEditProductPopup
          setShowPopup={handlePopup}
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
          title="Add Product"
          isLoading={isLoading}
        />
      )}
    </Wrapper>
  );
};

export default Product;
