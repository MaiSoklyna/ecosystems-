const PptxGenJS = require("pptxgenjs");

const pptx = new PptxGenJS();

pptx.title = "Stress Management Workshop";
pptx.author = "Mai Soklyna";
pptx.company = "OPP Training Center";
pptx.subject = "Workplace Stress Management";

const primaryColor = "1F4E79";

// Slide 1: Title
const s1 = pptx.addSlide();
s1.background = { color: primaryColor };
s1.addText("Stress Management Workshop", {
  x: 0.5, y: 2.5, w: 9, h: 1.5, fontSize: 44, bold: true, color: "FFFFFF", align: "center"
});
s1.addText("Build Resilience, Reduce Burnout, Thrive at Work", {
  x: 0.5, y: 4.2, w: 9, h: 0.8, fontSize: 20, color: "D9E2F3", align: "center"
});
s1.addText("Presented by Mai Soklyna | OPP Training Center | September 28, 2026", {
  x: 0.5, y: 5.5, w: 9, h: 0.5, fontSize: 14, color: "B4C7DC", align: "center"
});

// Slide 2: Agenda
const s2 = pptx.addSlide();
s2.addText("Today's Agenda", { x: 0.5, y: 0.4, w: 9, h: 0.8, fontSize: 32, bold: true, color: primaryColor });
const agenda = [
  "Understanding Stress: Types, Causes, and Effects",
  "The Science of Stress: Body and Mind Connection",
  "Mindfulness and Meditation Practices",
  "Breathing Techniques and Relaxation Exercises",
  "Time Management and Prioritization Strategies",
  "Building Resilience and Emotional Intelligence",
  "Creating Your Personal Action Plan"
];
agenda.forEach((item, i) => {
  s2.addText(`${i + 1}. ${item}`, { x: 0.8, y: 1.4 + i * 0.6, w: 8.5, h: 0.5, fontSize: 18, color: "333333" });
});

// Slide 3: What is Stress?
const s3 = pptx.addSlide();
s3.addText("What is Stress?", { x: 0.5, y: 0.4, w: 9, h: 0.8, fontSize: 32, bold: true, color: primaryColor });
s3.addText("Stress is the body's natural response to perceived threats or demands.", {
  x: 0.5, y: 1.4, w: 9, h: 0.6, fontSize: 20, color: "333333"
});
// Eustress box
s3.addShape("rect", { x: 0.5, y: 2.3, w: 4, h: 2.5, fill: { color: "D9E2F3" } });
s3.addText("Eustress (Positive)", { x: 0.7, y: 2.5, w: 3.6, h: 0.5, fontSize: 18, bold: true, color: primaryColor });
s3.addText("Motivates performance\nEnhances focus\nPromotes growth\nShort-term bursts", {
  x: 0.7, y: 3.1, w: 3.6, h: 1.5, fontSize: 16, color: "333333"
});
// Distress box
s3.addShape("rect", { x: 5, y: 2.3, w: 4, h: 2.5, fill: { color: "FBE5D6" } });
s3.addText("Distress (Negative)", { x: 5.2, y: 2.5, w: 3.6, h: 0.5, fontSize: 18, bold: true, color: "C55A11" });
s3.addText("Causes anxiety\nReduces productivity\nHarms health\nChronic and overwhelming", {
  x: 5.2, y: 3.1, w: 3.6, h: 1.5, fontSize: 16, color: "333333"
});

// Slide 4: Signs of Unhealthy Stress
const s4 = pptx.addSlide();
s4.addText("Signs of Unhealthy Stress", { x: 0.5, y: 0.4, w: 9, h: 0.8, fontSize: 32, bold: true, color: primaryColor });
const signs = [
  { title: "Physical", items: ["Persistent fatigue", "Headaches", "Sleep issues", "Digestive problems"] },
  { title: "Emotional", items: ["Irritability", "Anxiety", "Feeling overwhelmed", "Withdrawal"] },
  { title: "Cognitive", items: ["Poor concentration", "Memory issues", "Negative thinking", "Indecisiveness"] },
  { title: "Behavioral", items: ["Procrastination", "Substance use", "Social isolation", "Reduced productivity"] }
];
signs.forEach((group, i) => {
  const col = i % 2 === 0 ? 0.5 : 5;
  const row = Math.floor(i / 2);
  s4.addText(group.title, { x: col, y: 1.4 + row * 2.4, w: 4, h: 0.4, fontSize: 18, bold: true, color: primaryColor });
  group.items.forEach((item, j) => {
    s4.addText(`• ${item}`, { x: col, y: 1.85 + row * 2.4 + j * 0.45, w: 4, h: 0.4, fontSize: 16, color: "333333" });
  });
});

