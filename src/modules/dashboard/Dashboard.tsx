import { Clock } from "lucide-react";
import DashboardBreadcrumb from "./dashboard-breadcrumb";
import DashboardHeader from "./dashboard-header";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex h-full w-full flex-1 flex-col bg-neutral-100 p-4 pl-6">
        <DashboardBreadcrumb />
        <div className="flex flex-col pt-4">
          <h1 className="flex flex-row items-center gap-x-2 text-2xl">
            <Clock className="text-neutral-600" />
            Recents
          </h1>
          <span className="text-[13px] text-neutral-600">
            21 items, 34.2 GB available
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
