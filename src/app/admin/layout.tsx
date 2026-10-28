import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Tag, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminGuard } from "@/components/admin/admin-guard";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/coupons", label: "Coupons", icon: Tag },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 flex-col border-r border-border bg-muted/30 md:flex">
        <div className="flex h-16 items-center px-6 font-semibold">Admin</div>
        <nav className="flex-1 space-y-1 px-3">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <n.icon className="size-4" />
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="p-3">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/">
              <LogOut className="mr-2 size-4" /> Exit
            </Link>
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto bg-background">
        <AdminGuard>{children}</AdminGuard>
      </main>
    </div>
  );
}
