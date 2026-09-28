import { Client } from "@notionhq/client";

const NOTION_API_KEY = process.env.NOTION_API_KEY;

const notion = new Client({
  auth: NOTION_API_KEY,
});

const fetchNotionPage = async (pageId: string): Promise<any> => {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch Notion page: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
}

const updateNotionPage = async (pageId: string, updateData: Record<string, any>): Promise<any> => {
  try {
    const response = await notion.pages.update({
      page_id: pageId,
      properties: updateData,
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to update Notion page: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

const listNotionDatabases = async (): Promise<any> => {
  try {
    const response = await notion.search({});
    return response.results.filter((result: any) => result.object === "database");
  } catch (error) {
    throw new Error(`Failed to list Notion databases: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

const fetchNotionDatabase = async (databaseId: string): Promise<any> => {
  try {
    const response = await notion.databases.retrieve({ database_id: databaseId });
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch Notion database: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

export {
  fetchNotionPage,
  updateNotionPage,
  listNotionDatabases,
  fetchNotionDatabase,
};