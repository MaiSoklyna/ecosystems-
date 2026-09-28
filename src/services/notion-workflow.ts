import { Client } from "@notionhq/client";

const NOTION_API_KEY = process.env.NOTION_API_KEY;

if (!NOTION_API_KEY) {
  throw new Error("Missing Notion API key environment variable.");
}

const notion = new Client({
  auth: NOTION_API_KEY,
});

const fetchWorkspacePages = async (): Promise<any> => {
  try {
    const response = await notion.search({});
    return response.results.filter((page: any) => page.object === "page");
  } catch (error) {
    throw new Error(`Failed to fetch workspace pages: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

const updatePageProperties = async (pageId: string, updateData: any): Promise<any> => {
  try {
    const response = await notion.pages.update(pageId, { properties: updateData });
    return response;
  } catch (error) {
    throw new Error(`Failed to update page properties: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

const fetchWorkspaceDatabases = async (): Promise<any> => {
  try {
    const response = await notion.search({});
    return response.results.filter((db: any) => db.object === "database");
  } catch (error) {
    throw new Error(`Failed to fetch workspace databases: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}