import RecentOrders from "@/components/admin/RecentOrders";
import SalesChart from "@/components/admin/SalesChart";
import StatCard from "@/components/admin/StatCard";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      
      {/* Stats */}
      <section className="grid gap-6 md:grid-cols-4 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$12,450"
          change="+12%"
        />

        <StatCard
          title="Orders"
          value="1,240"
          change="+8%"
        />

        <StatCard
          title="Customers"
          value="845"
          change="+5%"
        />

        <StatCard
          title="Products"
          value="120"
          change="+2%"
        />
      </section>


      <SalesChart />

      <RecentOrders />

     


    </div>
  );
}