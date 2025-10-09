import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { BsCollection } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useLogout } from "@/hooks/useAuth";

const navItems = [
  { to: "/", label: "Dashboard", icon: <FaHome size={18} /> },
  { to: "/instructors", label: "Instructors", icon: <FaRegUser size={18} /> },
  { to: "/courses", label: "Courses", icon: <BsCollection size={18} /> },
];

function SideBar() {
  const logout = useLogout();
  return (
    <div className="w-80 bg-white p-4 flex flex-col justify-between h-screen">
      <div>
        {/* logo container */}
        <div className="flex items-center gap-0.5 mb-6">
          <img src="./ByWay-Logo.svg" alt="logo" className="w-16 h-16" />
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
          <div className="mt-1">
            <div className="border-t border-gray-200 my-4"></div>
            <button
              onClick={logout}
              className="flex items-center gap-2 w-full cursor-pointer text-gray-600 hover:text-red-500 transition font-medium p-3"
            >
              <FiLogOut className="text-xl" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SideBar };
