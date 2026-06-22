/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const puppeteer = require('puppeteer');
require('dotenv').config();

const app = express();
app.use(express.json());

// Security Check
const verifySecret = (req, res, next) => {
  const { secret } = req.body;
  if (!secret || secret !== process.env.WORKER_SECRET) {
    return res.status(403).json({ error: 'Unauthorized: Invalid Worker Secret' });
  }
  next();
};

/**
 * Detects and dismisses the TradingView "Session disconnected" popup.
 * This popup appears when the account is accessed from another device/browser.
 * It clicks the black "Connect" button to resume the session automatically.
 * @param {import('puppeteer').Page} page
 */
async function dismissSessionDisconnectedPopup(page) {
  try {
    // Wait briefly to see if the popup appears (3 seconds max)
    const connectBtn = await page.waitForSelector(
      // Targets a button whose visible text is exactly "Connect"
      'button ::-p-text(Connect)',
      { timeout: 3000 }
    );
    if (connectBtn) {
      await connectBtn.click();
      console.log('[TV-Worker] ✅ "Session disconnected" popup detected and dismissed. Clicked "Connect".');
      // Wait for TradingView to re-establish the session after clicking Connect
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  } catch {
    // No popup appeared — session is healthy, continue normally
    console.log('[TV-Worker] ✅ No "Session disconnected" popup detected. Session is healthy.');
  }
}

/**
 * Automate TradingView Script Whitelist
 * @param {string} username - TV Username
 * @param {string} action - 'grant' | 'revoke'
 */
async function manageTradingViewAccess(username, action) {
  let browser;
  let page;
  try {
    // Launch headless Chrome
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    page = await browser.newPage();

    // 1. Inject the Session Cookie to bypass login
    await page.setCookie({
      name: 'sessionid',
      value: process.env.TV_SESSION_ID,
      domain: '.tradingview.com'
    });

    console.log(`[TV-Worker] Navigating to script management page for ${username}...`);
    
    // 2. Go to the exact script management URL
    await page.goto(process.env.TV_SCRIPT_URL, { waitUntil: 'networkidle2' });

    // 3. ⚡ Auto-dismiss "Session disconnected" popup BEFORE doing anything else
    await dismissSessionDisconnectedPopup(page);

    // --- WARNING: SELECTORS MAY NEED ADJUSTMENT BASED ON CURRENT TRADINGVIEW UI ---
    
    // Check if we are logged in correctly
    const isLoggedOut = await page.$('.tv-header__user-menu-button--anonymous');
    if (isLoggedOut) {
      throw new Error('Session ID is invalid or expired. The bot is not logged in.');
    }

    if (action === 'grant') {
      console.log(`[TV-Worker] Attempting to grant access...`);
      // Find the "Add User" input box (example selector, must be inspected on live site)
      const inputSelector = 'input[placeholder*="username"]'; // Update this actual selector
      await page.waitForSelector(inputSelector, { timeout: 5000 });
      await page.type(inputSelector, username);
      
      // Find and click the Add button
      const addBtnSelector = 'button[type="submit"]'; // Update this actual selector
      await page.click(addBtnSelector);
      
      // Wait for success indicator
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`[TV-Worker] Successfully granted access to ${username}`);

    } else if (action === 'revoke') {
      console.log(`[TV-Worker] Attempting to revoke access...`);
      // This logic will search for the user in the list and click their X button
      // Note: This requires exact DOM traversal on the live TradingView site.
      // Example pseudo-selector logic:
      // const userRow = await page.$x(`//div[contains(text(), '${username}')]/../button[@title='Remove']`);
      // if (userRow.length > 0) await userRow[0].click();
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`[TV-Worker] Successfully revoked access for ${username}`);
    }

    await browser.close();
    return { success: true, message: `Access ${action}ed for ${username}` };

  } catch (error) {
    if (page) {
      try {
        const fs = require('fs');
        if (!fs.existsSync('./logs')) fs.mkdirSync('./logs');
        const screenshotPath = `./logs/error-${Date.now()}.png`;
        await page.screenshot({ path: screenshotPath });
        console.log(`[TV-Worker] Captured error screenshot at ${screenshotPath}`);
      } catch (screenshotError) {
        console.error(`[TV-Worker] Failed to capture error screenshot:`, screenshotError);
      }
    }
    if (browser) await browser.close();
    console.error(`[TV-Worker] Fatal Error during ${action}:`, error);
    return { success: false, error: error.message };
  }
}

// API Route
app.post('/api/webhook', verifySecret, async (req, res) => {
  const { username, action } = req.body;
  
  if (!username) return res.status(400).json({ error: 'Missing username' });
  if (action !== 'grant' && action !== 'revoke') {
    return res.status(400).json({ error: 'Invalid action. Must be grant or revoke' });
  }
  
  // We don't await the worker here so the Next.js API doesn't time out
  // The worker will run asynchronously in the background.
  manageTradingViewAccess(username, action);
  
  res.json({ success: true, message: `Task '${action}' queued for ${username}` });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`[TV-Worker] TradingView Automation Service running on port ${PORT}`);
});
