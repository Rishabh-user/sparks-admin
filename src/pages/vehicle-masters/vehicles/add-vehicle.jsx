import React from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import DropZone from "../../forms/file-input/DropZone";
import Button from "@/components/ui/Button";
import Select, { components } from "react-select";

const AddVehicle = () => { 
    const vehicletype = [
        { value: "2 Wheeler", label: "2 Wheeler" },
        { value: "3 Wheeler", label: "3 Wheeler" },
        { value: "4 Wheeler", label: "4 Wheeler" },
      ];
    
  return (
    <div>
      <Card title="Add New Vehicle">
        <div className="space-y-4">
          <Textinput
            label="Vehicle name"
            id="v_name"
            type="text"
            placeholder=""
          />
          <div>
            <label className="form-label" htmlFor="mul_1">
                Select Vehicle Type
            </label>
            <Select
                isClearable={false}
                defaultValue={[vehicletype[0], vehicletype[2]]}
                isMulti
                name="vehicletype"
                options={vehicletype}
                className="react-select"
                classNamePrefix="select"
                id="mul_1"
            />
        </div>
          <div className="xl:col-span-2 col-span-1">
            <label className="form-label">Upload Brand Logo</label>
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

export default AddVehicle;
