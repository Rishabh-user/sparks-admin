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

const AboutUs = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // Store the selected image file
  const [imageUrl, setImageUrl] = useState("");
  const [dataLoaded, setDataLoaded] = useState("false");
 // const [isEditMode, setIsEditMode] = useState(true); // State variable to control edit mode
  

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('Access token not found.');
      setIsLoading(false);
      return;
    } 
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getaboutus-pp-tc?type=aboutus`, {
          headers: {
            
            'Authorization': `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.status !== 200) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
  
        const data = response.data.data;
        setTitle(data.title);
        setDescription(data.description);
        setImageUrl(data.imageUrl);
        setDataLoaded(true);
        //console.log(data.imageUrl);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchData();
  }, []);

  
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

  const handleSubmit = async () => {
    try {
      if (!selectedFile) {
        showAlert("error", "Please select an image");
        return;
      }

      // Upload the image first
      const formData = new FormData();
      formData.append("file", selectedFile);

      const imageUploadResponse = await fetch(`${BASE_URL}/upload-image/aboutus`, {
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
        type: "aboutus",
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
        showAlert("success", "About Us data is updated");
      } else {
        showAlert("error", "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
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
                setDescription("description", data);
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
              onChange={handleImageChange}
            />             
          </div>          
          <div className="d-flex justify-content-end text-right">
            <Button text="Save" className="btn-primary" onClick={handleSubmit} />
         
          </div>          
        </div>      
      </Card>
    </div>
  );
};

export default AboutUs;
