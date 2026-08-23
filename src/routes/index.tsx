import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Featured } from "@/components/site/Featured";
import { MenuSection } from "@/components/site/MenuSection";
import { About } from "@/components/site/About";
import { Gallery } from "@/components/site/Gallery";
import { AppetiteCta } from "@/components/site/AppetiteCta";
import { LocationSection } from "@/components/site/LocationSection";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { CartDrawer } from "@/components/site/CartDrawer";
import { CartProvider } from "@/context/cart";
import { site, toInternational } from "@/data/site";

const title = "Mirchi Point Hyderabad | Fast Food, BBQ & Rolls on Jail Rd";
const description =
  "Mirchi Point Hyderabad — spicy fast food, BBQ, rolls and Chinese at C929+7FX, Jail Rd, Heerabad. See the full menu with PKR prices and order on WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: site.name,
          description,
          servesCuisine: ["Pakistani", "Fast Food", "BBQ", "Chinese"],
          priceRange: "PKR",
          telephone: `+${toInternational(site.phones[0])}`,
          sameAs: [site.facebook],
          address: {
            "@type": "PostalAddress",
            streetAddress: "C929+7FX, Jail Rd, Heerabad",
            addressLocality: "Hyderabad",
            addressCountry: "PK",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <main id="home">
        <Hero />
        <Featured />
        <MenuSection />
        <About />
        <Gallery />
        <AppetiteCta />
        <LocationSection />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
