import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

import { NEXT_JS_APPS, SOURCE_ASSETS_DIR } from "./config";
import { logger } from "./logger";
import { resetNextJsProjectAssetsFolder } from "./resetNextJsProjectAssetsFolder";

const nextJsProjectsPaths = NEXT_JS_APPS.map((app) =>
  path.resolve(__dirname, "../../..", app),
);

// Source directory for assets
const sourceAssetsDir = path.resolve(__dirname, "..", SOURCE_ASSETS_DIR);

// Function to generate a hash from file content
const generateFileHash = (content: Buffer): string => {
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 12);
};

const processFile = async (file: string, projects: string[]) => {
  logger.info(`Processing file: ${file}`);
  const sourcePath = path.join(sourceAssetsDir, file);

  const fileContent = await fs.readFile(sourcePath);

  const fileHash = generateFileHash(fileContent);
  const fileExtension = path.extname(file);
  const hashedFilename = `${fileHash}${fileExtension}`;

  await Promise.all(
    projects.map(async (project) => {
      const targetAssetsDir = path.join(project, "public/assets");
      const targetPath = path.join(targetAssetsDir, hashedFilename);
      await fs.writeFile(targetPath, fileContent);
    }),
  );

  const varName = file
    .replace(fileExtension, "")
    .replace(/-/g, "_")
    .toUpperCase();

  return `  ${varName}: "/assets/${hashedFilename}",\n`;
};

(async () => {
  logger.info("Starting next-js-assets sync process...");

  // Reset all Next.js project assets folders
  await Promise.all(
    nextJsProjectsPaths.map((projectPath) =>
      resetNextJsProjectAssetsFolder(projectPath),
    ),
  );

  // Read all files from the source assets directory
  const files = await fs.readdir(sourceAssetsDir);

  let indexFileContent = "export const assets = {\n";

  const processedFiles = await Promise.all(
    files.map((file) => processFile(file, nextJsProjectsPaths)),
  );

  indexFileContent += processedFiles.join("");
  indexFileContent += "};\n";

  const indexFilePath = path.resolve(__dirname, "..", "src/assets.ts");
  await fs.writeFile(indexFilePath, indexFileContent);

  logger.info("Next-js-assets sync process completed successfully.");
})();
