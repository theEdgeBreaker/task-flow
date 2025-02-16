import Layout from "./components/shared/Layout";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    // <div>
    <Layout>
      <Header />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </Layout>
    // </div>
  );
}
