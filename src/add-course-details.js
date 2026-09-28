require("dotenv").config();
const { Client } = require("@notionhq/client");

const NOTION_API_KEY = process.env.NOTION_API_KEY;
if (!NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY is missing. Set it in .env");
}

const notion = new Client({ auth: NOTION_API_KEY });
const PAGE_ID = "3e9e3368-5dc4-814f-a2f3-fd4328dab00b";

async function appendDetails() {
  console.log("=== Adding detailed course sections ===");

  await notion.blocks.children.append({
    block_id: PAGE_ID,
    children: [
      { object: "block", type: "divider", divider: {} },

      // Pricing
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Pricing & Fee" } }],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            { type: "text", text: { content: "Early Bird (before 15 Sep 2026): " }, annotations: { bold: true } },
            { type: "text", text: { content: "$120 per participant" } },
          ],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            { type: "text", text: { content: "Regular Price: " }, annotations: { bold: true } },
            { type: "text", text: { content: "$150 per participant" } },
          ],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            { type: "text", text: { content: "Group Discount (5+ participants): " }, annotations: { bold: true } },
            { type: "text", text: { content: "$100 per participant" } },
          ],
        },
      },
      {
        object: "block",
        type: "callout",
        callout: {
          rich_text: [{ type: "text", text: { content: "Fee includes all course materials, refreshments, and certificate of completion." } }],
          icon: { emoji: "💰" },
        },
      },

      // Location
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Location & Venue" } }],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            { type: "text", text: { content: "OPP Training Center" }, annotations: { bold: true } },
          ],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Address: #42, Street 228, Sangkat Boeung Raing, Khan Daun Penh, Phnom Penh" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Room: Conference Hall B (Ground Floor)" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Map: https://maps.app.goo.gl/example-link" } }],
        },
      },

      // Prerequisites
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Prerequisites" } }],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: "No prior knowledge is required. This workshop is open to all experience levels. However, participants are encouraged to:" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Complete the pre-course self-assessment sent after registration" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Arrive with an open mind and willingness to participate in group activities" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Wear comfortable clothing suitable for light movement and breathing exercises" } }],
        },
      },

      // What to Bring
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "What to Bring" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Notebook and pen for personal reflections" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Water bottle (refill stations available on-site)" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Comfortable clothing and flat shoes" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Yoga mat (optional — a limited number will be provided)" } }],
        },
      },

      // Maximum Participants
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Class Size" } }],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            { type: "text", text: { content: "Maximum Participants: " }, annotations: { bold: true } },
            { type: "text", text: { content: "25" } },
          ],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: "We maintain a small class size to ensure personalized attention, meaningful group discussions, and interactive exercises for every participant." } }],
        },
      },

      // Certification
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Certification" } }],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: "All participants who complete the full workshop will receive a Certificate of Attendance issued by OPP Training Center. This certificate can be used for professional development records and continuing education credits where applicable." } }],
        },
      },

      // Language
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Language" } }],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: "The workshop will be conducted in Khmer with English handouts and materials. Trainer is bilingual and can answer questions in both languages." } }],
        },
      },

      // Refreshments
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Refreshments & Meals" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Morning coffee break: Fresh coffee, tea, and light pastries" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Lunch: Buffet-style Cambodian and international cuisine (vegetarian options available)" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Afternoon break: Fresh fruit, snacks, and beverages" } }],
        },
      },
      {
        object: "block",
        type: "callout",
        callout: {
          rich_text: [{ type: "text", text: { content: "Please inform us of any dietary restrictions or allergies at least 3 days before the workshop." } }],
          icon: { emoji: "🍽️" },
        },
      },

      // Cancellation Policy
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Cancellation Policy" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "More than 7 days before: Full refund minus $10 administrative fee" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "3-7 days before: 50% refund or transfer to next available session" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Less than 3 days before: No refund, but you may send a substitute participant at no extra charge" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "If OPP cancels the workshop: Full refund or free transfer to a future date" } }],
        },
      },

      // Testimonials
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Testimonials" } }],
        },
      },
      {
        object: "block",
        type: "quote",
        quote: {
          rich_text: [{ type: "text", text: { content: "This workshop completely changed how I handle pressure at work. The breathing techniques are now part of my daily routine." } }],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: "— Sopheap T., HR Manager" } }],
        },
      },
      {
        object: "block",
        type: "quote",
        quote: {
          rich_text: [{ type: "text", text: { content: "Mai Soklyna is an incredible trainer. She creates a safe space for everyone to open up and learn. Highly recommended!" } }],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: "— Vicheka L., Team Lead" } }],
        },
      },

      // FAQ
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Frequently Asked Questions" } }],
        },
      },
      {
        object: "block",
        type: "toggle",
        toggle: {
          rich_text: [{ type: "text", text: { content: "Can I attend if I have no prior experience with stress management?" } }],
          children: [
            {
              object: "block",
              type: "paragraph",
              paragraph: {
                rich_text: [{ type: "text", text: { content: "Absolutely. This workshop is designed for beginners and requires no prior knowledge. All techniques will be explained step-by-step." } }],
              },
            },
          ],
        },
      },
      {
        object: "block",
        type: "toggle",
        toggle: {
          rich_text: [{ type: "text", text: { content: "Will there be any physical exercises or yoga?" } }],
          children: [
            {
              object: "block",
              type: "paragraph",
              paragraph: {
                rich_text: [{ type: "text", text: { content: "The workshop includes light stretching and breathing exercises. No intense physical activity is required. You can participate at your own comfort level." } }],
              },
            },
          ],
        },
      },
      {
        object: "block",
        type: "toggle",
        toggle: {
          rich_text: [{ type: "text", text: { content: "Is the certificate recognized by employers?" } }],
          children: [
            {
              object: "block",
              type: "paragraph",
              paragraph: {
                rich_text: [{ type: "text", text: { content: "Yes. The certificate is issued by OPP Training Center and is recognized by many local and international organizations for professional development purposes." } }],
              },
            },
          ],
        },
      },
      {
        object: "block",
        type: "toggle",
        toggle: {
          rich_text: [{ type: "text", text: { content: "Can I get an invoice for my company?" } }],
          children: [
            {
              object: "block",
              type: "paragraph",
              paragraph: {
                rich_text: [{ type: "text", text: { content: "Yes. Please provide your company details during registration and we will issue a tax invoice within 3 business days." } }],
              },
            },
          ],
        },
      },

      // Parking / Transport
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Parking & Transport" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Parking: Free on-site parking available for 15 vehicles (first-come, first-served)" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Public Transport: Buses 1A, 2, and 4 stop within 200 meters of the venue" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Tuk-tuk / PassApp: Drop-off at Street 228 entrance" } }],
        },
      },
      {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: "Bicycle: Secure bicycle parking available at the rear entrance" } }],
        },
      },
      {
        object: "block",
        type: "callout",
        callout: {
          rich_text: [{ type: "text", text: { content: "We encourage carpooling or public transport to reduce our environmental footprint." } }],
          icon: { emoji: "🚲" },
        },
      },
    ],
  });

  console.log("All sections appended successfully.");
}

async function verifyContent() {
  console.log("\n=== Verifying updated page ===");
  const blocks = await notion.blocks.children.list({ block_id: PAGE_ID });
  console.log(`Total blocks: ${blocks.results.length}`);
}

(async () => {
  try {
    await appendDetails();
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
