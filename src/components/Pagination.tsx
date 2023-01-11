/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeCurentPage } from "../redux/createSlice/GetDataSlice";
import { RootState } from "../redux/store";

const Pagination = () => {
  const pageNumber = [];
  const dispatch = useDispatch();
  const postPerPage = useSelector(
    (state: RootState) => state.getData.postPerPage
  );
  const getTotalPosts = useSelector(
    (state: RootState) => state.getData.totalPosts
  );
  console.log(getTotalPosts);
  for (let i = 1; i <= Math.ceil(getTotalPosts / postPerPage); i++) {
    pageNumber.push(i);
    console.log(pageNumber);
  }

  return (
    <div className="flex justify-items-center border-t border-gray-200 bg-white  ">
      <div className="flex flex-1 w-full justify-center ">
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          {/* <a
            href="3"
            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </a> */}

          {pageNumber.map((number) => (
            <div
              aria-current="page"
              className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              key={number}
              onClick={() => {
                console.log(number);
                dispatch(changeCurentPage(number));
              }}
            >
              {number}
            </div>
          ))}
          {/* <a
            href="2"
            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </a> */}
        </nav>
      </div>
    </div>
  );
};
export default Pagination;
