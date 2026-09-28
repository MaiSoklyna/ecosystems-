require("dotenv").config();
const https = require("https");

const NOTION_API_KEY = process.env.NOTION_API_KEY;
if (!NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY is missing. Set it in .env");
}

const PAGE_ID = "3e9e3368-5dc4-8127-a631-eedfa1b77a8a";

function makeRequest(path, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = https.request(
      {
        hostname: "api.notion.com",
        path: path,
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + NOTION_API_KEY,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(body);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(parsed);
            } else {
              reject(parsed);
            }
          } catch {
            reject(new Error(body));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function addContent() {
  console.log("=== Adding Q&A content to page ===");

  const blocks = [
    { object: "block", type: "callout", callout: { rich_text: [{ type: "text", text: { content: "Prepared questions and answers for presentation day. Use these to facilitate discussion and address common concerns from participants." } }], icon: { emoji: "🎤" } } },
    { object: "block", type: "heading_1", heading_1: { rich_text: [{ type: "text", text: { content: "Opening Questions (Ice Breakers)" } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q1: What brought you to this workshop today?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Encourage participants to share briefly. Common answers: work pressure, sleep issues, wanting better work-life balance, manager recommended it." } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q2: On a scale of 1-10, how stressed do you feel right now?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Do a quick show of hands. This sets a baseline. Revisit at the end of the day to measure change." } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q3: When you hear stress management, what is the first thing that comes to mind?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Address misconceptions (e.g., just relax, avoid work). Clarify that stress management is about building resilience, not eliminating stress." } }] } },
    { object: "block", type: "heading_1", heading_1: { rich_text: [{ type: "text", text: { content: "Content Questions (During Presentation)" } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q4: How do I know if my stress level is unhealthy?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Signs of unhealthy stress include: persistent fatigue, difficulty sleeping, irritability, headaches, reduced productivity, and withdrawal from social activities. If stress interferes with daily functioning for more than two weeks, consider consulting a professional." } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q5: Can stress ever be good for you?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Yes! Eustress (positive stress) motivates us to meet deadlines, perform well, and grow. The key is balance. Chronic, unmanaged stress (distress) is what harms health." } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q6: How long does it take to see results from these techniques?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Breathing exercises can provide immediate relief. Mindfulness practices typically show benefits within 2-4 weeks of daily practice. Building long-term resilience is a continuous journey." } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q7: What if I do not have time to practice these techniques daily?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Start small. Even 2-3 minutes of deep breathing between meetings makes a difference. Integrate techniques into existing routines: breathe deeply while waiting for emails to load, or practice mindfulness during your commute." } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q8: Can these techniques help with anxiety and depression?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "These techniques complement professional treatment but do not replace it. Mindfulness and breathing exercises are evidence-based tools that can reduce symptoms. If you experience severe anxiety or depression, please seek help from a mental health professional." } }] } },
    { object: "block", type: "heading_1", heading_1: { rich_text: [{ type: "text", text: { content: "Practical Application Questions" } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q9: How can I practice mindfulness at my desk without looking strange?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Try the 5-4-3-2-1 grounding technique: notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. Or simply take 3 slow breaths with your eyes open. No one will notice." } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q10: My manager does not believe in stress management. What should I do?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Focus on what you can control. Practice techniques privately. Share data: companies with wellness programs see 25% lower turnover and 20% higher productivity. Frame it as performance optimization, not self-care." } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q11: How do I handle stress from a difficult colleague or boss?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Set boundaries clearly and calmly. Use I statements: I feel overwhelmed when multiple urgent requests come at once. Can we prioritize? Practice emotional regulation techniques before difficult conversations." } }] } },
    { object: "block", type: "heading_1", heading_1: { rich_text: [{ type: "text", text: { content: "Closing Questions (End of Day)" } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q12: What is the ONE technique you will start using tomorrow?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Ask participants to write down their commitment. Research shows that writing down intentions increases follow-through by 42%." } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q13: What support do you need to maintain these habits?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Common needs: accountability partner, reminders, follow-up sessions, access to guided meditations. Offer the 30-day action plan and follow-up email series as support tools." } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q14: How has your stress level changed since this morning?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Revisit the 1-10 scale from the opening. Celebrate improvements, no matter how small. Remind participants that change is gradual and every step counts." } }] } },
    { object: "block", type: "heading_1", heading_1: { rich_text: [{ type: "text", text: { content: "Difficult Questions (Be Prepared)" } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q15: I tried meditation before and it did not work for me. Why should I try again?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "There are many types of meditation. Mindfulness is just one approach. If sitting still does not work, try walking meditation, body scan, or guided visualization. The key is finding what resonates with YOU." } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q16: Is this just corporate wellness fluff, or does it actually work?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Share evidence: A 2023 meta-analysis in JAMA found mindfulness programs reduce stress with an effect size of 0.5 (moderate to large). Companies like Google, SAP, and Intel report measurable productivity gains from mindfulness programs." } }] } },
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: "Q17: What if I have a medical condition? Can I still participate?" } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Most techniques are gentle and safe. However, if you have cardiovascular issues, severe anxiety disorders, or are pregnant, consult your doctor before practicing intensive breathing exercises. All activities are optional." } }] } },
    { object: "block", type: "divider", divider: {} },
    { object: "block", type: "callout", callout: { rich_text: [{ type: "text", text: { content: "Tip for presenter: Keep answers concise (1-2 minutes). If a question requires deeper discussion, offer to continue during the break or after the session." } }], icon: { emoji: "💡" } } },
  ];

  await makeRequest("/v1/blocks/" + PAGE_ID + "/children", {
    children: blocks,
  });

  console.log("All Q&A content added successfully.");
}

(async () => {
  try {
    await addContent();
    console.log("\n=== Done ===");
    console.log(`Page URL: https://app.notion.com/p/${PAGE_ID.replace(/-/g, "")}`);
  } catch (error) {
    console.error("\n=== ERROR ===");
    console.error(JSON.stringify(error, null, 2));
    process.exit(1);
  }
})();
