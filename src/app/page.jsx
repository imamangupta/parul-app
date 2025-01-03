import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="mx-20 h-screen">
        <h1 className="text-5xl font-medium text-center mt-10">Manage Your Solar Eneregy <br /> With Efficient Decenteralized Network</h1>
      </section>
    </main>
  );
}
