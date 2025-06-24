import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import News from "./GridSpace/News";
import Tools from "./GridSpace/Tools";
import Aside from "./GridSpace/Aside";
import Container from "@/layout/Container";

const HomePage = () => {
  return (
    <Container>
      <Header />
      <main className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-7 space-y-6">
          <News />
        </section>
        <section className="lg:col-span-3 space-y-6">
          <Tools />
        </section>
        <aside className="lg:col-span-2 space-y-6">
          <Aside />
        </aside>
      </main>
      <Footer />
    </Container>
  );
};

export default HomePage;
