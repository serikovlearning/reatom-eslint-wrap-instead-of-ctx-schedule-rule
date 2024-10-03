const { RuleTester } = require("eslint");
const { rule } = require("./reatom-replace-ctx-schedule");

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: 2015 }
});

ruleTester.run(
  "reatom-replace-ctx-schedule",
  rule,
  {
    valid: [
      {
        code: `import { wrap } from "@reatom/framework";\nwrap(ctx, () => {})`,
      },
      {
        code: `import { wrap } from "@reatom/framework";\nwrap(ctx, () => 'Dev')`,
      },
      {
        code: `import { wrap } from "@reatom/framework";\nwrap(ctx, () => 'Dev', -1)`,
      },

    ],
    invalid: [
      {
        code: "ctx.schedule()",
        output: `import { wrap } from "@reatom/framework";\nwrap(ctx, () => {})`,
        errors: 1
      },
      {
        code: "ctx.schedule(() => 'Dev')",
        output: `import { wrap } from "@reatom/framework";\nwrap(ctx, () => 'Dev')`,
        errors: 1
      },
      {
        code: "ctx.schedule(() => 'Dev', -1)",
        output: `import { wrap } from "@reatom/framework";\nwrap(ctx, () => 'Dev', -1)`,
        errors: 1
      },
    ],
  }
);

console.log("All tests passed!");