import React, {useState, useEffect } from "react";
import Icon from "@/components/ui/Icon";

const Badge = (
  //{
  // className = "bg-danger-500 text-white",
  // label,
  // icon,
  // children,
  //}
) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect( () => {
    const accessToken = localStorage.getItem('accessToken');
    const fetchData = async () => {
  try {
const response = await fetch(
    "http://ec2-3-6-158-164.ap-south-1.compute.amazonaws.com:8080/api/admin/v1/get-allfaq",
    {
  headers: { "Authorization": `Bearer ${accessToken}` }
    }
);
if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
}
const data = await response.json();
console.log(data.data);
setData(data.data);
  } catch (error) {
            console.log(error.message);
  }
    };
    if (accessToken) {
        fetchData();
    }
}, []);
  return (
    // <span className={`badge ${className}`}>
    //   {!children && (
    //     <span className="inline-flex items-center">
    //       {icon && (
    //         <span className="inline-block ltr:mr-1 rtl:ml-1">
    //           <Icon icon={icon} />
    //         </span>
    //       )}
    //       {label}
    //     </span>
    //   )}
    //   {children && <span className="inline-flex items-center">{children}</span>}
    // </span>
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <strong>Question: </strong> {item.question}<br />
              <strong>Answer: </strong> {item.answer}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Badge;
