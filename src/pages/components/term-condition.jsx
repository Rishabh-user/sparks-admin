import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
//import Textarea from "@/components/ui/Textarea";
// import Select from "@/components/ui/Select";
import { CKEditor } from 'ckeditor4-react';
import DropZone from "../forms/file-input/DropZone";
import Button from "@/components/ui/Button";

const TermsConditions = () => {
      const [value, setValue] = useState("");
    
      const handleFormatter = (e) => {
        const value = e.target.value;
        setValue(value);
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
              onChange={handleFormatter}
            />
            <div>
              <label className="form-label" for="description">Description</label>
              <CKEditor initData="<p>This is an example CKEditor 4 WYSIWYG editor instance.</p>" />
            </div>
            <div className="xl:col-span-2 col-span-1">
              <label className="form-label">Upload Banner Image</label>
              <DropZone />
          </div>
          <div className="d-flex justify-content-end text-right">
            <Button text="Save" className="btn-primary " />
          </div>
          {value.toLowerCase()}
        </div>
      </Card>
    </div>
  );
};

export default TermsConditions;
