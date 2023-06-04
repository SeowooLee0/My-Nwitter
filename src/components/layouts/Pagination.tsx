/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  changeCurrentPage,
  setPageCount,
} from "../../redux/createSlice/GetDataSlice";
import { RootState } from "../../redux/store";

const Pagination = ({ count }: any) => {
  const pageNumber = [];
  const dispatch = useDispatch();
  const postPerPage = 10;
  const queryClient = useQueryClient();

  const data: any = queryClient.getQueryData(["selectData"]);

  const currentPage = useSelector(
    (state: RootState) => state.getData.currentPage
  );

  for (let i = 1; i <= Math.ceil(count / postPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className="flex justify-items-center border-t   ">
      <div className="flex flex-1 w-full justify-center ">
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          {pageNumber.map((number) => (
            <div
              aria-current="page"
              className="relative inline-flex items-center border rounded-lg border-gray-300  bg-white px-4 py-2 text-sm  font-bold font-mono text-gray-500 hover:bg-gray-50 focus:z-20"
              key={number}
              onClick={() => {
                dispatch(changeCurrentPage(number));
                console.log(number);
                queryClient.invalidateQueries(["selectExploreData"]);
              }}
            >
              {number}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};
export default Pagination;
