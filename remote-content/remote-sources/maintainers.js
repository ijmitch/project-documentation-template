/**
 * Maintainers Remote Content
 *
 * Downloads the MAINTAINERS.md file from the IBM repository
 * and transforms it into docs/community/maintainers.md
 */

import { createContentWithSource } from './utils.js';

export default [
  'docusaurus-plugin-remote-content',
  {
    // Basic configuration
    name: 'maintainers',
    sourceBaseUrl: 'https://raw.githubusercontent.com/ibm/repo-template/main/',
    outDir: 'docs/community',
    documents: ['MAINTAINERS.md'],

    // Plugin behavior
    noRuntimeDownloads: false,  // Download automatically when building
    performCleanup: true,       // Clean up files after build

    // Transform the content for this specific document
    modifyContent(filename, content) {
      if (filename === 'MAINTAINERS.md') {
        return createContentWithSource({
          title: 'Maintainers',
          description: 'Maintainers and Community Guidelines for IBM Open Source',
          sidebarLabel: 'Maintainers',
          sidebarPosition: 2,
          filename: 'MAINTAINERS.md',
          newFilename: 'maintainers.md',
          repoUrl: 'https://github.com/IBM/repo-template',
          branch: 'main',
          content
        });
      }
      return undefined;
    },
  },
];
