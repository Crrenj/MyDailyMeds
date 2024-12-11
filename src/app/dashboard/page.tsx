"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import MainContent from "@/components/dashboard/MainContent";

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <MainContent />
    </div>
  );
}
