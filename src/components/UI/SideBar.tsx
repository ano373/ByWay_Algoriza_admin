import { NavLink } from "react-router-dom";
import logo from "../assets/ByWay-Logo.svg";
import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { BsCollection } from "react-icons/bs";

const navItems = [
  { to: "/", label: "Dashboard", icon: <FaHome size={18} /> },
  { to: "/instructors", label: "Instructors", icon: <FaRegUser size={18} /> },
  { to: "/courses", label: "Courses", icon: <BsCollection size={18} /> },
];

function SideBar() {
  return (
    <div className="w-80 bg-white p-4">
      {/* logo container */}
      <div className="flex items-center gap-0.5 mb-6">
        <img src={logo} alt="logo" className="w-16 h-16" />
        <span className="text-1xl font-bold text-[#334155]">ByWay</span>
      </div>

      <div className="flex flex-col space-y-4">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 h-15 p-6 rounded-2xl transition ${
                isActive
                  ? "text-blue-600 font-semibold bg-[#EEF2FF]"
                  : "text-gray-600 hover:text-blue-500"
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export { SideBar };
