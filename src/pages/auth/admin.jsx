import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import Table from "../../components/ui/use-table";

// Modal
import Modal from "@/components/ui/Modal";
import { BASE_URL } from "../../api/api";
import Fileinput from "@/components/ui/Fileinput";
import axios from "axios";
import Swal from 'sweetalert2';

import { Link } from "react-router-dom";


const Admin = ({ title = "View All Admins"}) => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [mobile, setMobile] = useState('');
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
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };
  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = async () => {
    try {
      if (!selectedFile) {
        showAlert("error", "Please select an image");
        return;
      }

      // Upload the image first
      const formData = new FormData();
      formData.append("file", selectedFile);

      const imageUploadResponse = await fetch(`${BASE_URL}/upload-image/adminuser`, {
        method: "POST",
        body: formData,
      });

      if (!imageUploadResponse.ok) {
        showAlert("error", "Image upload failed");
        return;
      }

      const imageUploadData = await imageUploadResponse.json();

      // Then submit the rest of the data including the image URL
      const adminData = {       
        name: name,
        email: email,
        password: password,
        mobileNumber: mobile,
        imageUrl: imageUploadData.data.url, // Use the URL from the image upload response
      };

      const response = await fetch(`${BASE_URL}/save-user`, {
        method: "POST",
        body: JSON.stringify(adminData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        showAlert("success", "User Added Successfully");
      } else {
        showAlert("error", "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      showAlert("error", "An error occurred");
    }
  };

  const showAlert = (icon, text) => {
    Swal.fire({
      title: 'Success',
      text: text,
      icon: icon,
      confirmButtonText: 'OK!',
    });
  };
  // Get All Admin
  const [userAdmin, setUserAdmin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    const accessToken = localStorage.getItem('accessToken');   
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`, 
      'Content-Type': 'application/json', 
    };
    
    axios.get(`${BASE_URL}/get-all-user`, {
      headers: headers,
    })    
      .then((response) => {
        console.log(response.data);
        const { data } = response.data;
        setUserAdmin(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []); 
 const columns = React.useMemo(
  () =>[
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'name',
    Cell: (row) => {
      return (
        <div>
          <span className="inline-flex items-center">
            <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
              <img
                src={row?.row?.original?.imageUrl}
                alt=""
                className="object-cover w-full h-full rounded-full"
              />
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.value}
            </span>
          </span>
        </div>
      );
    },
  }, 
  {
    Header: 'Mobile Number',
    accessor: 'mobileNumber',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: "Date",
    accessor: "createdDate", 
    Cell: (row) => {
      const formattedDate = new Date(row?.row?.original?.createdDate).toLocaleDateString();        
      return (
        <div className="text-sm text-slate-600 dark:text-slate-300">
          {formattedDate}
        </div>
      );
    },
  },
  
  {
    Header: "action",
    accessor: "action",
    Cell: (row) => {
      return (
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Tooltip content="Disable" placement="top" arrow animation="shift-away">
            <Link to="#" className="action-btn" type="button">
              <Icon icon="heroicons:eye" />
            </Link>
          </Tooltip>
          <Tooltip content="Edit" placement="top" arrow animation="shift-away">
            <button className="action-btn" type="button" >
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
  ],
  []
 )
     
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
          >
          <form >
            <div className="mb-4">
                <Textinput
                    label="Name"
                    id="a_name"
                    type="text"
                    placeholder=""
                    onChange={handleNameChange}
                />
            </div>
            <div className="mb-4">
                <Textinput
                    label="Email Id"
                    id="email"
                    type="email"
                    placeholder=""
                    onChange={handleEmailChange}
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
                    onChange={handlePasswordChange}                    
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
                    onChange={handleMobileChange}
                />
            </div>
            <div className="fromGroup xl:col-span-2 col-span-1 mb-4">
                <label className="form-label">Upload Admin image</label>                
                <Fileinput                  
                   selectedFile={selectedFile}
                   onChange={handleImageChange}
                />
            </div>
            <div className="fromGroup xl:col-span-2 col-span-1 text-right">
              <Button
                text="Save"
                className="btn-dark"  
                onClick={handleSubmit}              
              />              
            </div>
          </form>
          </Modal>
          </div>
        </div>
        <Table columns={columns} data={userAdmin} />
        
        {/*end*/}
      </Card>
    </div>
  );
};

export default Admin;
