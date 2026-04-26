import { getBySlug, updatePost } from "./src/lib/posts";

async function run() {
  const post = await getBySlug("deconstructing-ai-eval-lab-workings");
  if (!post) {
    console.error("Post not found");
    return;
  }

  const adminSection = `
### The "Oh yeah, I need an Admin Panel" Phase

I almost forgot—I actually needed a way to manage all this. It's mostly just standard CRUD but it was essential for making the assessment dynamic. 

The admin dashboard handles:
- **Assessment Management**: Creating new tasks, defining the KiCad files, and setting up the rubrics.
- **AI Content Gen**: I added buttons to auto-generate the probing questions and pre-render the Gemini TTS audio so the student doesn't hit latency during the test. 
- **The "Regrade" Button**: Critical for when the LLM grader has a brain-fart. I can manually trigger a regrade or override a verdict if the telemetry capture was slightly off.
- **Telemetry Deep-Dive**: I can actually see the raw snapshots and Q&A pairs for every student session to verify why the AI gave a certain score.

Nothing fancy, just standard Next.js + Prisma stuff, but it's where the "Reference Design" lives that the grader uses to compare the student's work.
`;

  const newContent = post.content.replace('### Deployment: EC2, Docker', adminSection + '\n### Deployment: EC2, Docker');
  
  await updatePost(post.id, { content: newContent });
  console.log("DONE");
}

run();