// Slide 5: The Stress Response
const s5 = pptx.addSlide();
s5.addText("The Stress Response: Fight, Flight, or Freeze", {
  x: 0.5, y: 0.4, w: 9, h: 0.8, fontSize: 32, bold: true, color: primaryColor
});
s5.addText("When your brain perceives a threat, the amygdala triggers stress hormones:", {
  x: 0.5, y: 1.4, w: 9, h: 0.6, fontSize: 18, color: "333333"
});
// Adrenaline
s5.addShape("ellipse", { x: 1, y: 2.3, w: 2.2, h: 2.2, fill: { color: "D9E2F3" } });
s5.addText("Adrenaline", { x: 1.1, y: 3, w: 2, h: 0.5, fontSize: 16, bold: true, color: primaryColor, align: "center" });
s5.addText("Heart rate up\nEnergy surge\nAlertness", { x: 1.1, y: 3.5, w: 2, h: 0.8, fontSize: 14, color: "333333", align: "center" });
// Cortisol
s5.addShape("ellipse", { x: 3.8, y: 2.3, w: 2.2, h: 2.2, fill: { color: "D9E2F3" } });
s5.addText("Cortisol", { x: 3.9, y: 3, w: 2, h: 0.5, fontSize: 16, bold: true, color: primaryColor, align: "center" });
s5.addText("Blood sugar up\nImmune suppression\nMemory impact", { x: 3.9, y: 3.5, w: 2, h: 0.8, fontSize: 14, color: "333333", align: "center" });
// Norepinephrine
s5.addShape("ellipse", { x: 6.6, y: 2.3, w: 2.2, h: 2.2, fill: { color: "D9E2F3" } });
s5.addText("Norepinephrine", { x: 6.7, y: 3, w: 2, h: 0.5, fontSize: 16, bold: true, color: primaryColor, align: "center" });
s5.addText("Focus sharpens\nReaction time\nBlood pressure up", { x: 6.7, y: 3.5, w: 2, h: 0.8, fontSize: 14, color: "333333", align: "center" });
s5.addText("Chronic activation leads to burnout, illness, and decreased performance.", {
  x: 0.5, y: 5, w: 9, h: 0.6, fontSize: 16, color: "C55A11", italic: true, align: "center"
});

// Slide 6: Breathing Techniques
const s6 = pptx.addSlide();
s6.addText("Breathing Techniques: Your Fastest Tool", {
  x: 0.5, y: 0.4, w: 9, h: 0.8, fontSize: 32, bold: true, color: primaryColor
});
s6.addText("4-7-8 Breathing (Relaxation)", { x: 0.5, y: 1.4, w: 9, h: 0.5, fontSize: 22, bold: true, color: primaryColor });
s6.addText("Inhale 4s  →  Hold 7s  →  Exhale 8s", {
  x: 0.5, y: 1.95, w: 9, h: 0.5, fontSize: 18, color: "333333", align: "center"
});
s6.addText("Box Breathing (Focus)", { x: 0.5, y: 2.8, w: 9, h: 0.5, fontSize: 22, bold: true, color: primaryColor });
s6.addText("Inhale 4s  →  Hold 4s  →  Exhale 4s  →  Hold 4s", {
  x: 0.5, y: 3.35, w: 9, h: 0.5, fontSize: 18, color: "333333", align: "center"
});
s6.addText("Coherent Breathing (Balance)", { x: 0.5, y: 4.2, w: 9, h: 0.5, fontSize: 22, bold: true, color: primaryColor });
s6.addText("Breathe in for 5 seconds, out for 5 seconds. Maintain for 5 minutes.", {
  x: 0.5, y: 4.75, w: 9, h: 0.5, fontSize: 18, color: "333333", align: "center"
});
s6.addShape("rect", { x: 0.5, y: 5.4, w: 9, h: 0.6, fill: { color: "E2EFDA" } });
s6.addText("Practice now: Try 3 cycles of 4-7-8 breathing", {
  x: 0.5, y: 5.4, w: 9, h: 0.6, fontSize: 16, color: "375623", align: "center", valign: "middle"
});

