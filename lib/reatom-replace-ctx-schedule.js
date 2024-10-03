const newImport = 'import { wrap } from "@reatom/framework";\n';
const isImportICareAbout = (node) => {
    return (
        node.specifiers.some(
            (specifier) =>
                specifier.type === 'ImportSpecifier' &&
                specifier.imported.name === 'wrap' &&
                node.source.value === '@reatom/framework'
        )
    );
};

const rule = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Don't use deprecated methods ctx.schedule",
        },
        fixable: "code",
        hasSuggestion: true,
        schema: []
    },
    create(context) {
        let hasImport = false;
        let lastImport = null;

        return {
            ImportDeclaration(node) {
                lastImport = node;
                if (isImportICareAbout(node)) {
                    hasImport = true;
                }
            },
            CallExpression(node) {
                if (
                    node.callee.object &&
                    node.callee.object.name === 'ctx' &&
                    node.callee.property.name === 'schedule'
                ) {
                    let cb = node.arguments[0];
                    let n = node.arguments[1];

                    context.report({
                        node,
                        message: "Use 'wrap(ctx, cb, n)' instead of deprecated 'ctx.schedule(cb, n)'.",
                        fix(fixer) {
                            const fixes = [];
                            const sourceCode = context.getSourceCode();

                            const callbackText = cb ? sourceCode.getText(cb) : "() => {}";
                            const nText = n ? `, ${sourceCode.getText(n)}` : '';

                            fixes.push(
                                fixer.replaceText(node, `wrap(ctx, ${callbackText}${nText})`)
                            );

                            if (!hasImport) {
                                fixes.push(lastImport
                                    ? fixer.insertTextBefore(lastImport, newImport)
                                    : fixer.insertTextAfterRange([0, 0], newImport)
                                );
                            }

                            return fixes;
                        },
                    });
                }
            },
        };
    },
};

module.exports = { rule };
