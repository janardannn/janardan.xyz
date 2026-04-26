"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { PenSquare, LayoutDashboard, BarChart3, LogOut } from "lucide-react";

export default function AdminNav() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/write", label: "New post", icon: PenSquare },
  ];

  return (
    <nav className="sticky top-0 z-30 border-b border-zinc-800/90 bg-zinc-950/90 backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 gap-4">
        <div className="flex items-center gap-1 sm:gap-6 min-w-0">
          <Link
            href="/admin"
            className="shrink-0 text-sm font-semibold tracking-tight text-zinc-100 hover:text-violet-300 transition-colors"
          >
            Admin
          </Link>
          <div className="flex items-center gap-0.5 overflow-x-auto min-w-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {links.map(({ href, label, icon: Icon }) => {
              const active =
                pathname === href || (href !== "/admin" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-md text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? "bg-zinc-800/90 text-zinc-50 ring-1 ring-zinc-700/80"
                      : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/80"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 opacity-80" />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors px-2 py-1.5 rounded-md hover:bg-zinc-900/60"
          >
            Site
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/80 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
