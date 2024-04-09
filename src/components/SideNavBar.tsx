"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BiDollar, BiHomeAlt } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { SiSimpleanalytics } from "react-icons/si";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openDrawer, closeDrawer } from "@/lib/features/drawer";
import { GrCatalog } from "react-icons/gr";
import { PiUsersThree } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";

const menuItems = [
  {
    title: "Dashboard",
    link: "/home",
    icon: <BiHomeAlt />,
    children: [],
  },
  {
    title: "Catalog",
    link: "#",
    icon: <GrCatalog />,
    children: [
      {
        title: "Product List",
        link: "/catalog/products",
      },
      {
        title: "New Product",
        link: "/catalog/products/add",
      },
    ],
  },
  {
    title: "Sales",
    link: "#",
    icon: <BiDollar />,
    children: [
      {
        title: "Order Listing",
        link: "/sales/orders",
      },
    ],
  },
  {
    title: "Customers",
    link: "#",
    icon: <PiUsersThree />,
    children: [
      {
        title: "Customer Listing",
        link: "/customers/list",
      },
    ],
  },
  {
    title: "Reports",
    link: "#",
    icon: <SiSimpleanalytics />,
    children: [
      {
        title: "Sales",
        link: "/reports/sales",
      },
      {
        title: "Products",
        link: "/reports/products",
      },
      {
        title: "Returns",
        link: "/reports/returns",
      },
      {
        title: "Customer Orders",
        link: "/reports/customer-orders",
      },
    ],
  },
  {
    title: "Settings",
    link: "#",
    icon: <FiSettings />,
    children: [
      {
        title: "My Profile",
        link: "/settings/profile",
      },
      {
        title: "Users",
        link: "/settings/users",
      },
    ],
  },
];

const SideNavBar: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const drawerState = useAppSelector((state) => state.drawer);
  const pathname = usePathname();
  const [openedMenu, setOpenedMenu] = React.useState({
    title: "",
    isOpen: false,
  });

  React.useEffect(() => {
    const selected = menuItems.find((item) =>
      item.children.some((ch) => pathname?.includes(ch.link))
    );
    if (selected) {
      dispatch(openDrawer());
      setOpenedMenu({
        title: selected?.title!,
        isOpen: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
        dispatch(closeDrawer());
      } else {
        dispatch(openDrawer());
      }
    });
    return () => window.removeEventListener("resize", () => {});
  }, [dispatch]);

  React.useEffect(() => {
    if (window.innerWidth <= 768) {
      dispatch(closeDrawer());
    } else {
      dispatch(openDrawer());
    }
  }, [dispatch]);

  return (
    <nav
      id="side-nav"
      className={`h-screen bg-[#1e1e2d] duration-300 z-50 ${
        drawerState.open ? "w-72" : "w-20"
      } shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)]`}
    >
      <div className="items-center text-white border-b-[0.5px] border-b-gray-400 flex h-[75px] mb-5">
        <Image
          src="/assets/images/dlogo.png"
          className={`mr-2 w-9 ${
            drawerState.open && "rotate-[360deg]"
          } duration-500 ml-5`}
          alt="TE Logo"
          draggable="false"
          width={30}
          height={30}
        />
        <h1 className={`${!drawerState.open && "scale-0"} duration-300`}>
          Delighted Beauty
        </h1>
      </div>
      <div className="px-[0.2rem] pb-12 overflow-y-scroll h-menu-height hide-scroll-bar">
        {menuItems.map((menu, index) => (
          <React.Fragment key={index}>
            <Link
              href={menu.link}
              className={`flex p-3 hover:text-white hover:bg-[#2a2a3c] hover:font-bold rounded ${
                pathname?.includes(menu.link)
                  ? "bg-[#2a2a3c] text-white text-base font-bold border-l-4 border-l-white"
                  : openedMenu.title === menu.title
                  ? "text-white text-base font-bold border-l-4 border-l-white"
                  : "text-gray-400"
              } ${menu.title === "Dashboard" ? "mb-2" : ""}`}
              onClick={(event) => {
                if (menu.children.length > 0) {
                  event.preventDefault();
                  if (openedMenu.isOpen) {
                    setOpenedMenu((prevState) => ({
                      ...prevState,
                      isOpen: false,
                    }));
                  }
                  if (openedMenu.isOpen && menu.title === openedMenu.title) {
                    return setOpenedMenu((prevState) => ({
                      ...prevState,
                      isOpen: false,
                    }));
                  }
                  return setOpenedMenu((prevState) => ({
                    title: menu.title,
                    isOpen: !prevState.isOpen,
                  }));
                }
              }}
            >
              <span className="mr-3 text-xl">{menu.icon}</span>
              <span
                className={`${
                  !drawerState.open && "scale-0"
                } duration-300 text-base flex-1`}
              >
                {menu.title}
              </span>
              {menu.children.length > 0 && drawerState.open && (
                <IoIosArrowDown
                  className={`${
                    openedMenu.title === menu.title &&
                    openedMenu.isOpen &&
                    "rotate-180"
                  }`}
                />
              )}
            </Link>
            {menu.children.length > 0 &&
              drawerState.open &&
              openedMenu.title === menu.title &&
              openedMenu.isOpen && (
                <div className="duration-300">
                  {menu.children.map((item, pos) => (
                    <Link
                      href={item.link}
                      key={pos}
                      className={`flex py-3 hover:text-white hover:bg-[#2a2a3c] hover:font-bold rounded pl-14 mb-2 ${
                        pathname?.substring(pathname?.lastIndexOf("/")) ===
                        item.link.substring(item.link.lastIndexOf("/"))
                          ? "bg-[#2a2a3c] text-white text-base font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <GoDotFill />
                        <div>{item.title}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default SideNavBar;
