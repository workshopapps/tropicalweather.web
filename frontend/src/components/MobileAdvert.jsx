import { useTranslation } from 'react-i18next';
import Phone from './aboutphone.png';
import '../styles/MobileAdevert.css';

export default function MobileAdvert() {
  const { t } = useTranslation(['home']);
  return (
    <section id="about--mobile__app">
      <div className="about--mobile__container">
        <p className="about-mobile-go">{t('gomobile')}</p>
        <h3 className="about-mobile-text2">
          {t('usetheappheading')}
        </h3>
        <p className="about-mobile-text3">
          {t('usetheappbody')}
        </p>
        <div className="about__download_btn">
          <a
            href="https://appetize.io/app/lca2f4kgwzqiveyfwvjqlmplsq?device=pixel4&osVersion=11.0&scale=75"
            target="_BLANK"
            rel="noreferrer"
          >
            <img src="/app-store.png" alt="" className="app--store" />
          </a>
          <a
            href="https://appetize.io/app/lca2f4kgwzqiveyfwvjqlmplsq?device=pixel4&osVersion=11.0&scale=75"
            target="_BLANK"
            rel="noreferrer"
          >
            <img src="/google-play.png" alt="" className="app--store" />
          </a>
        </div>
      </div>
      <div className="about-phone-container">
        <img src={Phone} alt="Phone" />
      </div>
    </section>
  );
}
