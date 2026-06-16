// Simple Telegram Bot API wrapper
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export async function generateInviteLink(groupId: string) {
  if (!TELEGRAM_BOT_TOKEN || !groupId) {
    return 'Missing Token or Group ID in Vercel';
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/createChatInviteLink`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: groupId,
        member_limit: 1, // one-time use
        creates_join_request: false,
      }),
    });
    
    const data = await res.json();
    if (data.ok) {
      return data.result.invite_link;
    } else {
      console.error('Failed to generate invite link:', data);
      return `Telegram API Error: ${data.description}`;
    }
  } catch (error: any) {
    console.error('Telegram API error:', error);
    return `Network Error: ${error.message}`;
  }
}

export async function kickUser(groupId: string, telegramUserId: string | number) {
  if (!TELEGRAM_BOT_TOKEN || !groupId) return false;

  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/banChatMember`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: groupId,
        user_id: telegramUserId,
        revoke_messages: false,
      }),
    });
    
    // We should also unban them immediately so they can rejoin later if they subscribe again
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/unbanChatMember`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: groupId,
        user_id: telegramUserId,
        only_if_banned: true,
      }),
    });
    
    return res.ok;
  } catch (error) {
    console.error('Telegram API error:', error);
    return false;
  }
}

export async function sendMessageToGroup(groupId: string, text: string) {
  if (!TELEGRAM_BOT_TOKEN || !groupId) return false;

  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: groupId,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      }),
    });
    
    const data = await res.json();
    if (!data.ok) {
      console.error('Failed to send telegram message:', data);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Telegram API error:', error);
    return false;
  }
}
