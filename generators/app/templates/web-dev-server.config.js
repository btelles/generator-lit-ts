import { legacyPlugin } from "@web/dev-server-legacy";

export default {
  nodeResolve: true,
  preserveSymlinks: true,
  appIndex: "packages/<%= directoryPath %>dev/index.html",
  rootDir: "../../",
  plugins: [
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false
      }
    })
  ]
};
