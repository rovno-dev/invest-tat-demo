"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/entities/user/model/user-context";
import { Card } from "@/components/ui/card";
import { $fetch } from "@/utils/fetch";

interface Stats {
  total_users: number;
  total_orders: number;
  total_projects: number;
  total_companies: number;
}

export default function AdminDashboard() {
  const { user, isLoading } = useUser();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!user) return;
    $fetch("/api/v1/admin/dashboard", { isToast: false }).then((res) => {
      if (res.response?.ok) setStats(res.json);
    });
  }, [user]);

  if (isLoading || !user) return null;

  if (user.role !== "admin" && user.role !== "root") {
    return <p className="text-destructive">Access denied</p>;
  }

  return (
    <div>
      <h2 className="text-display-2 mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Users" value={stats?.total_users ?? 0} />
        <StatCard label="Orders" value={stats?.total_orders ?? 0} />
        <StatCard label="Projects" value={stats?.total_projects ?? 0} />
        <StatCard label="Companies" value={stats?.total_companies ?? 0} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </Card>
  );
}
