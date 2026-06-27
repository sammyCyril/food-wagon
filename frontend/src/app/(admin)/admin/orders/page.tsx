import OrdersTable from "@/components/admin/orders/OrdersTable";
import OrderStatusCard from "@/components/admin/orders/OrderStatusCard";
import Input from "@/components/ui/Input";

const Orders = () => {
    return (
        <div className="flex-1 p-1 space-y-6">

            {/* Search + Filter Tabs */}


            {/* Main Table */}
            <OrdersTable />

        </div>
    );
};

export default Orders;