import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import News from "./GridSpace/News";
import Tools from "./GridSpace/Tools";
import Aside from "./GridSpace/Aside";
import Container from "@/layout/Container";
import { useTracking } from "@/hooks/useTracking";

const HomePage = () => {
  const { trackEvent } = useTracking();
  trackEvent({
    eventName: "page_view",
    eventCategory: "navigation",
    properties: {
      page: "home",
    },
  });
  return (
    <Container>
      <Header />
      <main className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
        <section className="space-y-6 lg:col-span-7">
          <News />
        </section>
        <section className="space-y-6 lg:col-span-3">
          <Tools />
        </section>
        <aside className="space-y-6 lg:col-span-2">
          <Aside />
        </aside>
      </main>
      <Footer />
    </Container>
  );
};

export default HomePage;
