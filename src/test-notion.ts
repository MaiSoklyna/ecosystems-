import {
  fetchNotionPage,
  updateNotionPage,
  listNotionDatabases,
  fetchNotionDatabase,
} from "./services/notion-api";

const NOTION_API_KEY = process.env.NOTION_API_KEY;

if (!NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY is missing at runtime. Ensure the environment variable is set.");
}

(async () => {
  try {
    console.log("Initializing Notion client...");
    const notion = new Client({
      auth: NOTION_API_KEY,
    });

    console.log("Listing Notion databases...");
    const databases = await listNotionDatabases();

    console.log("Found databases:");
    databases.forEach((db: any) => {
      console.log(`- ${db.id}`);
    });

    if (databases.length > 0) {
      const firstDatabaseId = databases[0].id;
      console.log(`\nFetching first database: ${firstDatabaseId}...`);
      const database = await fetchNotionDatabase(firstDatabaseId);
      console.log("Database fetched successfully:", database);
    }

    const testPageId = "test-page-id";
    console.log(`\nFetching test page: ${testPageId}...`);
    const page = await fetchNotionPage(testPageId);
    console.log("Page fetched successfully:", page);

    console.log("\nUpdating page...");
    const updateData = { title: "Updated page title" };
    const updatedPage = await updateNotionPage(testPageId, updateData);
    console.log("Page updated successfully:", updatedPage);

  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : "Unknown error");
    if (error instanceof Error) {
      console.error("Stack:", error.stack);
    }
  }
})();