/**
 * Custom ESLint rules for the project
 */
import { anonymousExportDefaultRule } from "./anonymous-export-default.js";
import { dashCaseFilenameRule } from "./dash-case-filename.js";

export const customRulesPlugin = {
  meta: {
    name: "custom-rules",
    version: "1.0.0",
  },
  rules: {
    "dash-case-filename": dashCaseFilenameRule,
    "anonymous-export-default": anonymousExportDefaultRule,
  },
};
