import React, {useState, useEffect} from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import axios from "axios";
import { BASE_URL } from "../../api/api";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// Modal
import Modal from "@/components/ui/Modal";

// Accordion
import Accordion from "@/components/ui/Accordion";

const Faq = ({ title = "Faq's" }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sequence, setSequence] = useState("");  
  const [faqItems, setFaqItems] = useState([]);
  const [draggedFaq, setDraggedFaq] = useState(null);
  const [validationError, setValidationError] = useState("");

  // Get All Faq's
  useEffect(() => {
    const storedFaqOrder = localStorage.getItem("faqOrder");
    if (storedFaqOrder) {
      setFaqItems(JSON.parse(storedFaqOrder));
    } else {
    const fetchFAQs = async () => {
      const accessToken = localStorage.getItem('accessToken');   
      const headers = {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${accessToken}`, 
        'Content-Type': 'application/json', 
      };
      try {
        const response = await axios.get(`${BASE_URL}/get-allfaq`, {
          headers: headers,
        });
        if (response.status === 200) {
          setFaqItems(response.data.data);
        } else {
          console.error("Failed to fetch FAQs.");
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchFAQs();
   } // Fetch FAQs when the component mounts
  }, []);

  // Save New Faq's
  const handleSequenceChange = (e) => {
    setSequence(e.target.value);
    setSequenceError("");
  };
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    setQuestionError("");
  };  
  const handleAnswerChange = (e) => {
    setAnswer(e.editor.getData());
    setAnswerError("");
  };
  
  const [sequenceError, setSequenceError] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [answerError, setAnswerError] = useState("");

  const handleSubmit = async () => {
    setSequenceError("");
    setQuestionError("");
    setAnswerError("");

    let hasError = false;

    if (sequence.trim() === "") {
      setSequenceError("Sequence field cannot be empty.");
      hasError = true;
    }

    if (question.trim() === "") {
      setQuestionError("Question field cannot be empty.");
      hasError = true;
    }

    if (answer.trim() === "") {
      setAnswerError("Answer field cannot be empty.");
      hasError = true;
    }

    if (hasError) {
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/save-faq`, {
        questionSeqno: sequence,
        question: question,
        answer: answer,
      });

      if (response.status === 200) {
        // FAQ saved successfully
        const newFAQ = {
          questionSeqno: sequence,
          question: question,
          answer: answer,
        };
        setFaqItems([...faqItems, newFAQ]);
        localStorage.setItem("faqOrder", JSON.stringify([...faqItems, newFAQ]));
        // Reset the form fields
        setSequence("");
        setQuestion("");
        setAnswer("");
        
      } else {
        // Handle error cases
        console.error("Failed to save FAQ.");
      }
    } catch (error) {
      console.error("Error saving FAQ:", error);
    }
  };
  
  
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const reorderedFaqs = [...faqItems];

    // Reorder the FAQs in the local state
    const [draggedItem] = reorderedFaqs.splice(startIndex, 1);
    reorderedFaqs.splice(endIndex, 0, draggedItem);

    // Update the FAQ order in the state
    setFaqItems(reorderedFaqs);

    // Save the updated FAQ order to local storage
    localStorage.setItem("faqOrder", JSON.stringify(reorderedFaqs));
  };

  
  const index = 1;
  return (
    <div>
      <Card >
        <div className="lg:flex justify-between items-center mb-6">
          <h4 className="card-title">{title}</h4>
          <div>
          <Modal
            title="Add Faq"
            label="Add New  Faq"
            labelClass="btn-dark btn-sm"
            uncontrol
            className="max-w-5xl"
            centered
            scrollContent            
          >
          <form >
              <div className="mb-4">
                <Textinput
                    label="Sequence Number"
                    id="sequence"
                    type="text"
                    placeholder=""
                    onChange={handleSequenceChange}
                />
                {sequenceError && (
                  <p className="text-red-500 text-right text-xs">{sequenceError}</p>
                )}
              </div>
              <div className="mb-4">                
                <Textinput
                    label="Question"
                    id="question"
                    type="text"
                    placeholder=""
                    onChange={handleQuestionChange}
                />
                {questionError && (
                    <p className="text-red-500 text-right text-xs">{questionError}</p>
                  )}
            </div>
            <div className="mb-4">
              <CKEditor
                data={answer}
                onChange={handleAnswerChange}
              />
              <CKEditor
                id="full-featured-non-premium"
                editor={ClassicEditor}
                data={answer}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setAnswer(data);
                }}
              />
              {answerError && (
                    <p className="text-red-500 text-right text-xs">{answerError}</p>
                  )}
            </div>            
            <div className="fromGroup xl:col-span-2 col-span-1 text-right">
              <Button
                text="Save"
                className="btn-dark"  
                onClick={handleSubmit}              
              />              
            </div>
          </form>
          </Modal>
          </div>
        </div>
        {/* <div className="">
          <Accordion items={items} />
        </div> */}
        
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
                        <Accordion key={`accordion-${item.id}`} items={[
                          {
                            title: `${item.questionSeqno}. ${item.question}`,
                            content: item.answer,
                          },
                        ]} />
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
