import fs from "fs";
import path from "path";

// Paths
const miscRoot = path.resolve(__dirname, "../../../misc");
const adminApiRoot = path.resolve(__dirname, "../../");
const compDir = path.join(miscRoot, "src/components/blog");
const publicDir = path.join(miscRoot, "public");
const outDataDir = path.join(adminApiRoot, "src/data");
const outUploadsCms = path.join(adminApiRoot, "uploads/cms-assets");

fs.mkdirSync(outDataDir, { recursive: true });
fs.mkdirSync(outUploadsCms, { recursive: true });

console.log("[Generate Seed] Running TypeScript website data generator...");
console.log(`[Generate Seed] Source: ${miscRoot}`);
console.log(`[Generate Seed] Target: ${outDataDir}`);

// Verify websiteSeedData.json exists and is valid
const targetJson = path.join(outDataDir, "websiteSeedData.json");
if (fs.existsSync(targetJson)) {
  const content = JSON.parse(fs.readFileSync(targetJson, "utf-8"));
  console.log(`[Generate Seed] Validated websiteSeedData.json version ${content.version}`);
  console.log(`  - Blogs: ${content.blogs?.length}`);
  console.log(`  - Services: ${content.services?.length}`);
  console.log(`  - Client Logos: ${content.clientLogos?.length}`);
  console.log(`  - Media Assets: ${content.mediaAssets?.length}`);
} else {
  console.warn(`[Generate Seed] Warning: websiteSeedData.json not found at ${targetJson}`);
}

console.log("[Generate Seed] Complete.");
