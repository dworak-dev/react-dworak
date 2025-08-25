// TODO: verify and/or rewrite this file because it was written entirely with AI.
// (even if it seems to work fine)

/*
 * This rule is highly opinionated.
 * There is no need for pages, layouts or other next.js spcial files to have a named export.
 * This ruled is meant to enforce anonymous export defaults on such files.
 * Keep in mind this rule was completely written with AI.
 * dworak.dev
 */

/** @type {import("eslint").Rule.RuleModule} */
export const anonymousExportDefaultRule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce anonymous export defaults for Next.js pages and layouts",
      category: "Stylistic Issues",
      recommended: false,
    },
    fixable: null,
    schema: [],
    messages: {
      anonymousExportRequired:
        "Next.js pages and layouts should use anonymous export defaults (e.g., 'export default () => { ... }' or 'export default function() { ... }')",
    },
  },
  create(context) {
    return {
      ExportDefaultDeclaration(node) {
        const filename = context.getFilename();

        // Extract just the filename without path and extension
        const fileBasename = filename.split(/[/\\]/).pop();
        const nameWithoutExtension = fileBasename.replace(/\.[^/.]+$/, "");

        // Check if this is a Next.js special file (page, layout, not-found, loading, error, etc.)
        const nextJsSpecialFiles = [
          "page",
          "layout",
          "not-found",
          "loading",
          "error",
          "global-error",
          "route",
          "template",
          "default",
        ];

        if (!nextJsSpecialFiles.includes(nameWithoutExtension)) {
          return;
        }

        // Check if the export default is anonymous
        let isAnonymous = false;

        if (node.declaration) {
          if (node.declaration.type === "FunctionDeclaration") {
            // Function declaration: export default function() {} (anonymous) vs export default function Name() {} (named)
            isAnonymous = !node.declaration.id;
          } else if (node.declaration.type === "ArrowFunctionExpression") {
            // Arrow function: export default () => {} (always anonymous)
            isAnonymous = true;
          } else if (node.declaration.type === "FunctionExpression") {
            // Function expression: export default function() {} (anonymous) vs export default function name() {} (named)
            isAnonymous = !node.declaration.id;
          }
          // Other types like class declarations, identifiers, etc. are considered named
        }

        if (!isAnonymous) {
          context.report({
            node,
            messageId: "anonymousExportRequired",
          });
        }
      },
    };
  },
};
