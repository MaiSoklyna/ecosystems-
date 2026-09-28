require("dotenv").config();
const { Client } = require("@notionhq/client");

const NOTION_API_KEY = process.env.NOTION_API_KEY;

if (!NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY is missing. Set it in .env");
}

const notion = new Client({ auth: NOTION_API_KEY });

// Page ID extracted from the shared Notion URL
const PAGE_ID = "3e9e33685dc4809ab0d9cb5385a697db";

async function inspectPage() {
  console.log("=== Step 1: Inspecting parent page ===");
  console.log(`Page ID: ${PAGE_ID}`);

  const page = await notion.pages.retrieve({ page_id: PAGE_ID });
  console.log(`Page title: ${page.properties?.title?.title?.[0]?.plain_text || "Untitled"}`);
  console.log(`Page URL: ${page.url}`);
  return page;
}

async function createPage() {
  console.log("\n=== Step 2: Creating child page ===");

  const properties = {
    title: {
      title: [{ text: { content: "OPP Course" } }],
    },
  };

  const children = [
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: [{ type: "text", text: { content: "Created by Primacode" } }],
      },
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: [{ type: "text", text: { content: "Notion Integration Test" } }],
      },
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: [{ type: "text", text: { content: "Date: 2026-09-28" } }],
      },
    },
  ];

  const response = await notion.pages.create({
    parent: { page_id: PAGE_ID },
    properties,
    children,
  });

  return response;
}

async function verifyPage(pageId) {
  console.log("\n=== Step 4: Reading page back ===");
  const page = await notion.pages.retrieve({ page_id: pageId });
  console.log("Page retrieved successfully:");
  console.log(`  ID: ${page.id}`);
  console.log(`  URL: ${page.url}`);
  console.log(`  Created: ${page.created_time}`);
  return page;
}

(async () => {
  try {
    const parentPage = await inspectPage();
    const newPage = await createPage();

    console.log("\n=== Step 3: Page created ===");
    console.log(`Page ID: ${newPage.id}`);
    console.log(`Page URL: ${newPage.url}`);

    await verifyPage(newPage.id);
    console.log("\n=== Test completed successfully ===");
  } catch (error) {
    console.error("\n=== ERROR ===");
    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    } else {
      console.error("Unknown error:", error);
    }
    process.exit(1);
  }
})();
