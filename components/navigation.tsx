"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

const navigation = [
  { name: "Home", href: "/", icon: "🏠" },
  { name: "Schools", href: "/schools", icon: "🏫" },
  { name: "Events", href: "/events", icon: "📅" },
  { name: "Donations", href: "/donations", icon: "💝" },
  { name: "Public Boards", href: "/boards", icon: "📋" },
  { name: "KYS Verification", href: "/kys", icon: "✅" },
]

const adminNavigation = [{ name: "Admin Dashboard", href: "/admin", icon: "⚙️" }]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-white border-b border-emerald-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AM</span>
            </div>
            <span className="font-bold text-xl text-emerald-900">AL-MURATTAL</span>
            <Badge variant="outline" className="text-xs">
              NETWORK
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "default" : "ghost"}
                  size="sm"
                  className={isActive(item.href) ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Button>
              </Link>
            ))}

            {/* Admin Section */}
            <div className="border-l border-gray-200 ml-4 pl-4">
              {adminNavigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    size="sm"
                    className={isActive(item.href) ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <span className="mr-2">👤</span>
              Profile
            </Button>
            <Button variant="ghost" size="sm">
              <span className="mr-2">🚪</span>
              Logout
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <span>☰</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AM</span>
                  </div>
                  <span className="font-bold text-xl text-emerald-900">AL-MURATTAL</span>
                </div>

                <div className="flex-1 space-y-2">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant={isActive(item.href) ? "default" : "ghost"}
                        className={`w-full justify-start ${isActive(item.href) ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </Button>
                    </Link>
                  ))}

                  <div className="border-t border-gray-200 my-4 pt-4">
                    <p className="text-sm font-medium text-gray-500 mb-2 px-3">Administration</p>
                    {adminNavigation.map((item) => (
                      <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                        <Button
                          variant={isActive(item.href) ? "default" : "ghost"}
                          className={`w-full justify-start ${isActive(item.href) ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="mr-3">👤</span>
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="mr-3">🚪</span>
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
