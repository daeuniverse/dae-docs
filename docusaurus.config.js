// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/palenight");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Dae",
  tagline: "A Linux high-performance transparent proxy solution based on eBPF",
  // favicon: 'img/favicon.ico',
  favicon: "https://github.com/daeuniverse/assets/raw/master/logo.png",

  // Set the production url of your site here
  url: "https://dae.v2raya.org",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "daeuniverse", // Usually your GitHub org/user name.
  projectName: "dae", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Dae",
        logo: {
          alt: "Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "docsVersionDropdown",
          },
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Documentation",
          },
          {
            href: "https://github.com/daeuniverse/dae",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https://t.me/daeuniverse",
            label: "Telegram",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} @daeuniverse. Built with Docusaurus, hosted on Kubernetes.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
