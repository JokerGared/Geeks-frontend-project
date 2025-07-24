import AboutSection from '../../components/AboutSection/AboutSection';
import HeroSection from '../../components/HeroSection/HeroSection';
import PopularArticlesSection from '../../components/PopularArticlesSection/PopularArticlesSection';
import TopCreatorsSection from '../../components/TopCreatorsSection/TopCreatorsSection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <PopularArticlesSection />
      <TopCreatorsSection />
    </div>
  );
};

export default HomePage;
