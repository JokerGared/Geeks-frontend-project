import clsx from 'clsx';
import s from './AboutSection.module.css';
import SectionTitle from '../SectionTitle/SectionTitle';

const AboutSection = () => {
  return (
    <section className={clsx('section')}>
      <ul className={clsx(s.aboutSectionList)}>
        <li className={clsx(s.aboutTextContainer)}>
          <SectionTitle className={clsx(s.aboutTitle)}>About us</SectionTitle>
          <p>
            Harmoniq is a mindful publishing platform dedicated to mental health
            and well-being. We bring together writers, thinkers, and readers who
            believe that open, thoughtful stories can heal, inspire, and
            connect. Whether you're here to share your journey or learn from
            others — this is your space to slow down, reflect, and grow.
          </p>
        </li>
        <li>
          <picture>
            <source
              srcSet="/images/home/about/desk-lotus.png 1x, /images/home/about/desk-lotus@2x.png 2x"
              media="(min-width: 1440px)"
              type="image/png"
            />
            <source
              srcSet="/images/home/about/tab-lotus.png 1x, /images/home/about/tab-lotus@2x.png 2x"
              media="(min-width: 768px)"
              type="image/png"
            />
            <source
              srcSet="/images/home/about/mob-lotus.png 1x, /images/home/about/mob-lotus@2x.png 2x"
              media="(max-width: 767px)"
              type="image/png"
            />
            <img
              src="/images/home/about/mob-lotus.png"
              alt="A picture with lotus"
            />
          </picture>
        </li>
        <li>
          <picture>
            <source
              srcSet="/images/home/about/desk-friends.png 1x, /images/home/about/desk-friends@2x.png 2x"
              media="(min-width: 1440px)"
              type="image/png"
            />
            <source
              srcSet="/images/home/about/tab-friends.png 1x, /images/home/about/tab-friends@2x.png 2x"
              media="(min-width: 768px)"
              type="image/png"
            />
            <source
              srcSet="/images/home/about/mob-friends.png 1x, /images/home/about/mob-friends@2x.png 2x"
              media="(max-width: 767px)"
              type="image/png"
            />
            <img
              src="/images/home/about/mob-friends.png"
              alt="Friends hug each other and watch the sunset"
            />
          </picture>
        </li>
        <li>
          <picture>
            <source
              srcSet="/images/home/about/desk-yoga.png 1x, /images/home/about/desk-yoga@2x.png 2x"
              media="(min-width: 1440px)"
              type="image/png"
            />
            <source
              srcSet="/images/home/about/tab-yoga.png 1x, /images/home/about/tab-yoga@2x.png 2x"
              media="(min-width: 768px)"
              type="image/png"
            />
            <source
              srcSet="/images/home/about/mob-yoga.png 1x, /images/home/about/mob-yoga@2x.png 2x"
              media="(max-width: 767px)"
              type="image/png"
            />
            <img
              src="/images/home/about/mob-yoga.png"
              alt="A person meditates at sunrise"
              className={clsx(s.yogaImage)}
            />
          </picture>
        </li>
      </ul>
    </section>
  );
};

export default AboutSection;
