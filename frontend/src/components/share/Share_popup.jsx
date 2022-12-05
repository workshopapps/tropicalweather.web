import React, { useState } from 'react';
import '../../styles/Share.css';
import { GrClose } from 'react-icons/gr';
import Sharemenu from './sharemenu';

export default function Share() {
  const [popup, setPopup] = useState(0);
   return (
     <div className="share-background">
       <div className="share-popup">
         <GrClose className="close" onClick={() => setPopup(!popup)} />
         <h1 className="share-share">Share</h1>
         <div className="row1">
           <img src="/share/share-backIMG.png" alt="pop-up" className="share-img" />
           <div className="share-location">
             <h1 className="today-fore">TODAYS FORECAST</h1>
             <div className="share-state">
               <img src="/share/marker-pin-01.png" alt="pop-up" className="share-mark" />
               <p className="lagos-share">Lagos, Nigeria</p>
               <img src="/share/div line.png" alt="pop-up" className="share-horline" />
               <img src="/share/ion_rainy-sharp.png" alt="pop-up" className="share-rain" />
             </div>
             <div className="share-time">
               <h2 className="share-heavy">Heavy Rain</h2>
               <p className="share-ptime">12:00pm to 3:00pm</p>
             </div>
             <div className="share-risk">
               <img src="/share/Icon (3).png" alt="pop-up" className="share-alert" />
               <p className="share-arisk">There is a high risk of flooding in your area</p>
             </div>
           </div>
         </div>
         <Sharemenu />
       </div>
     </div>
   );
 }
