import React from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { useForm, useFieldArray } from "react-hook-form";
import { CKEditor } from 'ckeditor4-react';

// Modal
import Modal from "@/components/ui/Modal";

// Accordion
import Accordion from "@/components/ui/Accordion";
const items = [
  {
    title: "How does Dashcode work?",
    content:
      "Jornalists call this critical, introductory section the  and when bridge properly executed, it's the that carries your reader from anheadine try at attention-grabbing to the body of your blog post.",
  },
  {
    title: "Where i can learn more about using Dashcode?",
    content:
      "Jornalists call this critical, introductory section the  and when bridge properly executed, it's the that carries your reader from anheadine try at attention-grabbing to the body of your blog post.",
  },
  {
    title: "Why Dashcode is so important?",
    content:
      "Jornalists call this critical, introductory section the  and when bridge properly executed, it's the that carries your reader from anheadine try at attention-grabbing to the body of your blog post.",
  },
];

const Faq = () => {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      defaultValues: {
        test: [{ title: "Faq Title", description: "Faq Description" }],
      },
    }
  );
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });
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
                text="Accept"
                className="btn-dark "
                onClick={() => {
                  alert("use Control Modal");
                }}
              />
            }
          >
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <div
                  className="lg:grid-cols-1 md:grid-cols-1 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                >
                <div className="flex justify-between items-end space-x-5">
                  <div className="flex-1">
                    <Textinput
                      label="Title"
                      type="text"
                      id={`name${index}`}
                      placeholder="Title"
                      register={register}
                      name={`test[${index}].title`}
                    />
                  </div>               
                </div>
                <CKEditor initData="<p>Faq Descriptions</p>" />
              </div>
            </form>
          </Modal>
        }
      >
        <div className="">
          <Accordion items={items} />
        </div>
      </Card>

    </div>
  );
};

export default Faq;
