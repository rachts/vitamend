"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationBell } from "@/components/notifications"
import { Home, Package, User, Settings, LogOut, Users, BarChart, FileText, Heart, Shield } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: BarChart, auth: true },
    { name: "Donate", href: "/donate", icon: Heart },
    { name: "Volunteer", href: "/volunteer", icon: Users },
    { name: "Transparency", href: "/transparency", icon: Shield },
  ]

  // Role-specific navigation items
  const roleNavItems = {
    admin: [
      { name: "Analytics", href: "/analytics", icon: BarChart },
      { name: "Users", href: "/admin/users", icon: Users },
    ],
    ngo_partner: [{ name: "NGO Dashboard", href: "/ngo/dashboard", icon: Package }],
    reviewer: [{ name: "Verify Medicines", href: "/reviewer/verify", icon: FileText }],
  }

  // Add role-specific items if user is logged in
  const allNavItems = [...navItems]
  if (session?.user?.role && roleNavItems[session.user.role as keyof typeof roleNavItems]) {
    allNavItems.push(...roleNavItems[session.user.role as keyof typeof roleNavItems])
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-[#1a472a]" />
            <span className="font-bold text-xl text-[#1a472a]">VitaMend</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {allNavItems.map((item) => {
              if (item.auth && !session) return null
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-[#1a472a] ${
                    isActive(item.href) ? "text-[#1a472a]" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {session ? (
            <>
              <NotificationBell />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{session.user.name}</span>
                      <span className="text-xs text-muted-foreground">{session.user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <BarChart className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/signin">Sign in</Link>
              </Button>
              <Button asChild className="bg-[#1a472a] hover:bg-[#1a472a]/90">
                <Link href="/auth/signup">Sign up</Link>
              </Button>
            </div>
          )}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4">
          <nav className="flex flex-col space-y-4">
            {allNavItems.map((item) => {
              if (item.auth && !session) return null
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#1a472a] ${
                    isActive(item.href) ? "text-[#1a472a]" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
            {!session && (
              <>
                <Link
                  href="/auth/signin"
                  className="flex items-center gap-2 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex items-center gap-2 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
