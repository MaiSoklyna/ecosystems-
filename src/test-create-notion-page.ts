require("dotenv").config();
import { Client } from "@notionhq/client";

const NOTION_API_KEY = process.env.NOTION_API_KEY;

if (!NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY is missing. Set it in .env");
}

const notion = new Client({ auth: NOTION_API_KEY });

async function findParent() {
  console.log("=== Step 1: Searching for accessible pages/databases ===");
  const search = await notion.search({ page_size: 10 });
  console.log(`Found ${search.results.length} results`);

  const databases = search.results.filter((r: any) => r.object === "database");
  const pages = search.results.filter((r: any) => r.object === "page");

  console.log(`  Databases: ${databases.length}`);
  databases.forEach((db: any) => {
    const title = db.title?.[0]?.plain_text || db.id;
    console.log(`    - ${title} (id: ${db.id})`);
  });

  console.log(`  Pages: ${pages.length}`);
  pages.forEach((p: any) => {
    const title = p.properties?.title?.title?.[0]?.plain_text || p.id;
    console.log(`    - ${title} (id: ${p.id})`);
  });

  if (databases.length > 0) {
    return { type: "database_id", id: databases[0].id, name: databases[0].title?.[0]?.plain_text || databases[0].id };
  }
  if (pages.length > 0) {
    return { type: "page_id", id: pages[0].id, name: p.properties?.title?.title?.[0]?.plain_text || pages[0].id };
  }
  throw new Error("No accessible database or page found to use as parent.");
}

async function createPage(parent: { type: string; id: string; name: string }) {
  console.log("\n=== Step 2: Creating Notion page ===");
  console.log(`Parent: ${parent.name} (${parent.type}: ${parent.id})`);

  const properties: any = {
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
    parent: { [parent.type]: parent.id },
    properties,
    children,
  });

  return response;
}

async function verifyPage(pageId: string) {
  console.log("\n=== Step 4: Reading page back ===");
  const page = await notion.pages.retrieve({ page_id: pageId });
  console.log("Page retrieved successfully:");
  console.log(`  ID: ${page.id}`);
  console.log(`  URL: ${(page as any).url}`);
  console.log(`  Created: ${(page as any).created_time}`);
  return page;
}

(async () => {
  try {
    const parent = await findParent();
    const newPage = await createPage(parent);

    console.log("\n=== Step 3: Page created ===");
    console.log(`Page ID: ${newPage.id}`);
    console.log(`Page URL: ${(newPage as any).url}`);

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
