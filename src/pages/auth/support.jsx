import React, {useState} from "react";
import Card from "@/components/ui/Card";
import SimpleBar from "simplebar-react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import Badge from "@/components/ui/Badge";

import ComposeEmail from "../app/email/ComposeEmail";
import Emails from "../app/email/Emails";
import ListLoading from "@/components/skeleton/ListLoading";


import EmailHeader from "../app/email/EmailHeader";

import EmailDetails from "../app/email/EmailDetails";
const Support = () => {
  const dispatch = useDispatch();

  const { emails, search, filter, singleModal } =
    useSelector((state) => state.email);

const [isLoading, setLoading] = useState(false);
  const filteredEmails = emails
    .filter((email) => {
      if (search) {
        return email.title.toLowerCase().includes(search.toLowerCase());
      }
      return true;
    })
 
  return (
    <>
      <ToastContainer />

      <div className="flex md:space-x-5 app_height overflow-hidden relative rtl:space-x-reverse">
       
        <div className="flex-1 md:w-[calc(100%-320px)]">
          <Card bodyClass="p-0  h-full relative" className="h-full">
            <EmailHeader
              onChange={(e) => dispatch(setSearch(e.target.value))}
              emails={filteredEmails}
            />
            <SimpleBar className="h-full all-todos overflow-x-hidden">
              {isLoading && <ListLoading count={filteredEmails.length} />}
              {!isLoading && (
                <ul className="divide-y divide-slate-100 dark:divide-slate-700 -mb-6 h-full">
                  {filteredEmails.map((email, i) => (
                    <Emails email={email} key={i} />
                  ))}
                  {filteredEmails.length === 0 && (
                    <li className="mx-6 mt-6">
                      <Badge
                        label="No Result Found"
                        className="bg-danger-500 text-white w-full block text-start"
                      />
                    </li>
                  )}
                </ul>
              )}
            </SimpleBar>
            {singleModal && <EmailDetails />}
          </Card>
        </div>
      </div>
      <ComposeEmail />
    </>
  );
};

export default Support;
