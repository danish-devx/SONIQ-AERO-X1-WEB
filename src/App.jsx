import { useCallback, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Hero from "./components/Hero/Hero";
import ProductIntro from "./components/ProductIntro/ProductIntro";
import SoundExperience from "./components/SoundExperience/SoundExperience";
import AdaptiveANC from "./components/AdaptiveANC/AdaptiveANC";
import ProductShowcase from "./components/ProductShowcase/ProductShowcase";
import ComfortDesign from "./components/ComfortDesign/ComfortDesign";
import Battery from "./components/Battery/Battery";
import Specifications from "./components/Specifications/Specifications";
import Pricing from "./components/Pricing/Pricing";
import FAQ from "./components/FAQ/FAQ";
import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import Cursor from "./components/Cursor/Cursor";

function App() {
  const [colorway, setColorway] = useState("obsidian");
  const [isLoading, setIsLoading] = useState(true);
  const finishLoading = useCallback(() => setIsLoading(false), []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={finishLoading} />}
      <Cursor />
      <Navbar />

      <main>
        <Hero colorway={colorway} onColorwayChange={setColorway} />
        <ProductIntro />
        <SoundExperience />
        <AdaptiveANC />
        <ProductShowcase />
        <ComfortDesign />
        <Battery />
        <Specifications />
        <Pricing colorway={colorway} onColorwayChange={setColorway} />
        <FAQ />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}

export default App;