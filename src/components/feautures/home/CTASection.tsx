import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="hidden md:block relative bg-gradient-to-r from-yellow-400 to-orange-500 py-[20px] overflow-hidden text-center ">
  
  {/* LEFT IMAGE */}
  <img
    src="pizza/pizza.jpg"
    className="absolute left-0 bottom-0 top-0 w-[220px] md:w-[280px]"
  />

  {/* RIGHT IMAGE */}
  <img
    src="pizza/pizza6.jpg"
    className="absolute right-0 bottom-0 top-0 w-[220px] md:w-[280px]"
  />

  {/* CONTENT */}
  <div className="relative z-10">
    <h2 className="text-white text-[22px] md:text-[28px] font-semibold mb-6">
      Are you ready to order with <br />
      the best deals?
    </h2>

    <Button variant="primary" className="px-8 py-3 text-sm md:text-base">
      Order Now
    </Button>
  </div>

</section>
  );
}