require("dotenv").config();
const { Client } = require("@notionhq/client");

const NOTION_API_KEY = process.env.NOTION_API_KEY;
if (!NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY is missing. Set it in .env");
}

const notion = new Client({ auth: NOTION_API_KEY });

// Parent page: Stress Management Workshop
const PARENT_PAGE_ID = "3e9e3368-5dc4-814f-a2f3-fd4328dab00b";

async function createQAPage() {
  console.log("=== Creating Q&A Form Page ===");

  const page = await notion.pages.create({
    parent: { page_id: PARENT_PAGE_ID },
    properties: {
      title: {
        title: [{ text: { content: "Q&A Form - Stress Management Workshop" } }],
      },
    },
    children: [
      {
        object: "block",
        type: "callout",
        callout: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Have a question about the Stress Management Workshop? Submit it below and our team will respond within 24 hours.",
              },
            },
          ],
          icon: { emoji: "❓" },
        },
      },
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "How to Submit Your Question" } }],
        },
      },
      {
        object: "block",
        type: "numbered_list_item",
        numbered_list_item: {
          rich_text: [{ type: "text", text: { content: "Copy the question template below" } }],
        },
      },
      {
        object: "block",
        type: "numbered_list_item",
        numbered_list_item: {
          rich_text: [{ type: "text", text: { content: "Fill in your details and question" } }],
        },
      },
      {
        object: "block",
        type: "numbered_list_item",
        numbered_list_item: {
          rich_text: [{ type: "text", text: { content: "Email your completed question to: training@opp-center.kh" } }],
        },
      },
      {
        object: "block",
        type: "numbered_list_item",
        numbered_list_item: {
          rich_text: [{ type: "text", text: { content: "We will post the answer here for everyone to see" } }],
        },
      },
      {
        object: "block",
        type: "divider",
        divider: {},
      },
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Question Template" } }],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            { type: "text", text: { content: "Your Name: " }, annotations: { bold: true } },
            { type: "text", text: { content: "_________________________________" } },
          ],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            { type: "text", text: { content: "Email Address: " }, annotations: { bold: true } },
            { type: "text", text: { content: "_________________________________" } },
          ],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            { type: "text", text: { content: "Phone Number: " }, annotations: { bold: true } },
            { type: "text", text: { content: "_________________________________" } },
          ],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            { type: "text", text: { content: "Question Category: " }, annotations: { bold: true } },
          ],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Course Content" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Pricing / Payment" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Registration" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Venue / Location" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Other" } }],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            { type: "text", text: { content: "Your Question: " }, annotations: { bold: true } },
          ],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: "_________________________________________________________________" } }],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: "_________________________________________________________________" } }],
        },
      },
      {
        object: "block",
        type: "divider",
        divider: {},
      },
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Submitted Questions & Answers" } }],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "No questions have been submitted yet. Be the first to ask!" },
              annotations: { italic: true, color: "gray" },
            },
          ],
        },
      },
      {
        object: "block",
        type: "divider",
        divider: {},
      },
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Contact Information" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [
            { type: "text", text: { content: "Email: " }, annotations: { bold: true } },
            { type: "text", text: { content: "training@opp-center.kh" } },
          ],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [
            { type: "text", text: { content: "Phone: " }, annotations: { bold: true } },
            { type: "text", text: { content: "+855 23 123 4567" } },
          ],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [
            { type: "text", text: { content: "Working Hours: " }, annotations: { bold: true } },
            { type: "text", text: { content: "Monday - Friday, 8:00 AM - 5:00 PM" } },
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
              text: { content: "For urgent inquiries, please call us directly. We typically respond to emails within 24 business hours." },
            },
          ],
          icon: { emoji: "📞" },
        },
      },
    ],
  });

  console.log("Q&A page created successfully.");
  return page;
}

(async () => {
  try {
    const page = await createQAPage();
    console.log("\n=== Page Created ===");
    console.log(`Page ID: ${page.id}`);
    console.log(`Page URL: ${page.url}`);
    console.log("\n=== Done ===");
  } catch (error) {
    console.error("\n=== ERROR ===");
    console.error("Code:", error.code || "N/A");
    console.error("Message:", error.message);
    if (error.stack) console.error("Stack:", error.stack);
    process.exit(1);
  }
})();
