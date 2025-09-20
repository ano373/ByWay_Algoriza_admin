import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";

export function LayoutWithSideBar() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
