"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUser,
  IconCalendar,
  IconPlus,
  IconSearch,
  IconPill,
  IconHome,
  IconDoorExit
} from "@tabler/icons-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Home",
      href: "/",
      icon: <IconHome className="h-5 w-5" />,
    },
    {
      label: "My Medication",
      href: "/dashboard/medications",
      icon: <IconPill className="h-5 w-5" />,
    },
    {
      label: "Calendrier",
      href: "/dashboard/calendar",
      icon: <IconCalendar className="h-5 w-5" />,
    },
    {
      label: "Ajouter Médicament",
      href: "/dashboard/add-medication",
      icon: <IconPlus className="h-5 w-5" />,
    },
    {
      label: "Chercher",
      href: "/dashboard/search",
      icon: <IconSearch className="h-5 w-5" />,
    },
    {
    label: "Logout",
    href: "/logout",
    icon: <IconDoorExit className="h-5 w-5" />,
    },
    {
    label: "Settings",
    href: "/settings",
    icon: <IconSettings className="h-5 w-5" />,
    },
    {
    label: "Profile",
    href: "/profile",
    icon: <IconUser className="h-5 w-5" />,
    }
  ];

  return (
    <motion.div
      className={`h-screen bg-gray-100 dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 ${
        open ? "w-64" : "w-16"
      } flex flex-col`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      animate={{ width: open ? "256px" : "64px" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Sidebar Links */}
      <div className="flex flex-col gap-4 mt-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="flex items-center gap-2 px-4 py-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md"
          >
            <span>{link.icon}</span>
            {open && <span>{link.label}</span>}
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
