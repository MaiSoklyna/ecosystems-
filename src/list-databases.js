require("dotenv").config();
const { Client } = require("@notionhq/client");

const NOTION_API_KEY = process.env.NOTION_API_KEY;

if (!NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY is missing. Set it in .env");
}

const notion = new Client({ auth: NOTION_API_KEY });

async function listDatabases() {
  console.log("=== Searching for Notion databases ===\n");

  // Search all objects and filter client-side
  const search = await notion.search({ page_size: 100 });
  const databases = search.results.filter((r) => r.object === "database");

  if (databases.length === 0) {
    console.log("No databases found.");
    console.log("Make sure databases are shared with the 'Ecosystem' integration.");
    return [];
  }

  console.log(`Found ${databases.length} database(s):\n`);

  const results = [];

  for (let i = 0; i < databases.length; i++) {
    const db = databases[i];
    const name = db.title?.[0]?.plain_text || "Untitled";
    const id = db.id;

    console.log(`--- Database ${i + 1} ---`);
    console.log(`Name: ${name}`);
    console.log(`ID:   ${id}`);

    // Properties
    console.log("Properties:");
    const propNames = Object.keys(db.properties);
    propNames.forEach((propName) => {
      const prop = db.properties[propName];
      console.log(`  - ${propName}: ${prop.type}`);
    });

    // Test write access
    let writeAccess = "No";
    try {
      const testPage = await notion.pages.create({
        parent: { database_id: id },
        properties: buildMinimalProperties(db.properties, "Write Test"),
      });
      await notion.pages.update({
        page_id: testPage.id,
        in_trash: true,
      });
      writeAccess = "Yes";
    } catch (err) {
      writeAccess = "No";
    }

    console.log(`Write Access: ${writeAccess}`);
    console.log("");

    results.push({ name, id, properties: db.properties, writeAccess });
  }

  return results;
}

function buildMinimalProperties(properties, titleValue) {
  const props = {};
  for (const [key, value] of Object.entries(properties)) {
    if (value.type === "title") {
      props[key] = { title: [{ text: { content: titleValue } }] };
    }
  }
  if (Object.keys(props).length === 0) {
    const firstKey = Object.keys(properties)[0];
    if (firstKey) {
      props[firstKey] = { rich_text: [{ text: { content: titleValue } }] };
    }
  }
  return props;
}

function recommendDatabase(databases) {
  console.log("=== Recommendation ===\n");

  if (databases.length === 0) {
    console.log("No databases available.");
    console.log("Create a new database in Notion for OPP Course records.");
    return;
  }

  const scored = databases.map((db) => {
    let score = 0;
    const propTypes = Object.values(db.properties).map((p) => p.type);
    const propNames = Object.keys(db.properties).map((n) => n.toLowerCase());

    if (db.writeAccess === "Yes") score += 10;
    if (propTypes.includes("title")) score += 5;
    if (propTypes.includes("select")) score += 3;
    if (propTypes.includes("rich_text")) score += 2;
    if (propNames.some((n) => n.includes("status"))) score += 3;
    if (propNames.some((n) => n.includes("trainer") || n.includes("instructor") || n.includes("teacher"))) score += 3;
    if (propNames.some((n) => n.includes("course") || n.includes("class"))) score += 5;

    return { ...db, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const best = scored[0];

  console.log(`Best database for OPP Course records:`);
  console.log(`  Name: ${best.name}`);
  console.log(`  ID:   ${best.id}`);
  console.log(`  Score: ${best.score}/31`);
  console.log(`  Write Access: ${best.writeAccess}`);
  console.log("");

  if (best.writeAccess === "No") {
    console.log("WARNING: Best-scoring database lacks write access.");
    const writable = scored.find((d) => d.writeAccess === "Yes");
    if (writable) {
      console.log("Alternative with write access:");
      console.log(`  Name: ${writable.name}`);
      console.log(`  ID:   ${writable.id}`);
    }
  }

  console.log("\nAll databases ranked:");
  scored.forEach((db, i) => {
    console.log(`  ${i + 1}. ${db.name} (score: ${db.score}, write: ${db.writeAccess})`);
  });
}

(async () => {
  try {
    const databases = await listDatabases();
    recommendDatabase(databases);
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
