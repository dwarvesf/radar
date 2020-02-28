## analyze the Next.js app bundles
### Next provides us a way to analyze the code bundles that are generated.

- Open the package.json file of the app and in the scripts section add those 3 new commands:

    "analyze": "cross-env BUNDLE_ANALYZE=both npm run build",

- Then install package:

    npm install --dev cross-env @next/bundle-analyzer

- Add to next.config.js file in the project root, with this content:

    const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
    module.exports = withConfig(
    withPlugins([[withBundleAnalyzer]], nextConfig));

- Run the command:

    npm run analyze

- This should open 2 pages in the browser. One for the client bundles, and one for the server bundles:

![server-analyzing](server-analyzing.png)
![server-analyzing-1](server-analyzing-1.png)

![client-analyzing](client-analyzing.png)
![client-analyzing-1](client-analyzing-1.png)

