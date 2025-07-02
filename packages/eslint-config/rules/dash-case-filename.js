/**
 * Rule to enforce dash-case naming for files in ui/src/components
 */
export const dashCaseFilenameRule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce dash-case naming for files in ui/src/components folder",
      category: "Stylistic Issues",
      recommended: false,
    },
    fixable: null,
    schema: [],
    messages: {
      dashCaseRequired:
        "File name '{{filename}}' should be in dash-case format (e.g., 'my-component.tsx')",
    },
  },
  create(context) {
    return {
      Program(node) {
        const filename = context.getFilename();

        // Check if the file is in ui/src/components folder
        if (
          !filename.includes("ui/src/components") &&
          !filename.includes("ui\\src\\components")
        ) {
          return;
        }

        // Extract just the filename without path and extension
        const fileBasename = filename.split(/[/\\]/).pop();
        const nameWithoutExtension = fileBasename.replace(/\.[^/.]+$/, "");

        // Check if the filename is in dash-case
        const isDashCase = /^[a-z]+(-[a-z]+)*$/.test(nameWithoutExtension);

        if (!isDashCase) {
          context.report({
            node,
            messageId: "dashCaseRequired",
            data: {
              filename: fileBasename,
            },
          });
        }
      },
    };
  },
};
