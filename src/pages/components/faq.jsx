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


const Faq = () => {
  const [faqItems, setFaqItems] = useState([
    {
      number: 1,
      title: 'qwerty',
      description: 'qwerty123',
    },
  ]);
  const { register, control, handleSubmit, reset, trigger, setError } = useForm({
    defaultValues: {
      test: [{ title: "Faq Title", description: "Faq Description" }],
    },
  });
  const fetchFAQsFromAPI = async () => {
    const accessToken = localStorage.getItem('accessToken');   
    const headers = {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${accessToken}`, 
      'Content-Type': 'application/json', 
    };
    try {
      const response = await axios.get('http://ec2-3-6-158-164.ap-south-1.compute.amazonaws.com:8080/api/admin/v1/get-allfaq', {
        headers: headers,
      });
      return response.data.data; // Assuming the FAQs are in response.data.data
      
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      return []; // Return an empty array in case of an error
    }
  };

  const fetchFAQs = async () => {
    const fetchedFAQs = await fetchFAQsFromAPI();
    
    setFaqItems(fetchedFAQs.data);
    console.log(fetchedFAQs);
  };

  useEffect(() => {
    fetchFAQs(); // Fetch FAQs when the component mounts
  }, []);

  const handleFormSubmit = async (data, { setValue }) => {
    const newFaq = {
      number: faqItems.length + 1,
      title: data.test[0].title || "",
      description: data.test[0].description || "",
    };
  
    // You can add validation here before adding the new FAQ
    if (!newFaq.title || !newFaq.description) {
      setError("test[0].title", {
        type: "manual",
        message: "Title and description are required.",
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
            {/* <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                      name={`test[${0}].description`} // Use backticks for template literal
                      control={control}
                      defaultValue={faqItems[0].description} // Set the defaultValue from the faqItems state
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
            </form> */}
          </Modal>
        }
      >
        {/* <div className="">
          <Accordion items={items} />
        </div> */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {faqItems && faqItems.length > 0 ? (
                  faqItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id ? item.id.toString() : `item-${index}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Accordion items={[
                            {
                              title: `${item?.questionSeqno || ''}. ${item?.question || ''}`,
                              description: item?.answer || '',
                            },
                          ]} />
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <p>No FAQs available.</p>
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
