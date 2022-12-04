import Phone from './aboutphone.png';
import '../styles/MobileAdevert.css';

export default function MobileAdvert() {
  return (
    <section id="about--mobile__app">
      <div className="about--mobile__container">
        <p className="about-mobile-go">Go Mobile</p>
        <h3 className="about-mobile-text2">
          Use the free Tropical weather app
        </h3>
        <p className="about-mobile-text3">
          Explore the flexibility and ease that comes with using our
          Tropical weather app on the go!
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
