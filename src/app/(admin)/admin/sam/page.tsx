import { User } from "lucide-react";

type Props = {
    totalCustomers: number;
}

export default function Samuel({totalCustomers,}: Props) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 p-5">

            <div className="p-6 rounded-2xl border border-gray-200 bg-white">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-purple-100">
                        <User className="size-5 text-purple-600" />

                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                        Total Customers
                        </p>

                        <h2 className="text-2xl font-bold">
                        22
                        </h2>

                    </div>

                </div>

            </div>

        </section>
    )
}