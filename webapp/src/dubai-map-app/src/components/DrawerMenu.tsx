import { useState, useEffect } from "react";
import { Menu } from "../utils/api/menuService";

interface DrawerMenuProps {
  menuItems: Menu[];
}

function DrawerMenu({ menuItems }: DrawerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > lastScrollTop) {
        closeDrawer();
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <>
      {/* Menu Button */}
      <button
        className="nav-menuBtn md:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
        onClick={openDrawer}
      >
        <span className="w-full h-0.5 bg-white"></span>
        <span className="w-full h-0.5 bg-white"></span>
        <span className="w-full h-0.5 bg-white"></span>
      </button>

      {/* Overlay */}
      {isOpen && <div className="overlay show" onClick={closeDrawer}></div>}

      {/* Drawer */}
      <div
        className={`drawer bg-white fixed top-0 ${
          isOpen ? "left-0" : "left-[-250px]"
        } w-[250px] h-screen bg-white text-black transition-[left] duration-300 ease-in-out p-[20px] z-999`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="nav-menuBtnClose" onClick={closeDrawer}>
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#1C274C"
              strokeWidth="1"
            ></circle>
            <path
              d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
        <div className="space-y-4 text-xl mt-16">
          {menuItems.map((menuItem, index) => (
            <a
              key={index}
              className={`menu hover:text-gray-300 hover:-skew-x-12 hover:scale-110 ${menuItem.cssClassName}`}
              href={menuItem.url}
            >
              {menuItem.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default DrawerMenu;
