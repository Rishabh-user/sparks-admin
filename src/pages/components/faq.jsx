import React, {useState, useEffect} from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CKEditor } from 'ckeditor4-react';
import axios from "axios";

// Modal
import Modal from "@/components/ui/Modal";

// Accordion
import Accordion from "@/components/ui/Accordion";


const Faq = ({ items }) => {
  const [faqItems, setFaqItems] = useState([
    {
      number: 1,
      title: 'qwerty',
      description: 'qwerty123',
    },
  ]);
  const [accordionData, setAccordionData] = useState([]);
  const { register, control, handleSubmit, reset, trigger, setError } = useForm({
    defaultValues: {
      test: [{ title: "Faq Title", description: "Faq Description" }],
    },
  });
  useEffect(() => {
    // Replace 'API_URL' with your API endpoint URL
    axios.get('http://ec2-3-6-158-164.ap-south-1.compute.amazonaws.com:8080/api/admin/v1/get-allfaq')
      .then((response) => {
        
        setAccordionData(response.data.data); // Assuming your API returns an array of objects
        console.log(accordionData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleFormSubmit = async (data, { setValue }) => {
    const newFaq = {
      number: faqItems.length + 1,
      question: data.test[0].title || "", 
      answer: data.test[0].description || "", 
    };
  
    // You can add validation here before adding the new FAQ
    if (!newFaq.question || !newFaq.answer) {
      setError("test[0].title", {
        type: "manual",
        message: "Question and answer are required.",
      });
      return;
    }
  
    // Update FAQ items
    setFaqItems((prevItems) => [...prevItems, newFaq]);

    setValue("test[0].description", "", { shouldDirty: true });
    // Reset form after submission
    await reset({
      test: [{ title: "", description: "" }],
    });
  };
  
  
  const onDragEnd = (result) => {
    // Handle drag-and-drop end
    if (!result.destination) {
      return;
    }
  };

  
  const index = 1;
  return (
    <div>
      <Card
        title="FAQ's"
        headerslot={
          <Modal
            title="Add New FAQ's"
            label="Add FAQ's"
            labelClass="btn-dark btn-sm"
            uncontrol
            className="max-w-5xl"
            centered
            scrollContent
            footerContent={
              <Button
                text="close"
                className="btn-dark "
              />
            }
          >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="lg:grid-cols-1 md:grid-cols-1 grid-cols-1 grid gap-5 mb-5 last:mb-0">
                <div className="flex justify-between items-end space-x-5">
                  <div className="flex-1">
                    <Textinput
                      label="Question"
                      type="text"
                      placeholder="Title"
                      register={register}
                      name="test[0].title"
                    />
                  </div>
                </div>
                <div className="fromGroup">
                  <label className="form-label">Answer</label>
                  <Controller
                    name={`test[0].description`}
                    control={control}
                    defaultValue={faqItems[0].answer} // Set the defaultValue from the faqItems state
                    render={({ field }) => (
                      <CKEditor
                        data={field.value}
                        onChange={(event) => field.onChange(event.editor.getData())}
                      />
                    )}
                  />
                </div>
                <div className="fromGroup text-end">
                  <Button type="submit" text="Save" className="btn-primary btn-sm" />
                </div>
              </div>
            </form>
          </Modal>
        }
      >
        {/* <div className="">
          <Accordion items={items} />
        </div> */}
        <Accordion items={accordionData} />
        <div>
            {items.map((item, index) => (
            <div key={index}>
              <div>{item.data.question}</div>
              <div>{item.data.answer}</div>
            </div>
          ))}
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                { faqItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id ? item.id.toString() : `item-${index}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        
                      </div>
                    )}
                  </Draggable>
                  )                
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

      </Card>
      

    </div>
  );
};

export default Faq;
