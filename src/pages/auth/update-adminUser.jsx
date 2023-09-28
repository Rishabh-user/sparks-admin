import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";

const UpdateAdminUser = ({ isOpen, onClose, userData, onUpdate }) => {
    const [updatedName, setUpdatedName] = useState(userData.name);
    const [updatedEmail, setUpdatedEmail] = useState(userData.email);
    const [updatedMobileNo, setupdatedMobileNo] = useState(userData.mobileNumber);
    //const [updatedImage, setupdatedImage] = useState(userData.imageUrl);
    //const [updatedDate, setupdatedDate] = useState(userData.lastModifiedDate);
  
    const handleSave = async () => {
      const updatedData = {
        id: userData.id,
        name: updatedName,
        email: updatedEmail,
        mobileNumber: updatedMobileNo,
        //imageUrl: updatedImage,
        //lastModifiedDate: updatedDate
      };
  
      try {
        // Send the PUT request to update the user data
        const response = await axios.put(
          `${BASE_URL}/update-user/${userData.id}`, // Replace with your API endpoint
          updatedData
        );
  
        if (response.status === 200) {
          // Handle success, e.g., close the modal and update the user data
          onUpdate(updatedData);
          onClose();
        } else {
          // Handle error, e.g., display an error message
          console.error("Update failed");
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Update failed", error);
      }
    };

  return (
    <Modal
      title="Edit User"
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-5xl"
      centered
      scrollContent
    >
      <form>
        <div className="mb-4">
          <Textinput
            label="Name"
            id="edit_name"
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Textinput
            label="Email Id"
            id="edit_email"
            type="email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Textinput
            label="Mobile Number"
            id="edit_number"
            type="email"
            value={updatedMobileNo}
            onChange={(e) => setupdatedMobileNo(e.target.value)}
          />
        </div>        
        <div className="fromGroup xl:col-span-2 col-span-1 text-right">
          <button
            type="button"
            className="btn-dark"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateAdminUser;
