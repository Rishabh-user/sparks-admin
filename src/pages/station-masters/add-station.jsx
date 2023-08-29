import React, {useState} from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Select, { components } from "react-select";
import Swal from 'sweetalert2';
import Flatpickr from "react-flatpickr"


const AddStation = () => { 
  
  const [basic, setBasic] = useState(new Date());

    const connectortype = [
        { value: "SAE J1772 CONNECTOR – TYPE 1", label: "SAE J1772 CONNECTOR – TYPE 1" },
        { value: "MENNEKES CONNECTOR – TYPE 2", label: "MENNEKES CONNECTOR – TYPE 2" },
        { value: "CCS CONNECTOR – TYPE 1", label: "CCS CONNECTOR – TYPE 1" },
      ];
    
    // add vehicle succes message
    const showAlert = () => {
      Swal.fire({
        title: 'Succes',
        text: 'Charging station added successfully',
        icon: 'success',
        confirmButtonText: 'ok!',
      });
    };
  return (
    <div>
      <Card title="Add New Charging Station">
        <div className="space-y-4">
            <Textinput
                label="Station Name"
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
            <div className="grid xl:grid-cols-2  grid-cols-1 gap-5">
              <div>
                <label htmlFor="default-picker" className=" form-label">
                  Open Timing 
                </label>
                <Flatpickr
                    label="Open Time"
                    className="form-control py-2"
                    value={basic}
                    id="timepicker"
                    options={{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: "H:i",
                      time_24hr: true,
                    }}
                    onChange={(date) => setBasic(date)}
                  />
                </div> 
                <div>
                  <label htmlFor="default-picker" className=" form-label">
                    Close Timing 
                  </label>
                  <Flatpickr
                      label="Open Time"
                      className="form-control py-2"
                      value={basic}
                      id="timepicker"
                      options={{
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: "H:i",
                        time_24hr: true,
                      }}
                      onChange={(date) => setBasic(date)}
                    />
                  </div>             
            </div>
            <Textinput
                label="Mobile Number"
                id="v_name"
                type="number"
                placeholder=""
            />
            <Textarea label="Station Address" id="pn4" placeholder="address" row="5" />        
            <div className="space-y-4 text-end">           
                <Button text="Add" className="btn-dark" onClick={showAlert} />
            </div>
        </div>
      </Card>
    </div>
  );
};

export default AddStation;
