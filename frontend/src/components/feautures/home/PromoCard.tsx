import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";   

export default function PromoCard() {
  return (
    <section className="py-[60px] bg-[#f5f5f5]">
      <Container>

        {/* First Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col md:flex-row md:h-[300px]">

          <div className="w-full md:flex-2 h-[220px] md:h-full">
            <img src="/pizza/pizza2.jpg" alt="Pizza" className="w-full h-full object-cover" />
          </div>

          <div className="w-full md:flex-1 p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-4">
              Wanna eat hot <br />
              & spicy <span className="text-orange-500">Pizza?</span>
            </h2>

            <p className="text-gray-600 text-[15px] md:text-base mb-6">
              Pair up with a friend and enjoy the hot and crispy pizza pops.
            </p>

            <Button>PROCEED TO ORDER →</Button>
          </div>
        </div>

        {/* Second Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col md:flex-row md:h-[300px] mt-10">
          <div className="w-full md:flex-1 p-6 md:p-10 flex flex-col justify-center order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-4">
              Wanna eat hot <br />
              & spicy <span className="text-orange-500">Pizza?</span>
            </h2>

            <p className="text-gray-600 text-[15px] md:text-base mb-6">
              Pair up with a friend and enjoy the hot and crispy pizza pops.
            </p>

            <Button>PROCEED TO ORDER →</Button>
          </div>

          <div className="w-full md:flex-2 h-[220px] md:h-full order-1 md:order-2">
            <img src="/pizza/pizza.jpg" alt="Pizza" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Third Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col md:flex-row md:h-[300px] mt-10">
          <div className="w-full md:flex-2 h-[220px] md:h-full">
            <img src="/pizza/pizza4.jpg" alt="Pizza" className="w-full h-full object-cover" />
          </div>

          <div className="w-full md:flex-1 p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-4">
              Wanna eat hot <br />
              & spicy <span className="text-orange-500">Pizza?</span>
            </h2>

            <p className="text-gray-600 text-[15px] md:text-base mb-6">
              Pair up with a friend and enjoy the hot and crispy pizza pops.
            </p>

            <Button>PROCEED TO ORDER →</Button>
          </div>
        </div>

      </Container>
    </section>
  );
}