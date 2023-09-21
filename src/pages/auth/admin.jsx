import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import Button from "@/components/ui/Button";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import Textinput from "@/components/ui/Textinput";
//import DropZone from "../forms/file-input/DropZone";
// Modal
import Modal from "@/components/ui/Modal";
import { BASE_URL } from "../../api/api";
import Fileinput from "@/components/ui/Fileinput";
import axios from "axios";

//import GlobalFilter from "./GlobalFilter";
import GlobalFilter from "../table/react-tables/GlobalFilter";
import customer1 from "@/assets/images/all-img/customer_1.png";
import { Link } from "react-router-dom";
// export const advancedTable = [
//     {
//         id: 1,    
//         users: {
//             name: "Saryu Sirohi",
//             image: customer1,
//           },
//         mobileno: "9876543210",
//         emailid: "saryu@targeticon",
//         date: "3/26/2022",
//         status: "active",
//         image: customer1,
//         action: null,
//     },
//     {
//       id: 2,  
//       users: {
//         name: "Saryu Sirohi",
//         image: customer1,
//       },
//         mobileno: "9876543210",
//         emailid: "saryu@targeticon",
//         date: "3/26/2022",
//         status: "active",
//         image: customer1,
//         action: null, 
//   },
//   {
//     id: 3, 
//     users: {
//         name: "Saryu Sirohi",
//         image: customer1,
//       },
//     mobileno: "9876543210",
//     emailid: "saryu@targeticon",
//     date: "3/26/2022",
//     status: "active",
//     image: customer1,
//     action: null, 
// },
// ]
// const COLUMNS = [
//   {
//     Header: "Id",
//     accessor: "id",
//     Cell: (row) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   }, 
//   {
//     Header: "Users",
//     accessor: "users",
//     Cell: (row) => {
//       return (
//         <div>
//           <span className="inline-flex items-center">
//             <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
//               <img
//                 src={row?.cell?.value.image}
//                 alt=""
//                 className="object-cover w-full h-full rounded-full"
//               />
//             </span>
//             <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
//               {row?.cell?.value.name}
//             </span>
//           </span>
//         </div>
//       );
//     },
//   }, 
//   {
//     Header: "Mobile Number",
//     accessor: "mobileNumber",
//     Cell: (row) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   },  
//   {
//     Header: "Email Id",
//     accessor: "email",
//     Cell: (row) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   },
//   {
//     Header: "date",
//     accessor: "date",
//     Cell: (row) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   },

//   {
//     Header: "status",
//     accessor: "status",
//     Cell: (row) => {
//       return (
//         <span className="block w-full">
//           <span
//             className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
//               row?.cell?.value === "active"
//                 ? "text-success-500 bg-success-500"
//                 : ""
//             }
//             ${
//               row?.cell?.value === "inactive"
//                 ? "text-danger-500 bg-danger-500"
//                 : ""
//             }
            
//              `}
//           >
//            {row?.cell?.value}
//           </span>
//         </span>
//       );
//     },
//   },
//   {
//     Header: "action",
//     accessor: "action",
//     Cell: (row) => {
//       return (
//         <div className="flex space-x-3 rtl:space-x-reverse">
//           <Tooltip content="View" placement="top" arrow animation="shift-away">
//             <Link to="/view-user" className="action-btn" type="button">
//               <Icon icon="heroicons:eye" />
//             </Link>
//           </Tooltip>
//           <Tooltip content="Edit" placement="top" arrow animation="shift-away">
//             <button className="action-btn" type="button">
//               <Icon icon="heroicons:pencil-square" />
//             </button>
//           </Tooltip>
//           <Tooltip
//             content="Delete"
//             placement="top"
//             arrow
//             animation="shift-away"
//             theme="danger"
//           >
//           <button className="action-btn" type="button">
//             <Icon icon="heroicons:trash" />
//           </button>
//           </Tooltip>
//         </div>
//       );
//     },
//   },
// ];
const COLUMNS = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  
  {
    Header: 'Email',
    accessor: 'email',
  },
  
  {
    Header: 'Mobile Number',
    accessor: 'mobileNumber',
  },
  // Add other columns as needed
];

const Admin = ({ title = "View All Admins" }) => { 
  const [password, setPassword] = useState('');

   const generatePassword = () => {
    const length = 12; // Specify the desired length of the password
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?'; // Define the character set for the password
    let newPassword = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset.charAt(randomIndex); // Use charAt to access characters at the specified index
    }

    setPassword(newPassword);
  };
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    const accessToken = localStorage.getItem('accessToken');   
    const headers = {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${accessToken}`, 
      'Content-Type': 'application/json', 
    };
    
    axios.get(`${BASE_URL}/get-all-user`, {
      headers: headers,
    })    
      .then((response) => {
        const { data } = response.data.data;
        setUserData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => userData, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,

  );
  const {
    getTableProps,
    rows,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { 
    globalFilter, 
    pageIndex, 
    pageSize } = state;

   
  
  return (
    <div>
      <Card>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">{title}</h4>
          <div>
          <Modal
            title="Add New Admin"
            label="Add Admin"
            labelClass="btn-dark btn-sm"
            uncontrol
            className="max-w-5xl"
            centered
            scrollContent
            // footerContent={
            //   <Button
            //     text="Save"
            //     className="btn-dark "
            //     onClick={() => {
            //       alert("use Control Modal");
            //     }}
            //   />
            // }
          >
          <form >
            <div className="mb-4">
                <Textinput
                    label="Name"
                    id="a_name"
                    type="text"
                    placeholder=""
                />
            </div>
            <div className="mb-4">
                <Textinput
                    label="Email Id"
                    id="email"
                    type="email"
                    placeholder=""
                />
            </div>
            <div className="flex mb-4 space-y-4 items-end">
              <div className="flex-1 ">
                <Textinput
                    label="Create Password"
                    id="password"
                    type="text"
                    value={password}
                    defaultValue={password}  
                    placeholder=""                    
                />
              </div>                
              <div>
                <Button
                  text="Generate Password"
                  className="btn-dark btn-sm"
                  onClick={generatePassword}
                />
              </div>                
            </div>
            <div className="mb-4">
                <Textinput
                    label="Mobile Number"
                    id="mobile_no"
                    type="number"
                    placeholder=""
                />
            </div>
            <div className="fromGroup xl:col-span-2 col-span-1 mb-4">
                <label className="form-label">Upload Admin image</label>                
                <Fileinput                  
                   
                />
            </div>
            <div className="fromGroup xl:col-span-2 col-span-1 text-right">
              <Button
                text="Save"
                type="submit"
                className="btn-dark"                
              />              
            </div>
          </form>
          </Modal>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
             <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className="bg-slate-200 dark:bg-slate-700">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className=" table-th "
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()} className="table-td">
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>              
            </div> 
            
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <select
              className="form-control py-2 w-max"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons:chevron-double-left-solid" />
              </button>
            </li>
            <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Prev
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-sparks-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </button>
            </li>
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Icon icon="heroicons:chevron-double-right-solid" />
              </button>
            </li>
          </ul>
        </div>
        {/*end*/}
      </Card>
    </div>
  );
};

export default Admin;
