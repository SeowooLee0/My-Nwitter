import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import {
  ArrowPathIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CommentsList from "./commentList";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../redux/createSlice/handleIsLogin";
import { RootState } from "../redux/store";

export default function Header() {
  const naviagte = useNavigate();

  const isLogin = useSelector((state: RootState) => state.change.isLogin);

  const dispatch = useDispatch();
  const onLogout = () => {
    axios.get("http://localhost:1234/logout");
    alert("로그아웃 되었습니다");

    dispatch(changeState(false));
  };

  const solutions = [
    {
      name: "Analytics",
      description:
        "Get a better understanding of where your traffic is coming from.",
      href: "#",
      icon: ChartBarIcon,
    },
    {
      name: "Engagement",
      description: "Speak directly to your customers in a more meaningful way.",
      href: "#",
      icon: CursorArrowRaysIcon,
    },
    {
      name: "Security",
      description: "Your customers' data will be safe and secure.",
      href: "#",
      icon: ShieldCheckIcon,
    },
    {
      name: "Integrations",
      description: "Connect with third-party tools that you're already using.",
      href: "#",
      icon: Squares2X2Icon,
    },
    {
      name: "Automations",
      description:
        "Build strategic funnels that will drive your customers to convert",
      href: "#",
      icon: ArrowPathIcon,
    },
  ];
  const callsToAction = [
    { name: "Watch Demo", href: "#", icon: PlayIcon },
    { name: "Contact Sales", href: "#", icon: PhoneIcon },
  ];
  const resources = [
    {
      name: "Help Center",
      description:
        "Get all of your questions answered in our forums or contact support.",
      href: "#",
      icon: LifebuoyIcon,
    },
    {
      name: "Guides",
      description:
        "Learn how to maximize our platform to get the most out of it.",
      href: "#",
      icon: BookmarkSquareIcon,
    },
    {
      name: "Events",
      description:
        "See what meet-ups and other events we might be planning near you.",
      href: "#",
      icon: CalendarIcon,
    },
    {
      name: "Security",
      description: "Understand how we take your privacy seriously.",
      href: "#",
      icon: ShieldCheckIcon,
    },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between  py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="1">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="/assets/twitter.png"
                alt=""
              />
            </a>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group
            as="nav"
            className="hidden space-x-10 md:flex"
          ></Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <button
              onClick={onLogout}
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Logout
            </button>
            <Link
              to={"/profile"}
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent  bg-blue-300  px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Myprofile
            </Link>
            <span className="relative inline-block">
              {/* <svg
                className="w-6 h-6 text-gray-700 fill-current"
                viewBox="0 0 20 20"
              >
                <path
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg> */}
              {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                99
              </span> */}
            </span>
            <CommentsList />
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                    alt="Workflow"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                    >
                      <item.icon
                        className="h-6 w-6 flex-shrink-0 text-indigo-600"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a
                  href="1"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Pricing
                </a>

                <a
                  href="1"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Docs
                </a>
                {resources.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div>
                <a
                  href="1"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Sign up
                </a>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{" "}
                  <a href="1" className="text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
