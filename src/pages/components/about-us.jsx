import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Fileinput from "@/components/ui/Fileinput";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "@/components/ui/Button";
import Swal from 'sweetalert2';
import { BASE_URL } from "../../api/api";

const AboutUs = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // Store the selected image file
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Fetch the initial data from the GET API
    fetch(`${BASE_URL}/getaboutus-pp-tc?type=aboutus`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .then((data) => {
        // Populate the fields with the data from the GET request
        setTitle(data.data.title);
        setDescription(data.data.description);
        // You may need to set selectedFile based on the image URL if needed
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        showAlert("error", "Failed to fetch data");
      });
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.editor.getData());
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
        imageURL: imageUploadData.data.url, 
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

  if (!dataLoaded) {
    // Display a loading indicator while data is being fetched
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Card title="About Us">
        <div className="space-y-5">
          <Textinput
            label="Title"
            id="formatter-pn"
            type="text"
            placeholder=""
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
              selectedFile={selectedFile}
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