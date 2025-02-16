import DashboardNavbar from "@/modules/dashboard/dashboard-navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
}) => {
  return (
    <main className="flex min-h-screen w-full flex-row">
      <DashboardNavbar />
      {children}
    </main>
  );
};

export default DashboardLayout;
