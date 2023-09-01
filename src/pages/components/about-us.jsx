import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
//import Textarea from "@/components/ui/Textarea";
// import Select from "@/components/ui/Select";
import { CKEditor } from 'ckeditor4-react';
import DropZone from "../forms/file-input/DropZone";
import Button from "@/components/ui/Button";
import Swal from 'sweetalert2';
import { BASE_URL } from "../../api/api";

const about_us = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [aboutUsData, setAboutUsData] = useState({
    type: "aboutus",
    title: "",
    description: "",
    //imageURL: "",
  });

  const handleTitleChange = (e) => {
    setAboutUsData((prevData) => ({
      ...prevData,
      title: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    setAboutUsData((prevData) => ({
      ...prevData,
      description: e.editor.getData(),
    }));
  };

  // const handleImageChange = (file) => {
  //   setAboutUsData((prevData) => ({
  //     ...prevData,
  //     imageURL: file,
  //   }));
  // };

  const handleSubmit = async () => {
    const { title, description, imageURL } = aboutUsData;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    // if (imageURL) {
    //   formData.append("image", imageURL);
    // }

    try {
      const response = await fetch(`${BASE_URL}/aboutus-pp-tc`, {
        method: "POST", // Use POST for sending data
        // headers: {
        //   'Accept': '*/*',
        //   'Content-Type': 'application/json',
        // },
        body: formData,
      });

      if (response.ok) {
        showAlert("success", "About Us data is updated");
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
  return (
    <div>
      <Card title="About Us">
        <div className="space-y-5">
            <Textinput
              label="Title"
              id="formatter-pn"
              type="text"
              placeholder=""
              value={title}
              onChange={handleTitleChange}
            />
            <div>
              <label className="form-label" htmlFor="description">Description</label>
              <CKEditor
                data={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="xl:col-span-2 col-span-1">
              <label className="form-label">Upload Banner Image</label>
              {/* <DropZone  onChange={handleImageChange} /> */}
            </div>
            <div className="d-flex justify-content-end text-right">
              <Button text="Save" className="btn-primary " onClick={handleSubmit} />
            </div>
         
        </div>
      </Card>
    </div>
  );
};

export default about_us;
