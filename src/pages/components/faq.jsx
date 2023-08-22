import React from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { useForm, useFieldArray } from "react-hook-form";
import { CKEditor } from 'ckeditor4-react';

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
          <Button
            text="Add new"
            icon="heroicons-outline:plus"
            className="btn-dark"
            onClick={() => append()}
          />
        }
      >
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          {fields.map((item, index) => (
            <div
              className="lg:grid-cols-1 md:grid-cols-1 grid-cols-1 grid gap-5 mb-5 last:mb-0"
              key={index}
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
                <div className="flex-none relative">
                  <button
                    onClick={() => remove(index)}
                    type="button"
                    className="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                  >
                    <Icon icon="heroicons-outline:trash" />
                  </button>
                </div>                
              </div>
              <CKEditor initData="<p>Faq Descriptions</p>" />
            </div>
            
          ))}

          <div className="ltr:text-right rtl:text-left">
            <Button text="Save" className="btn-dark" />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Faq;
