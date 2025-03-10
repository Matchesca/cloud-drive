"use client";
import { usePathname } from "next/navigation";
import DashboardNavItem from "./dashboard-navitem";
import { navitems } from "./navitems";

const DashboardNavbar = () => {
  const pathName = usePathname();
  return (
    <div className="flex min-h-screen w-[18%] flex-col border-r-[1px] border-black/5 p-5">
      <div>
        <span className="text-xl font-bold tracking-tighter">M Drive</span>
        <div className="gap-y-2 pt-8">
          {navitems.map((item, index) => {
            return (
              <DashboardNavItem
                key={index}
                label={item.label}
                Icon={item.Icon}
                link={item.link}
                active={pathName === item.link}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-auto">hello</div>
    </div>
  );
};

export default DashboardNavbar;
