require("dotenv").config();
const { Client } = require("@notionhq/client");

const NOTION_API_KEY = process.env.NOTION_API_KEY;

if (!NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY is missing. Set it in .env");
}

const notion = new Client({ auth: NOTION_API_KEY });

const PARENT_PAGE_ID = "3e9e3368-5dc4-809a-b0d9-cb5385a697db";

async function createDatabase() {
  console.log("=== Step 1: Creating database 'OPP Courses' ===");
  console.log(`Parent page ID: ${PARENT_PAGE_ID}`);

  const response = await notion.databases.create({
    parent: { page_id: PARENT_PAGE_ID },
    title: [{ type: "text", text: { content: "OPP Courses" } }],
    properties: {
      Name: { title: {} },
      Trainer: {
        select: {
          options: [
            { name: "Mai Soklyna", color: "blue" },
          ],
        },
      },
      Status: {
        select: {
          options: [
            { name: "Draft", color: "yellow" },
            { name: "Active", color: "green" },
            { name: "Completed", color: "gray" },
          ],
        },
      },
      Date: { date: {} },
      Notes: { rich_text: {} },
    },
  });

  return response;
}

async function createFirstRecord(databaseId) {
  console.log("\n=== Step 3: Creating first record ===");

  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Name: { title: [{ text: { content: "Stress Management Workshop" } }] },
      Trainer: { select: { name: "Mai Soklyna" } },
      Status: { select: { name: "Draft" } },
      Date: { date: { start: "2026-09-28" } },
      Notes: { rich_text: [{ text: { content: "First course created through Primacode" } }] },
    },
  });

  return response;
}

(async () => {
  try {
    const db = await createDatabase();

    console.log("\n=== Step 2: Database created ===");
    console.log(`Database ID: ${db.id}`);
    console.log(`Database URL: ${db.url || `https://www.notion.so/${db.id.replace(/-/g, "")}`}`);
    console.log("Properties:");
    Object.entries(db.properties).forEach(([name, prop]) => {
      let extra = "";
      if (prop.type === "select" && prop.select?.options) {
        extra = ` [${prop.select.options.map((o) => o.name).join(", ")}]`;
      }
      console.log(`  - ${name}: ${prop.type}${extra}`);
    });

    const record = await createFirstRecord(db.id);

    console.log("\n=== Step 4: First record created ===");
    console.log(`Record ID: ${record.id}`);
    console.log(`Record URL: ${record.url}`);

    console.log("\n=== Done ===");
  } catch (error) {
    console.error("\n=== ERROR ===");
    if (error.code) {
      console.error(`Code: ${error.code}`);
    }
    if (error instanceof Error) {
      console.error("Message:", error.message);
      if (error.stack) {
        console.error("Stack:", error.stack);
      }
    } else {
      console.error("Unknown error:", JSON.stringify(error, null, 2));
    }
    process.exit(1);
  }
})();
