"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
    },
    {
      label: "Logout",
      href: "/logout",
      icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody>
          {/* Sidebar Links */}
          <div className="flex flex-col gap-4">
            {links.map((link, index) => (
              <SidebarLink key={index} link={link} />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Dashboard Content */}
      <div className="flex-1 bg-gray-50 p-8">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        <p>This is your main content area.</p>
      </div>
    </div>
  );
}
