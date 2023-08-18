import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
//import Textarea from "@/components/ui/Textarea";
// import Select from "@/components/ui/Select";
const about_us = () => {

    const errorMessage = {
        message: "This is invalid state",
      };
      const [value, setValue] = useState("");
    
      const handleFormatter = (e) => {
        const value = e.target.value;
        setValue(value);
      };

  return (
    <div>
      <Card title="About Us">
        <div className="space-y-5">
        <Textinput
            label="Text input with formatter (on input)"
            id="formatter-pn"
            type="text"
            placeholder="Enter your name"
            description="We will convert your name to lowercase instantly"
            onChange={handleFormatter}
          />
          {value.toLowerCase()}
        </div>
      </Card>
    </div>
  );
};

export default about_us;
