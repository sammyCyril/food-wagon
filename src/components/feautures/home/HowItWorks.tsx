import Container from "@/components/layout/Container";
import {
  MapPin,
  ShoppingBag,
  CreditCard,
  Donut
} from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Select location",
    desc: "Choose the location where your food will be delivered.",
  },
  {
    icon: ShoppingBag,
    title: "Choose order",
    desc: "Check over hundreds of menus to pick your favorite food.",
  },
  {
    icon: CreditCard,
    title: "Pay advanced",
    desc: "It's quick, safe, and simple. Select several methods of payment.",
  },
  {
    icon: Donut,
    title: "Enjoy meals",
    desc: "Food is made and delivered directly to your home.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#ffffff] py-[2px]">
      <Container>
        <h2 className="text-center text-[22px] font-semibold text-orange-500 mb-12">
          How does it work
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <div key={i} className="flex flex-col items-center">

                {/* ICON */}
                <div className="bg-orange-100 text-orange-500 p-4 rounded-full mb-4 shadow-sm">
                  <Icon size={28} />
                </div>

                {/* TITLE */}
                <h3 className="font-semibold text-sm mb-2">
                  {step.title}
                </h3>

                {/* DESC */}
                <p className="text-xs text-gray-500 max-w-[180px]">
                  {step.desc}
                </p>

              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}