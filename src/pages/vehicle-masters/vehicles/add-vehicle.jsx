import React from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import DropZone from "../../forms/file-input/DropZone";
import Button from "@/components/ui/Button";
import Select, { components } from "react-select";
import Swal from 'sweetalert2';

const AddVehicle = () => { 
    const connectortype = [
        { value: "SAE J1772 CONNECTOR – TYPE 1", label: "SAE J1772 CONNECTOR – TYPE 1" },
        { value: "MENNEKES CONNECTOR – TYPE 2", label: "MENNEKES CONNECTOR – TYPE 2" },
        { value: "CCS CONNECTOR – TYPE 1", label: "CCS CONNECTOR – TYPE 1" },
      ];
    const brands = [
      { value: "Tata", label: "Tata" },
      { value: "Mahendra", label: "Mahendra" },
      { value: "KIA", label: "KIA" },
      { value: "MG", label: "MG" },
      { value: "Hyndui", label: "Hyndui" },
    ];
    const vehicletype = [
      { value: "2 Wheeler", label: "2 wheeler" },
      { value: "3 Wheeler", label: "3 wheeler" },
      { value: "4 Wheeler", label: "4 wheeler" },
    ];
    // add vehicle succes message
    const showAlert = () => {
      Swal.fire({
        title: 'Succes',
        text: 'Vehicle added successfully',
        icon: 'success',
        confirmButtonText: 'ok!',
      });
    };
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
          <div className="fromGroup">
            <label className="form-label" htmlFor="mul_1">
                Select Connector Type
            </label>
            <Select
                isClearable={true}
                defaultValue={[connectortype[0], connectortype[2]]}
                isMulti
                name="connectortype"
                options={connectortype}
                className="react-select"
                classNamePrefix="select"
                id="mul_1"
            />            
          </div>
          <div className="fromGroup">
              <label className="form-label" htmlFor="brands_1">
                  Select Brand
              </label>
              <Select      
                name="brands"
                options={brands}
                className="react-select"
                classNamePrefix="select"
                id="brands_1"
              />
          </div>
          <div className="fromGroup">
              <label className="form-label" htmlFor="brands_1">
                  Select Vehicle Type
              </label>
              <Select      
                name="vehicletype"
                options={vehicletype}
                className="react-select"
                classNamePrefix="select"
                id="vehicletype_1"
              />
          </div>
          <div className="fromGroup xl:col-span-2 col-span-1">
            <label className="form-label">Upload Vehicle Image</label>
            <DropZone />
          </div>          
          <div className="space-y-4 text-end">           
            <Button text="Add" className="btn-dark" onClick={showAlert} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AddVehicle;
