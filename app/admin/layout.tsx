"use client";

import { AdminSidebar } from "@/components/admin-sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen bg-[#f9f9ff] font-[var(--font-poppins)] overflow-hidden text-[#181c23]">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative bg-[#f9f9ff]">
                <div className="container mx-auto px-6 pt-20 pb-10 md:py-10 md:px-10 lg:px-12 max-w-6xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
