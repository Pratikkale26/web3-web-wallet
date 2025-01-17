import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
        <Header />
        <Hero />
        <Footer />
    </div>
  );
}
