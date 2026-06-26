import LandingPageClient from './client-page';

export const revalidate = 300;

export default async function Page() {
  const initialPrices = {
    m: null,
    q: null,
    y: null,
  };

  return <LandingPageClient initialPrices={initialPrices} />;
}
