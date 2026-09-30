import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Trust } from './components/sections/Trust';
import { ProductValue } from './components/sections/ProductValue';
import { HowItWorks } from './components/sections/HowItWorks';
import { FeatureGrid } from './components/sections/FeatureGrid';
import { Calculator } from './components/sections/Calculator';
import { Outcomes } from './components/sections/Outcomes';
import { Comparison } from './components/sections/Comparison';
import { Pricing } from './components/sections/Pricing';
import { Testimonials } from './components/sections/Testimonials';
import { Faq } from './components/sections/Faq';
import { FinalCta } from './components/sections/FinalCta';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Trust />
        <ProductValue />
        <HowItWorks />
        <FeatureGrid />
        <Calculator />
        <Outcomes />
        <Comparison />
        <Pricing />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}
