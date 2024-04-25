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
const Customer = () => {
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

  return (
    <Wrapper>
      <h4>Order Management</h4>
      <hr />
      {/* <SearchProCate name="doanh mục" state={state} setState={setState} /> */}

      <Table
        columns={columns}
        rowKey={(record) => record.login.uuid}
        dataSource={data}
        pagination={tableParams.pagination}
        // loading={loading}
        onChange={handleTableChange}
      />
    </Wrapper>
  );
};

export default Customer;
