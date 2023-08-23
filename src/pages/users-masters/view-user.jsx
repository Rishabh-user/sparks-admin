import React from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import BasicArea from "../chart/appex-chart/BasicArea";
// import images
import ProfileImage from "@/assets/images/users/user-1.jpg";
const rows = [
    {
      vehiclename: "Tata Nexon EV",
      range: "312 to 437 KM",
      battery: "30.2 - 40.5 kWh 320V lithium polymer",
      transmission: "1-speed automatic",
      horsepower: "95 to 105 Kw"
    },
  ];
const ViewUser = () => {
  return (
    <div>
      <div className="space-y-5 profile-page">
        <div className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
          <div className="bg-sparks-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"></div>
          <div className="profile-box flex-none md:text-start text-center">
            <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
              <div className="flex-none">
                <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                  <img
                    src={ProfileImage}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                  Saryu Sirohi
                </div>
              </div>
            </div>
          </div>

          <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
            <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                Selected Language
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                <span className="menu-badge me-2">English</span> 
                <span className="menu-badge me-2">Hindi</span> 
              </div>
            </div>

            {/* <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                Vehicle List
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
              <span className="menu-badge me-2">Bike</span> 
              <span className="menu-badge me-2">Car</span>
              </div>
            </div> */}

          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-12 col-span-12">
            <Card title="Info">
              <ul className="grid grid-cols-12 gap-6 list">
                <li className="lg:col-span-4 col-span-12 flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:envelope" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      EMAIL
                    </div>
                    <a
                      href="mailto:saryu@targeticon.com"
                      className="text-base text-slate-600 dark:text-slate-50"
                    >
                      saryu@targeticon.com
                    </a>
                  </div>
                </li>

                <li className="lg:col-span-4 col-span-12 flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:phone-arrow-up-right" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      PHONE
                    </div>
                    <a
                      href="tel:9876543210"
                      className="text-base text-slate-600 dark:text-slate-50"
                    >
                      +91-9876543210
                    </a>
                  </div>
                </li>

                <li className="lg:col-span-4 col-span-12 flex  space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:map" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      LOCATION
                    </div>
                    <div className="text-base text-slate-600 dark:text-slate-50">
                      Home# 320/N, Road# 71/B, Mohakhali, Dhaka-1207, Bangladesh
                    </div>
                  </div>
                </li>
              </ul>
            </Card>
          </div>          
        </div>
        <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-12 col-span-12">
                <Card title="Vehicle List" className="mb-3">
                <div className="table-responsive">
                    <table className="w-full border-collapse dark:border-slate-700 dark:border">
                        <tr>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left"
                        >
                            <span className="block px-6 py-5 font-semibold">Vehicle Name</span>
                        </th>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                            <span className="block px-6 py-5 font-semibold">Range</span>
                        </th>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                            <span className="block px-6 py-5 font-semibold">Battery</span>
                        </th>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                            <span className="block px-6 py-5 font-semibold">Transmission</span>
                        </th>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                            <span className="block px-6 py-5 font-semibold">Horsepower</span>
                        </th>
                        </tr>
                        {rows.map((data, index) => (
                        <tr
                            key={index}
                            className="border-b border-slate-100 dark:border-slate-700"
                        >
                            <td
                            className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4"
                            >
                                {data.vehiclename}
                            </td>
                            <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                                {data.range}
                            </td>
                            <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                                {data.battery}
                            </td>
                            <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                                {data.transmission}
                            </td>
                            <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                                {data.horsepower}
                            </td>
                        </tr>
                        ))}
                    </table>
                </div>
                </Card>
                <Card title="Charging Sessions">
                <div className="table-responsive">
                    <table className="w-full border-collapse dark:border-slate-700 dark:border">
                        <tr>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left"
                        >
                            <span className="block px-6 py-5 font-semibold">Vehicle Name</span>
                        </th>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                            <span className="block px-6 py-5 font-semibold">Range</span>
                        </th>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                            <span className="block px-6 py-5 font-semibold">Battery</span>
                        </th>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                            <span className="block px-6 py-5 font-semibold">Transmission</span>
                        </th>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                            <span className="block px-6 py-5 font-semibold">Horsepower</span>
                        </th>
                        </tr>
                        {rows.map((data, index) => (
                        <tr
                            key={index}
                            className="border-b border-slate-100 dark:border-slate-700"
                        >
                            <td
                            className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4"
                            >
                                {data.vehiclename}
                            </td>
                            <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                                {data.range}
                            </td>
                            <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                                {data.battery}
                            </td>
                            <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                                {data.transmission}
                            </td>
                            <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                                {data.horsepower}
                            </td>
                        </tr>
                        ))}
                    </table>
                </div>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
};


export default ViewUser;