// Slide 7: Mindfulness
const s7 = pptx.addSlide();
s7.addText("Mindfulness: Present-Moment Awareness", {
  x: 0.5, y: 0.4, w: 9, h: 0.8, fontSize: 32, bold: true, color: primaryColor
});
s7.addText("Mindfulness is paying attention to the present moment without judgment.", {
  x: 0.5, y: 1.4, w: 9, h: 0.5, fontSize: 18, color: "333333"
});
s7.addText("5-4-3-2-1 Grounding Technique", { x: 0.5, y: 2.1, w: 9, h: 0.5, fontSize: 22, bold: true, color: primaryColor });
const groundingItems = ["5 things you can SEE", "4 things you can TOUCH or FEEL", "3 things you can HEAR", "2 things you can SMELL", "1 thing you can TASTE"];
groundingItems.forEach((item, i) => {
  s7.addText(item, { x: 1, y: 2.7 + i * 0.55, w: 8, h: 0.5, fontSize: 18, color: "333333" });
});
s7.addShape("rect", { x: 0.5, y: 5.4, w: 9, h: 0.6, fill: { color: "E2EFDA" } });
s7.addText("This technique can be done anywhere, anytime, with eyes open.", {
  x: 0.5, y: 5.4, w: 9, h: 0.6, fontSize: 16, color: "375623", align: "center", valign: "middle"
});

// Slide 8: Time Management
const s8 = pptx.addSlide();
s8.addText("Time Management: The Eisenhower Matrix", {
  x: 0.5, y: 0.4, w: 9, h: 0.8, fontSize: 32, bold: true, color: primaryColor
});
// Quadrant 1
s8.addShape("rect", { x: 0.5, y: 1.5, w: 4.3, h: 1.8, fill: { color: "D9E2F3" } });
s8.addText("URGENT & IMPORTANT", { x: 0.6, y: 1.6, w: 4.1, h: 0.4, fontSize: 16, bold: true, color: primaryColor });
s8.addText("Do first\nDeadlines, crises, urgent meetings", { x: 0.6, y: 2.1, w: 4.1, h: 1, fontSize: 14, color: "333333" });
// Quadrant 2
s8.addShape("rect", { x: 5, y: 1.5, w: 4.3, h: 1.8, fill: { color: "E2EFDA" } });
s8.addText("NOT URGENT & IMPORTANT", { x: 5.1, y: 1.6, w: 4.1, h: 0.4, fontSize: 16, bold: true, color: "375623" });
s8.addText("Schedule\nPlanning, learning, exercise, relationships", { x: 5.1, y: 2.1, w: 4.1, h: 1, fontSize: 14, color: "333333" });
// Quadrant 3
s8.addShape("rect", { x: 0.5, y: 3.5, w: 4.3, h: 1.8, fill: { color: "FBE5D6" } });
s8.addText("URGENT & NOT IMPORTANT", { x: 0.6, y: 3.6, w: 4.1, h: 0.4, fontSize: 16, bold: true, color: "C55A11" });
s8.addText("Delegate\nSome emails, interruptions, minor tasks", { x: 0.6, y: 4.1, w: 4.1, h: 1, fontSize: 14, color: "333333" });
// Quadrant 4
s8.addShape("rect", { x: 5, y: 3.5, w: 4.3, h: 1.8, fill: { color: "F2F2F2" } });
s8.addText("NOT URGENT & NOT IMPORTANT", { x: 5.1, y: 3.6, w: 4.1, h: 0.4, fontSize: 16, bold: true, color: "7F7F7F" });
s8.addText("Eliminate\nSocial media, unnecessary meetings", { x: 5.1, y: 4.1, w: 4.1, h: 1, fontSize: 14, color: "333333" });

