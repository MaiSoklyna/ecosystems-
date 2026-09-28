require("dotenv").config();
const { Client } = require("@notionhq/client");

const NOTION_API_KEY = process.env.NOTION_API_KEY;
if (!NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY is missing. Set it in .env");
}

const notion = new Client({ auth: NOTION_API_KEY });
const PAGE_ID = "3e9e3368-5dc4-814f-a2f3-fd4328dab00b";

async function appendContent() {
  console.log("=== Appending detailed content to Stress Management Workshop ===");

  await notion.blocks.children.append({
    block_id: PAGE_ID,
    children: [
      {
        object: "block",
        type: "divider",
        divider: {},
      },
      {
        object: "block",
        type: "heading_1",
        heading_1: {
          rich_text: [{ type: "text", text: { content: "Course Overview" } }],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "This workshop is designed to help participants understand, identify, and effectively manage stress in both personal and professional environments. Led by experienced trainer Mai Soklyna, the program combines evidence-based techniques with practical exercises to build lasting resilience.",
              },
            },
          ],
        },
      },
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Learning Objectives" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Understand the physiological and psychological mechanisms of stress" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Identify personal stress triggers and early warning signs" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Apply practical stress reduction techniques in daily life" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Develop a personalized stress management action plan" } }],
        },
      },
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Target Audience" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Working professionals experiencing high-pressure environments" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Team leaders and managers seeking to support employee wellbeing" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Individuals looking to improve work-life balance" } }],
        },
      },
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Key Topics" } }],
        },
      },
      {
        object: "block",
        type: "numbered_list_item",
        numbered_list_item: {
          rich_text: [{ type: "text", text: { content: "Introduction to Stress: Types, Causes, and Effects" } }],
        },
      },
      {
        object: "block",
        type: "numbered_list_item",
        numbered_list_item: {
          rich_text: [{ type: "text", text: { content: "Mindfulness and Meditation Practices" } }],
        },
      },
      {
        object: "block",
        type: "numbered_list_item",
        numbered_list_item: {
          rich_text: [{ type: "text", text: { content: "Breathing Techniques and Relaxation Exercises" } }],
        },
      },
      {
        object: "block",
        type: "numbered_list_item",
        numbered_list_item: {
          rich_text: [{ type: "text", text: { content: "Time Management and Prioritization Strategies" } }],
        },
      },
      {
        object: "block",
        type: "numbered_list_item",
        numbered_list_item: {
          rich_text: [{ type: "text", text: { content: "Building Resilience and Emotional Intelligence" } }],
        },
      },
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Schedule" } }],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "Date: " },
              annotations: { bold: true },
            },
            { type: "text", text: { content: "September 28, 2026" } },
          ],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "Duration: " },
              annotations: { bold: true },
            },
            { type: "text", text: { content: "Full day (8 hours including breaks)" } },
          ],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "Format: " },
              annotations: { bold: true },
            },
            { type: "text", text: { content: "In-person interactive workshop with group activities and individual reflection exercises" } },
          ],
        },
      },
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Trainer Profile" } }],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "Mai Soklyna" },
              annotations: { bold: true },
            },
            {
              type: "text",
              text: {
                content: " is a certified wellness and stress management specialist with over 10 years of experience conducting corporate training programs. She specializes in mindfulness-based stress reduction (MBSR) and workplace mental health initiatives.",
              },
            },
          ],
        },
      },
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Materials Provided" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Comprehensive course workbook" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Guided meditation audio recordings" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Personal stress assessment tool" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "30-day follow-up action plan template" } }],
        },
      },
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Contact & Registration" } }],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "For registration or inquiries, please contact the OPP Training Department. Spaces are limited to ensure personalized attention for all participants." },
            },
          ],
        },
      },
      {
        object: "block",
        type: "callout",
        callout: {
          rich_text: [
            {
              type: "text",
              text: { content: "This course was created through Primacode automation. All content is managed via the Notion API integration." },
            },
          ],
          icon: { emoji: "💡" },
        },
      },
    ],
  });

  console.log("Content appended successfully.");
}

async function verifyContent() {
  console.log("\n=== Verifying updated page ===");
  const blocks = await notion.blocks.children.list({ block_id: PAGE_ID });
  console.log(`Total blocks: ${blocks.results.length}`);
  blocks.results.forEach((block, i) => {
    const text = block[block.type]?.rich_text?.[0]?.plain_text || "";
    console.log(`  ${i + 1}. [${block.type}] ${text.substring(0, 60)}${text.length > 60 ? "..." : ""}`);
  });
}

(async () => {
  try {
    await appendContent();
    await verifyContent();
    console.log("\n=== Done ===");
  } catch (error) {
    console.error("\n=== ERROR ===");
    console.error("Code:", error.code || "N/A");
    console.error("Message:", error.message);
    if (error.stack) console.error("Stack:", error.stack);
    process.exit(1);
  }
})();
