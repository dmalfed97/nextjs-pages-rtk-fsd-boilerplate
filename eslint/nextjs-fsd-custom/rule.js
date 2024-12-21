module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce ordering of imports based on layerOrder',
      category: 'Stylistic Issues',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
  },

  create(context) {
    const layers = [
      "app",
      "processes",
      "pages",
      "widgets",
      "features",
      "entities",
      "shared"
    ];

    const layersRegExpPattern = `(${layers.join('|')})(?![\\w\\.-])`;
    const layersRegex = new RegExp(layersRegExpPattern, 'i');

    return {
      ImportDeclaration(node) {
        // sourcePath check
        const importPath = node.source.value;

        const match = importPath.match(layersRegex);

        if (!match) {
          return;
        }

        const layer = match[1];
        const currentIndex = layers.indexOf(layer);

        // Get all previous imports until current
        const allNodes = context.getSourceCode().ast.body.filter((n) => n.type === 'ImportDeclaration');
        // Through local.name we solve the problem of importing multiple modules from one import source (import type)
        const nodeIndex = allNodes.findIndex((n) => n.source.value === node.source.value && node.specifiers[0].local.name === n.specifiers[0].local.name);

        const previousImports = allNodes.slice(0, nodeIndex);

        for (const prev of previousImports) {
          const prevImportPath = prev.source.value;
          const prevMatch = prevImportPath.match(layersRegex);

          if (!prevMatch) {
            continue;
          }

          const prevLayer = prevMatch[1];
          const prevIndex = layers.indexOf(prevLayer);

          if (prevIndex > currentIndex) {
            context.report({
              node,
              message: `Import from layer "${layer}" should come before import from layer "${prevLayer}"`,
              fix: (fixer) => {
                const sourceCode = context.getSourceCode();
                const text = sourceCode.getText(node);
                const prevText = sourceCode.getText(prev);

                return [
                  fixer.replaceText(prev, text),
                  fixer.replaceText(node, prevText)
                ];
              }
            });

            break;
          }
        }
      }
    };
  }
};
