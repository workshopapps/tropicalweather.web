import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsGlobe } from 'react-icons/bs';
import { BiSupport } from 'react-icons/bi';

export default function Footer() {
  useEffect(() => {
    //  scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <footer className="self-end pt-16 text-white bg-primary-btn-clicked">
      <div className="p-4 bg-[#B93815] md:py-10 md:px-16">
        <div className="flex flex-col gap-10 pb-12 md:flex-row md:justify-between md:items-center">
          <div>
            <Link to="/">
              <svg width="189" height="32" viewBox="0 0 189 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.39729 20.9998C6.21361 21.0005 6.03186 20.9623 5.86396 20.8878C4.91377 20.4718 4.10537 19.7879 3.53755 18.9199C2.96973 18.0518 2.66709 17.0371 2.66663 15.9998C2.668 14.8175 3.06156 13.6689 3.78565 12.7342C4.50974 11.7995 5.52345 11.1314 6.66796 10.8345L6.66663 10.6665C6.66663 6.25451 10.2546 2.66651 14.6666 2.66651C16.556 2.66405 18.3848 3.33331 19.8263 4.55477C21.2678 5.77622 22.2282 7.47032 22.536 9.33451C22.5946 9.68318 22.5124 10.0409 22.3074 10.3289C22.1023 10.617 21.7913 10.8118 21.4426 10.8705C21.0943 10.9266 20.7379 10.8434 20.4504 10.6388C20.163 10.4342 19.9677 10.1247 19.9066 9.77718C19.702 8.53537 19.0628 7.4067 18.1029 6.59268C17.1431 5.77865 15.9252 5.33225 14.6666 5.33318C13.8744 5.3337 13.0923 5.51051 12.3769 5.85078C11.6615 6.19106 11.0309 6.68628 10.5306 7.30053C10.0304 7.91477 9.67307 8.63265 9.48465 9.4021C9.29624 10.1716 9.28143 10.9733 9.44129 11.7492L9.78663 13.4425L7.87863 13.3252C6.52929 13.3332 5.33329 14.5292 5.33329 15.9998C5.33329 17.0598 5.96129 18.0198 6.93329 18.4452C7.21383 18.568 7.44352 18.7837 7.58375 19.056C7.72398 19.3283 7.7662 19.6406 7.70331 19.9403C7.64042 20.24 7.47626 20.509 7.23842 20.7019C7.00058 20.8949 6.70356 21.0001 6.39729 20.9998ZM25.3333 9.33318C24.9797 9.33318 24.6405 9.47365 24.3905 9.7237C24.1404 9.97375 24 10.3129 24 10.6665C24 11.0201 24.1404 11.3593 24.3905 11.6093C24.6405 11.8594 24.9797 11.9998 25.3333 11.9998C25.6869 11.9998 26.0261 12.1403 26.2761 12.3904C26.5261 12.6404 26.6666 12.9796 26.6666 13.3332C26.6666 13.6868 26.5261 14.0259 26.2761 14.276C26.0261 14.526 25.6869 14.6665 25.3333 14.6665H12.5333C12.1797 14.6665 11.8405 14.807 11.5905 15.057C11.3404 15.3071 11.2 15.6462 11.2 15.9998C11.2 16.3535 11.3404 16.6926 11.5905 16.9426C11.8405 17.1927 12.1797 17.3332 12.5333 17.3332H18.6666C19.0202 17.3332 19.3594 17.4737 19.6094 17.7237C19.8595 17.9737 20 18.3129 20 18.6665C20 19.0201 19.8595 19.3593 19.6094 19.6093C19.3594 19.8594 19.0202 19.9998 18.6666 19.9998H12C9.79463 19.9998 7.99996 21.7945 7.99996 23.9998C7.99996 26.2052 9.79463 27.9998 12 27.9998C12.3536 27.9998 12.6927 27.8594 12.9428 27.6093C13.1928 27.3593 13.3333 27.0201 13.3333 26.6665C13.3333 26.3129 13.1928 25.9737 12.9428 25.7237C12.6927 25.4736 12.3536 25.3332 12 25.3332C11.6463 25.3332 11.3072 25.1927 11.0571 24.9427C10.8071 24.6926 10.6666 24.3535 10.6666 23.9998C10.6666 23.6462 10.8071 23.3071 11.0571 23.057C11.3072 22.807 11.6463 22.6665 12 22.6665H18.6666C20.872 22.6665 22.6666 20.8718 22.6666 18.6665C22.6666 18.1958 22.5706 17.7518 22.42 17.3332H25.3333C27.5386 17.3332 29.3333 15.5385 29.3333 13.3332C29.3333 11.1278 27.5386 9.33318 25.3333 9.33318Z" fill="white" />
                <path d="M39.374 21V11.256H41.572V21H39.374ZM36.28 13.034V11.116H44.666V13.034H36.28ZM48.6934 16.926V15.302H50.7794C51.2181 15.302 51.5541 15.19 51.7874 14.966C52.0301 14.742 52.1514 14.4387 52.1514 14.056C52.1514 13.7013 52.0347 13.4073 51.8014 13.174C51.5681 12.9407 51.2321 12.824 50.7934 12.824H48.6934V11.116H51.0454C51.6987 11.116 52.2727 11.242 52.7674 11.494C53.2621 11.7367 53.6494 12.0773 53.9294 12.516C54.2094 12.9547 54.3494 13.4587 54.3494 14.028C54.3494 14.6067 54.2094 15.1153 53.9294 15.554C53.6494 15.9833 53.2574 16.3193 52.7534 16.562C52.2494 16.8047 51.6567 16.926 50.9754 16.926H48.6934ZM47.0134 21V11.116H49.2114V21H47.0134ZM52.3894 21L49.3094 16.744L51.3254 16.198L54.9934 21H52.3894ZM61.7381 21.168C60.9915 21.168 60.3008 21.0373 59.6661 20.776C59.0408 20.5147 58.4901 20.1507 58.0141 19.684C57.5381 19.2173 57.1695 18.676 56.9081 18.06C56.6468 17.4347 56.5161 16.7627 56.5161 16.044C56.5161 15.316 56.6468 14.644 56.9081 14.028C57.1695 13.412 57.5335 12.8753 58.0001 12.418C58.4668 11.9513 59.0128 11.592 59.6381 11.34C60.2728 11.0787 60.9635 10.948 61.7101 10.948C62.4475 10.948 63.1288 11.0787 63.7541 11.34C64.3888 11.592 64.9395 11.9513 65.4061 12.418C65.8821 12.8753 66.2508 13.4167 66.5121 14.042C66.7735 14.658 66.9041 15.33 66.9041 16.058C66.9041 16.7767 66.7735 17.4487 66.5121 18.074C66.2508 18.69 65.8868 19.2313 65.4201 19.698C64.9535 20.1553 64.4028 20.5147 63.7681 20.776C63.1428 21.0373 62.4661 21.168 61.7381 21.168ZM61.7101 19.166C62.2981 19.166 62.8115 19.0353 63.2501 18.774C63.6981 18.5127 64.0435 18.1487 64.2861 17.682C64.5288 17.206 64.6501 16.66 64.6501 16.044C64.6501 15.5773 64.5801 15.1573 64.4401 14.784C64.3001 14.4013 64.0995 14.0747 63.8381 13.804C63.5768 13.524 63.2641 13.314 62.9001 13.174C62.5455 13.0247 62.1488 12.95 61.7101 12.95C61.1221 12.95 60.6041 13.0807 60.1561 13.342C59.7175 13.594 59.3768 13.9533 59.1341 14.42C58.8915 14.8773 58.7701 15.4187 58.7701 16.044C58.7701 16.5107 58.8401 16.9353 58.9801 17.318C59.1201 17.7007 59.3161 18.032 59.5681 18.312C59.8295 18.5827 60.1421 18.7927 60.5061 18.942C60.8701 19.0913 61.2715 19.166 61.7101 19.166ZM71.0994 17.402V15.694H73.2274C73.4981 15.694 73.7454 15.638 73.9694 15.526C74.1934 15.414 74.3708 15.2507 74.5014 15.036C74.6321 14.8213 74.6974 14.56 74.6974 14.252C74.6974 13.9533 74.6321 13.6967 74.5014 13.482C74.3708 13.2673 74.1934 13.104 73.9694 12.992C73.7454 12.88 73.4981 12.824 73.2274 12.824H71.0994V11.116H73.5494C74.1748 11.116 74.7394 11.242 75.2434 11.494C75.7474 11.746 76.1441 12.11 76.4334 12.586C76.7321 13.0527 76.8814 13.608 76.8814 14.252C76.8814 14.896 76.7321 15.456 76.4334 15.932C76.1441 16.3987 75.7474 16.7627 75.2434 17.024C74.7394 17.276 74.1748 17.402 73.5494 17.402H71.0994ZM69.4194 21V11.116H71.6174V21H69.4194ZM79.2347 21V11.116H81.4327V21H79.2347ZM89.1463 21.154C88.409 21.154 87.723 21.028 87.0883 20.776C86.463 20.5147 85.9123 20.1507 85.4363 19.684C84.9696 19.2173 84.6056 18.676 84.3443 18.06C84.083 17.4347 83.9523 16.7627 83.9523 16.044C83.9523 15.3253 84.083 14.658 84.3443 14.042C84.6056 13.4167 84.9696 12.8753 85.4363 12.418C85.903 11.9607 86.449 11.606 87.0743 11.354C87.709 11.0927 88.395 10.962 89.1323 10.962C89.9163 10.962 90.6116 11.088 91.2183 11.34C91.8343 11.592 92.371 11.9373 92.8283 12.376L91.3583 13.86C91.097 13.58 90.7796 13.3607 90.4063 13.202C90.0423 13.0433 89.6176 12.964 89.1323 12.964C88.703 12.964 88.3063 13.0387 87.9423 13.188C87.5876 13.328 87.2796 13.5333 87.0183 13.804C86.7663 14.0747 86.5656 14.4013 86.4163 14.784C86.2763 15.1667 86.2063 15.5867 86.2063 16.044C86.2063 16.5107 86.2763 16.9353 86.4163 17.318C86.5656 17.7007 86.7663 18.0273 87.0183 18.298C87.2796 18.5687 87.5876 18.7787 87.9423 18.928C88.3063 19.0773 88.703 19.152 89.1323 19.152C89.6363 19.152 90.075 19.0727 90.4483 18.914C90.8216 18.7553 91.1436 18.536 91.4143 18.256L92.8983 19.74C92.4223 20.1787 91.8763 20.524 91.2603 20.776C90.6536 21.028 89.949 21.154 89.1463 21.154ZM94.2405 21L98.1605 11.116H100.149L104.027 21H101.703L98.7345 12.796H99.5325L96.5225 21H94.2405ZM96.4665 19.208V17.416H101.857V19.208H96.4665ZM106.192 21V11.116H108.39V21H106.192ZM107.886 21V19.068H112.772V21H107.886ZM116.804 21L113.626 11.116H115.81L118.134 18.718H117.28L119.548 11.116H121.27L123.538 18.718H122.698L125.008 11.116H127.178L124 21H122.278L119.996 13.398H120.808L118.526 21H116.804ZM129.487 21V11.116H131.685V21H129.487ZM131.167 21V19.096H136.585V21H131.167ZM131.167 16.87V15.036H136.095V16.87H131.167ZM131.167 13.006V11.116H136.515V13.006H131.167ZM138.478 21L142.398 11.116H144.386L148.264 21H145.94L142.972 12.796H143.77L140.76 21H138.478ZM140.704 19.208V17.416H146.094V19.208H140.704ZM151.745 21V11.256H153.943V21H151.745ZM148.651 13.034V11.116H157.037V13.034H148.651ZM159.384 21V11.116H161.582V21H159.384ZM165.502 21V11.116H167.714V21H165.502ZM160.7 16.87V14.966H166.23V16.87H160.7ZM170.731 21V11.116H172.929V21H170.731ZM172.411 21V19.096H177.829V21H172.411ZM172.411 16.87V15.036H177.339V16.87H172.411ZM172.411 13.006V11.116H177.759V13.006H172.411ZM182.144 16.926V15.302H184.23C184.669 15.302 185.005 15.19 185.238 14.966C185.481 14.742 185.602 14.4387 185.602 14.056C185.602 13.7013 185.485 13.4073 185.252 13.174C185.019 12.9407 184.683 12.824 184.244 12.824H182.144V11.116H184.496C185.149 11.116 185.723 11.242 186.218 11.494C186.713 11.7367 187.1 12.0773 187.38 12.516C187.66 12.9547 187.8 13.4587 187.8 14.028C187.8 14.6067 187.66 15.1153 187.38 15.554C187.1 15.9833 186.708 16.3193 186.204 16.562C185.7 16.8047 185.107 16.926 184.426 16.926H182.144ZM180.464 21V11.116H182.662V21H180.464ZM185.84 21L182.76 16.744L184.776 16.198L188.444 21H185.84Z" fill="white" />
              </svg>

            </Link>
            <div className="flex flex-col flex-wrap gap-6 mt-8 md:flex-row">
              {/* <Link
                onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
                to="/about-us"
                className="link link-hover"
              >
                About us
              </Link> */}
              <Link to="/about-us" className="link link-hover">About us</Link>
              <Link to="/contact" className="link link-hover">Contact Us</Link>
            </div>
          </div>
          <div>
            <span className="footer-title">Download the mobile app</span>
            <div className="flex flex-wrap gap-6 mt-6">
              <a
                href="https://appetize.io/app/lca2f4kgwzqiveyfwvjqlmplsq?device=pixel4&osVersion=11.0&scale=75"
                target="_BLANK"
                rel="noreferrer"
              >
                <img src="/app-store.png" alt="app store" />
              </a>
              <a
                href="https://appetize.io/app/lca2f4kgwzqiveyfwvjqlmplsq?device=pixel4&osVersion=11.0&scale=75"
                target="_BLANK"
                rel="noreferrer"
              >
                <img src="/google-play.png" alt="google play" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-5 border-t border-t-white md:flex-row">
          <p className="order-last text-sm md:order-first md:text-base">© 2022 Weathery, All rights reserved to Team Gear</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <BsGlobe />
              <span className="hidden md:block">English</span>
            </span>
            <span className="flex items-center gap-2">
              <img src="/icons/uk-flag.png" alt="uk flag" />
              <span className="hidden md:block">United Kingdom</span>
            </span>
            <span className="flex items-center gap-2">
              <BiSupport />
              <span className="hidden md:block">Customer Support</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