// Slide 9: Building Resilience
const s9 = pptx.addSlide();
s9.addText("Building Resilience: The 6 Pillars", {
  x: 0.5, y: 0.4, w: 9, h: 0.8, fontSize: 32, bold: true, color: primaryColor
});
const pillars = [
  { title: "1. Self-Awareness", desc: "Recognize your stress triggers and early warning signs" },
  { title: "2. Self-Regulation", desc: "Manage emotions through breathing, pause, and reframing" },
  { title: "3. Optimism", desc: "Maintain a realistic positive outlook during challenges" },
  { title: "4. Mental Agility", desc: "Adapt thinking and see situations from multiple perspectives" },
  { title: "5. Strengths of Character", desc: "Leverage your core values and moral compass" },
  { title: "6. Connection", desc: "Build supportive relationships and ask for help when needed" }
];
pillars.forEach((p, i) => {
  const col = i < 3 ? 0.5 : 5;
  const row = i % 3;
  s9.addShape("rect", { x: col, y: 1.4 + row * 1.5, w: 4.3, h: 1.3, fill: { color: "D9E2F3" } });
  s9.addText(p.title, { x: col + 0.1, y: 1.5 + row * 1.5, w: 4.1, h: 0.4, fontSize: 16, bold: true, color: primaryColor });
  s9.addText(p.desc, { x: col + 0.1, y: 1.95 + row * 1.5, w: 4.1, h: 0.6, fontSize: 14, color: "333333" });
});

// Slide 10: Action Plan
const s10 = pptx.addSlide();
s10.addText("Your 30-Day Action Plan", {
  x: 0.5, y: 0.4, w: 9, h: 0.8, fontSize: 32, bold: true, color: primaryColor
});
const weeks = [
  { week: "Week 1", tasks: ["Practice 4-7-8 breathing twice daily", "Identify your top 3 stress triggers", "Start a stress journal"] },
  { week: "Week 2", tasks: ["Try 5-minute morning mindfulness", "Apply the Eisenhower Matrix", "Set one boundary at work"] },
  { week: "Week 3", tasks: ["Practice 5-4-3-2-1 grounding when stressed", "Review and adjust your action plan", "Share your journey with a colleague"] },
  { week: "Week 4", tasks: ["Reflect on what is working", "Build a sustainable routine", "Plan your next growth step"] }
];
weeks.forEach((w, i) => {
  const x = i < 2 ? 0.5 : 5;
  const y = i % 2 === 0 ? 1.4 : 3.8;
  s10.addShape("rect", { x: x, y: y, w: 4.3, h: 2.2, fill: { color: "E2EFDA" } });
  s10.addText(w.week, { x: x + 0.1, y: y + 0.1, w: 4.1, h: 0.4, fontSize: 18, bold: true, color: "375623" });
  w.tasks.forEach((task, j) => {
    s10.addText(`• ${task}`, { x: x + 0.1, y: y + 0.55 + j * 0.5, w: 4.1, h: 0.45, fontSize: 14, color: "333333" });
  });
});

// Slide 11: Key Takeaways
const s11 = pptx.addSlide();
s11.background = { color: primaryColor };
s11.addText("Key Takeaways", {
  x: 0.5, y: 0.6, w: 9, h: 0.8, fontSize: 36, bold: true, color: "FFFFFF", align: "center"
});
const takeaways = [
  "Stress is not the enemy — unmanaged stress is",
  "Small, consistent practices beat occasional big efforts",
  "Breathing is your fastest, most accessible tool",
  "Mindfulness builds awareness without judgment",
  "Time management reduces stress at its source",
  "Resilience is a skill that can be learned and strengthened"
];
takeaways.forEach((t, i) => {
  s11.addText(`✓ ${t}`, { x: 1, y: 1.6 + i * 0.7, w: 8, h: 0.6, fontSize: 20, color: "FFFFFF" });
});

// Slide 12: Thank You
const s12 = pptx.addSlide();
s12.background = { color: primaryColor };
s12.addText("Thank You", { x: 0.5, y: 2.2, w: 9, h: 1, fontSize: 48, bold: true, color: "FFFFFF", align: "center" });
s12.addText("Questions & Discussion", { x: 0.5, y: 3.5, w: 9, h: 0.6, fontSize: 24, color: "D9E2F3", align: "center" });
s12.addText("Mai Soklyna | OPP Training Center", { x: 0.5, y: 4.5, w: 9, h: 0.5, fontSize: 18, color: "B4C7DC", align: "center" });
s12.addText("training@opp-center.kh | +855 23 123 4567", { x: 0.5, y: 5.1, w: 9, h: 0.4, fontSize: 16, color: "B4C7DC", align: "center" });

// Save
const outputPath = __dirname + "/Stress-Management-Workshop.pptx";
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log("=== PowerPoint Created ===");
    console.log(`File: ${outputPath}`);
    console.log("Slides: 12");
    console.log("\n=== Done ===");
  })
  .catch((err) => {
    console.error("Error creating PowerPoint:", err);
    process.exit(1);
  });
