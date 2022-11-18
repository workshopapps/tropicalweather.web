import React from 'react';
import '../styles/Home.css';
export function PopularLocation() {
    return (
        <article className="landing_location_brief">
            <div className="landing_location_brief_header">
                <img src="/Home/Icon (1).svg" alt="" />
                <h3>Port Harcourt, Nigeria</h3>
            </div>
            <div className="landing_location_body">
                <h5>SUNNY</h5>
                <p>
                    Expect rain and scattered thunderstorms by 12:00pm.
                </p>
                <button type="button" className="landing_link_button">
                    View more info →
                </button>
            </div>
        </article>
    );
}