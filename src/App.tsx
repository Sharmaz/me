import { useState } from 'react';

import usePortfolio from './hooks/usePortfolio';
import useLenis from './hooks/useLenis';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Work from './components/Work';
import Contact from './components/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import SceneCanvas from './components/SceneCanvas';
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
      <SceneCanvas />
      <Header name={data?.profile.name ?? ''} animate={animateHero} />
      <main>
        <Hero
          name={data?.profile.name ?? ''}
          resume={data?.profile.resume ?? ''}
          animate={animateHero}
        />
        <About
          about={data?.profile.about ?? ''}
          profilePic={data?.profile.profilePic ?? ''}
        />
        <Experience jobs={data?.jobs ?? []} />
        <Work projects={data?.projects ?? []} />
        <Contact email={data?.email ?? ''} />
      </main>
      <Footer profile={data?.profile ?? {} as never} />
    </>
  );
}

export default App;
