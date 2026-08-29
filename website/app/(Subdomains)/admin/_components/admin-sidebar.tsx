"use client";
import { Sidebar, SidebarItem } from "@/components/layout/nav/sidebar";
import { useAdminSecret } from "@/hooks/use-admin-secret";
import {
  Handshake,
  Newspaper,
  Box,
  BuildingIcon,
  BanknoteArrowDown,
  Users,
  BicepsFlexed,
  ChartSpline,
} from "lucide-react";

const navItems: SidebarItem[] = [
  { label: "Дашборд", href: "", icon: ChartSpline },
  { label: "Пользователи", href: "/users", icon: Users },
  { label: "Заявки", href: "/orders", icon: BanknoteArrowDown },
  { label: "Компании", href: "/companies", icon: BuildingIcon },
  { label: "Клиенты", href: "/clients", icon: Handshake },
  { label: "Проекты", href: "/projects", icon: Box },
  { label: "Статьи", href: "/articles", icon: Newspaper },
  { label: "Команда", href: "/team", icon: BicepsFlexed },
];

export function AdminSidebar({ secret }: { secret: string }) {
  const { secret: adminSecret, loading: adminSecretLoading } = useAdminSecret();
  return (
    <Sidebar
      items={navItems}
      basePath={`/admin/${adminSecret}`}
      title="Админ-панель"
      className="mb-6"
    />
  );
}
