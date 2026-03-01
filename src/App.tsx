import { useState } from 'react';

import usePortfolio from './hooks/usePortfolio';
import useLenis from './hooks/useLenis';
import Hero from './components/Hero';
import Loader from './components/LoaderScramble';

function App() {
  const { data, error } = usePortfolio();
  const [showLoader, setShowLoader] = useState(true);
  const [animateHero, setAnimateHero] = useState(false);

  useLenis();

  if (error) return <span>{error}</span>;

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setAnimateHero(true);
  };

  return (
    <>
      {showLoader && <Loader onComplete={handleLoaderComplete} />}
      <main>
        <Hero
          name={data?.profile.name ?? ''}
          resume={data?.profile.resume ?? ''}
          animate={animateHero}
        />
      </main>
    </>
  );
}

export default App;
