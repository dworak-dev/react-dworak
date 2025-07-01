import fs from "fs/promises";
import path from "path";

import { NEXT_JS_ASSETS_FOLDER } from "./config";
import { logger } from "./logger";

export const resetNextJsProjectAssetsFolder = async (projectPath: string) => {
  const assetsDir = path.join(projectPath, "public", NEXT_JS_ASSETS_FOLDER);

  try {
    // Try reading the directory
    const files = await fs.readdir(assetsDir);

    if (files.length > 0) {
      logger.info(
        `Deleting ${files.length} asset${files.length === 1 ? "" : "s"} in: ${assetsDir}`,
      );
    }

    // Delete all files in the directory
    await Promise.all(
      files.map((file) => fs.unlink(path.join(assetsDir, file))),
    );
  } catch (err: any) {
    // If the directory doesn't exist, create it
    if (err.code === "ENOENT") {
      logger.info(`Creating assets directory: ${assetsDir}`);
      await fs.mkdir(assetsDir, { recursive: true });
    } else {
      throw err;
    }
  }
};
