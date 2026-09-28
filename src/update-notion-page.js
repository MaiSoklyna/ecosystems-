require("dotenv").config();
const { Client } = require("@notionhq/client");

const NOTION_API_KEY = process.env.NOTION_API_KEY;

if (!NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY is missing. Set it in .env");
}

const notion = new Client({ auth: NOTION_API_KEY });

const PAGE_ID = "3e9e3368-5dc4-81e8-94a5-c5c23982b280";

async function readPage() {
  console.log("=== Step 1: Reading current page ===");
  const page = await notion.pages.retrieve({ page_id: PAGE_ID });
  console.log(`Page ID: ${page.id}`);
  console.log(`Page URL: ${page.url}`);
  console.log(`Title: ${page.properties?.title?.title?.[0]?.plain_text || "Untitled"}`);
  return page;
}

async function readBlocks() {
  console.log("\n=== Step 2: Reading current content blocks ===");
  const blocks = await notion.blocks.children.list({ block_id: PAGE_ID });
  console.log(`Found ${blocks.results.length} blocks`);
  blocks.results.forEach((block, i) => {
    const text = block[block.type]?.rich_text?.[0]?.plain_text || "";
    console.log(`  ${i + 1}. [${block.type}] ${text}`);
  });
  return blocks.results;
}

async function updatePageProperties() {
  console.log("\n=== Step 3: Updating page properties ===");

  try {
    const updated = await notion.pages.update({
      page_id: PAGE_ID,
      properties: {
        "Trainer": {
          rich_text: [{ text: { content: "Mai Soklyna" } }],
        },
        "Status": {
          select: { name: "Draft" },
        },
      },
    });
    console.log("Page properties updated successfully.");
    return updated;
  } catch (error) {
    console.log("Cannot set custom properties on a regular page (not a database entry).");
    console.log("Adding as content blocks instead...");
    return null;
  }
}

async function appendBlocks() {
  console.log("\n=== Step 4: Appending new content blocks ===");

  const response = await notion.blocks.children.append({
    block_id: PAGE_ID,
    children: [
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Trainer: Mai Soklyna" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Status: Draft" } }],
        },
      },
    ],
  });

  console.log("Blocks appended successfully.");
  return response;
}

async function verifyUpdate() {
  console.log("\n=== Step 5: Verifying updated content ===");
  const blocks = await notion.blocks.children.list({ block_id: PAGE_ID });
  console.log(`Total blocks: ${blocks.results.length}`);
  blocks.results.forEach((block, i) => {
    const text = block[block.type]?.rich_text?.[0]?.plain_text || "";
    console.log(`  ${i + 1}. [${block.type}] ${text}`);
  });
}

(async () => {
  try {
    await readPage();
    await readBlocks();
    const updated = await updatePageProperties();
    if (!updated) {
      await appendBlocks();
    }
    await verifyUpdate();
    console.log("\n=== Update completed successfully ===");
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
