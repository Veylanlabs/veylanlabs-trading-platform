import React from 'react';

export function HowItWorksSection() {
  return (
    <div className="sec">
      <div className="mk">
        <div className="sec-head center"><span className="eyebrow">How it works</span><h2>Set up in minutes.</h2></div>
        <div className="timeline-container">
          {[
            ["01", "Choose your plan", "Pick a membership and check out securely."],
            ["02", "Connect accounts", "Add your TradingView and Telegram usernames."],
            ["03", "Access granted", "Indicators unlock, group invite lands."],
            ["04", "Trade live with us", "Read the market together, every session."]
          ].map((s, i) => (
            <div className="timeline-step" key={i}>
              <div className="timeline-node-wrapper">
                <span>{s[0]}</span>
              </div>
              <h4>{s[1]}</h4>
              <p>{s[2]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
