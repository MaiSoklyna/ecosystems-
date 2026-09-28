import { Client } from "@notionhq/client";

const NOTION_CLIENT_ID = process.env.NOTION_CLIENT_ID;
const NOTION_CLIENT_SECRET = process.env.NOTION_CLIENT_SECRET;
const NOTION_REDIRECT_URI = process.env.NOTION_REDIRECT_URI;
const NOTION_ACCESS_TOKEN = process.env.NOTION_ACCESS_TOKEN;

if (!NOTION_CLIENT_ID || !NOTION_CLIENT_SECRET || !NOTION_REDIRECT_URI || !NOTION_ACCESS_TOKEN) {
  throw new Error("Missing Notion OAuth environment variables.");
}

const notion = new Client({
  auth: NOTION_ACCESS_TOKEN,
});

export const authenticateWithNotion = async (code: string): Promise<string> => {
  const response = await notion.oauth.token(NOTION_CLIENT_ID, NOTION_CLIENT_SECRET, code, NOTION_REDIRECT_URI);
  if (!response.access_token) {
    throw new Error("Failed to authenticate with Notion: No access token returned.");
  }
  return response.access_token;
};