"use client"


import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Mdadmin } from "react-icons/md";
import { FaProjectDiagram, FaUser } from "react-icons/fa";
import { logoutAlert } from "@/app/utility/msg/logoutAlert";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AdminNavbar from "@/app/components/admin/AdminNavbar";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const pathname = usePathname();
    const handleLogout = async () => {
        const res = await logoutAlert();
        if (res.isConfirmed) {
            localStorage.clear();
            window.location.href = "/";
        }
    }



    return (
        <div className="flex h-screen bg-[#E9E9E9]">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 bottom-0 h-screen px-6
        bg-white text-[#989898] border-r border-gray-300
        transition-all duration-300
        ${sidebarOpen ? "w-87.5" : "w-25"}`}
            >
                {/* Logo + Toggle */}
                <div className="flex items-center justify-between mt-6 mb-10">
                    {sidebarOpen && (
                        <h1 className=" text-6xl " >LoGo</h1>
                    )}

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-[#989898] hover:text-indigo-600 cursor-pointer "
                    >
                        <FiMenu size={26} />
                    </button>
                </div>

                {/* Menu */}
                <nav>
                    <ul className="space-y-3 text-lg font-medium">

                        <li>
                            <Link
                                href="/admin"
                                className={`flex items-center gap-5 px-5 py-3 rounded-full transition    ${pathname === "/admin"
                                    ? "bg-[#E9E9E9]"
                                    : "hover:bg-gray-100"
                                    }`}
                            >
                                <FaUser
                                    size={25}
                                    className={
                                        pathname === "/admin"
                                            ? "text-indigo-600"
                                            : "text-[#989898]"
                                    }
                                />

                                {sidebarOpen && (
                                    <span
                                        className={`text-base ${pathname === "/admin"
                                            ? "text-indigo-600"
                                            : "text-[#989898]"
                                            }`}
                                    >
                                        User Management
                                    </span>
                                )}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/project"
                                className={`flex items-center gap-5 px-5 py-3 rounded-full transition    ${pathname === "/admin/project"
                                    ? "bg-[#E9E9E9]"
                                    : "hover:bg-gray-100"
                                    }`}
                            >
                                <FaProjectDiagram
                                    size={25}
                                    className={
                                        pathname === "/admin/project"
                                            ? "text-indigo-600"
                                            : "text-[#989898]"
                                    }
                                />

                                {sidebarOpen && (
                                    <span
                                        className={`text-base ${pathname === "/admin/project"
                                            ? "text-indigo-600"
                                            : "text-[#989898]"
                                            }`}
                                    >
                                        Project
                                    </span>
                                )}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/work-flow"
                                className={`flex items-center gap-5 px-5 py-3 rounded-full transition    ${pathname === "/admin/work-flow"
                                    ? "bg-[#E9E9E9]"
                                    : "hover:bg-gray-100"
                                    }`}
                            >
                                <FaProjectDiagram
                                    size={25}
                                    className={
                                        pathname === "/admin/work-flow"
                                            ? "text-indigo-600"
                                            : "text-[#989898]"
                                    }
                                />

                                {sidebarOpen && (
                                    <span
                                        className={`text-base ${pathname === "/admin/work-flow"
                                            ? "text-indigo-600"
                                            : "text-[#989898]"
                                            }`}
                                    >
                                        WorkFlow
                                    </span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Logout */}
                <div className="absolute bottom-8 left-0 w-full px-6">
                    <button
                        onClick={handleLogout}
                        className="w-full cursor-pointer py-2 rounded-full border border-gray-300 text-[#989898] hover:text-indigo-600 hover:border-text-indigo-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Header */}
            <header
                className={`fixed top-0 h-24 bg-white shadow z-20
        flex items-center px-6 transition-all duration-300
        ${sidebarOpen ? "ml-87.5" : "ml-25"}`}
                style={{
                    width: sidebarOpen
                        ? "calc(100% - 350px)"
                        : "calc(100% - 100px)",
                }}
            >
                <AdminNavbar />
            </header>

            {/* Main Content */}
            <main
                className={`flex-1 mt-24 p-6 transition-all duration-300 
        ${sidebarOpen ? "ml-87.5" : "ml-25"}`}
            >
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
