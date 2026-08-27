import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// ESLint 9 flat config. Next 16's eslint-config-next ships native flat-config arrays,
// so we spread them directly instead of the FlatCompat shim (which threw
// "Converting circular structure to JSON" under ESLint 9.39 + the next plugin).
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [".next/**", "node_modules/**", "out/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
