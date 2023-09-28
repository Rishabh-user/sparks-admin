import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import Table from "../../components/ui/use-table";


import { Link } from "react-router-dom";
import { BASE_URL } from "../../api/api";
import axios from "axios";

const columns = [
  {
    Header: "Id",
    accessor: "id",    
  }, 
  {
    Header: "Users",
    accessor: "name",
    Cell: (row) => {
      return (
        <div>
          <span className="inline-flex items-center">
            <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
              <img
                src={row?.row?.original?.userProfile}
                alt=""
                className="object-cover w-full h-full rounded-full"
              />
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize" style={{width: 150 + 'px'}}>
              {row?.value}
            </span>
          </span>
        </div>
      );
    },
  }, 
  {
    Header: "Mobile Number",
    accessor: "mobileNumber",
  },  
  {
    Header: "Email Id",
    accessor: "emailId",
  },
  {
    Header: "date",
    accessor: "lastModifiedDate",
    Cell: (row) => {
      const formattedDate = new Date(row?.row?.original?.lastModifiedDate).toLocaleDateString();        
      return (
        <div className="text-sm text-slate-600 dark:text-slate-300">
          {formattedDate}
        </div>
      );
    },
  },

  // {
  //   Header: "status",
  //   accessor: "status",
  //   Cell: (row) => {
  //     return (
  //       <span className="block w-full">
  //         <span
  //           className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
  //             row?.cell?.value === "active"
  //               ? "text-success-500 bg-success-500"
  //               : ""
  //           }
  //           ${
  //             row?.cell?.value === "inactive"
  //               ? "text-danger-500 bg-danger-500"
  //               : ""
  //           }
            
  //            `}
  //         >
  //           {row?.cell?.value}
  //         </span>
  //       </span>
  //     );
  //   },
  // },
  {
    Header: "action",
    accessor: "action",
    Cell: (row) => {
      return (
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Tooltip content="View" placement="top" arrow animation="shift-away">
            <Link to="/view-user" className="action-btn" type="button">
              <Icon icon="heroicons:eye" />
            </Link>
          </Tooltip>
          <Tooltip content="Edit" placement="top" arrow animation="shift-away">
            <button className="action-btn" type="button">
              <Icon icon="heroicons:pencil-square" />
            </button>
          </Tooltip>
          <Tooltip
            content="Delete"
            placement="top"
            arrow
            animation="shift-away"
            theme="danger"
          >
            <button className="action-btn" type="button">
              <Icon icon="heroicons:trash" />
            </button>
          </Tooltip>
        </div>
      );
    },
  },
];

const ViewAllUsers = ({ title = "View All Users" }) => { 
   // Get All Admin
   const [userData, setUserData] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
 
   useEffect(() => { 
     const accessToken = localStorage.getItem('accessToken');   
     const headers = {
       'Accept': 'application/json',
       'Authorization': `Bearer ${accessToken}`, 
       'Content-Type': 'application/json', 
     };
     
     axios.get(`${BASE_URL}/get-users`, {
       headers: headers,
     })    
       .then((response) => {
         console.log(response.data);
         const { data } = response.data;
         setUserData(data);
         setIsLoading(false);
       })
       .catch((error) => {
         console.error('Error fetching data:', error);
         setIsLoading(false);
       });
   }, []); 
  
  return (
    <div>
      <Card>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">{title}</h4>
          
        </div>
        <Table columns={columns} data={userData} />
        
        {/*end*/}
      </Card>
    </div>
  );
};

export default ViewAllUsers;
