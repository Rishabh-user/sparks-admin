import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Fileinput from "@/components/ui/Fileinput";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "@/components/ui/Button";
import Swal from 'sweetalert2';
import { BASE_URL } from "../../api/api";
import axios from 'axios';

const TermsConditions = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // Store the selected image file
  const [imageUrl, setImageUrl] = useState("");
  const [dataLoaded, setDataLoaded] = useState("false");
  const [isEditMode, setIsEditMode] = useState(false); // State variable to control edit mode
  
  const buttonText = isEditMode ? "Save" : "Edit";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getaboutus-pp-tc?type=termncondition`);
  
        if (response.status !== 200) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
  
        const data = response.data.data;
        setTitle(data.title);
        setDescription(data.description);
        setImageUrl(data.imageUrl);
        setDataLoaded(true);
        setIsEditMode(false);
        console.log(data.imageUrl);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchData();
  }, []);

  const data = dataLoaded;
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.editor.getData());
  };

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);

    const url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);

  };
  
  const handleEditClick = () => {
    setIsEditMode(true); // Set edit mode to true when "Edit" button is clicked
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

      const imageUploadResponse = await fetch(`${BASE_URL}/upload-image/termncondition`, {
        method: "POST",
        body: formData,
      });

      if (!imageUploadResponse.ok) {
        showAlert("error", "Image upload failed");
        return;
      }

      const imageUploadData = await imageUploadResponse.json();

      // Then submit the rest of the data including the image URL
      const data = {
        type: "termncondition",
        title: title,
        description: description,
        imageURL: imageUploadData.data.url, // Use the URL from the image upload response
      };

      const response = await fetch(`${BASE_URL}/aboutus-pp-tc`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        showAlert("success", "Term & Conditions data is updated");
        setIsEditMode(false);
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
      <Card title="Terms & Conditions">      
        <div className="space-y-5">         
          <Textinput
            label="Title"
            id="formatter-pn"
            type="text"
            placeholder=""
            readonly={!isEditMode && dataLoaded && title !== ""} // Set readOnly based on edit mode
            value={title}
            defaultValue={title}            
            onChange={handleTitleChange}
          />         
          <div>
            <label className="form-label" htmlFor="description">Description</label>
            <CKEditor
              data={description}
              onChange={handleDescriptionChange}
            />
            <CKEditor
              id="full-featured-non-premium"
              editor={ClassicEditor}
              data={description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
          </div>
          <div className="xl:col-span-2 col-span-1">
            <label className="form-label">Upload Banner Image</label>            
            <Fileinput
              name="basic"
              type="url"
              value={imageUrl}
              defaultValue={imageUrl}
              selectedFile={selectedFile}
              placeholder={imageUrl}
              readonly={!isEditMode || !dataLoaded} // Set readOnly based on edit mode
              onChange={handleImageChange}
            />             
          </div>          
          <div className="d-flex justify-content-end text-right">
            {dataLoaded ? (
                isEditMode ? (
                  <Button text="Save" className="btn-primary" onClick={handleSubmit} />
                ) : (
                  <Button text={title || description || imageUrl ? "Edit" : "Save"} className="btn-primary" onClick={handleEditClick} />
                )
              ) : null}
          </div>          
        </div>      
      </Card>
    </div>
  );
};

export default TermsConditions;
