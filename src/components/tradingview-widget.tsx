"use client";

import React, { useEffect, useRef } from "react";

interface TradingViewWidgetProps {
  widgetName: string; // e.g., "ticker-tape", "advanced-chart", "technical-analysis"
  config: Record<string, any>;
  height?: string | number;
  width?: string | number;
}

export function TradingViewWidget({
  widgetName,
  config,
  height = "100%",
  width = "100%",
}: TradingViewWidgetProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const configString = JSON.stringify(config);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: transparent;
          }
          .tradingview-widget-container {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <div class="tradingview-widget-container">
          <div class="tradingview-widget-container__widget"></div>
          <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-${widgetName}.js" async>
            ${configString}
          </script>
        </div>
      </body>
      </html>
    `;

    doc.open();
    doc.write(htmlContent);
    doc.close();
  }, [widgetName, configString]);

  return (
    <iframe
      ref={iframeRef}
      title={`TradingView ${widgetName}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        border: "none",
        background: "transparent",
        display: "block",
      }}
    />
  );
}
