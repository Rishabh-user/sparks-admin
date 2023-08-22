import React from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import DropZone from "../../forms/file-input/DropZone";
import Button from "@/components/ui/Button";


const AddVehicleType = () => { 
 
  return (
    <div>
      <Card title="Add New Vehicle Type">
        <div className="space-y-4">
          <Textinput
            label="Vehicle name"
            id="v_name"
            type="text"
            placeholder=""
          />
          <div className="xl:col-span-2 col-span-1">
            <label className="form-label">Upload Vehicle Icon</label>
            <DropZone />
          </div>          
          <div className="space-y-4 text-end">           
            <Button text="Add" className="btn-dark" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AddVehicleType;
