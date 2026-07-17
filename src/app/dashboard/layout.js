import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col gap-6 p-4 md:flex-row">
      <div className="w-full md:w-auto">
        <DashboardSidebar />
      </div>
      <main className="min-h-screen min-w-0 flex-1 px-2">{children}</main>
    </div>
  );
}
