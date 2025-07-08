/**
 * Contributing Guide Remote Content
 *
 * Downloads the CONTRIBUTING.md file from the IBM repository
 * and transforms it into docs/community/contribute.md
 */

import { createContentWithSource } from './utils.js';

export default [
  'docusaurus-plugin-remote-content',
  {
    // Basic configuration
    name: 'contribute-guide',
    sourceBaseUrl: 'https://raw.githubusercontent.com/IBM/repo-template/main/',
    outDir: 'docs/community',
    documents: ['CONTRIBUTING.md'],

    // Plugin behavior
    noRuntimeDownloads: false,  // Download automatically when building
    performCleanup: true,       // Clean up files after build

    // Transform the content for this specific document
    modifyContent(filename, content) {
      if (filename === 'CONTRIBUTING.md') {
        return createContentWithSource({
              title: 'Contributing to IBM',
    description: 'Guidelines for contributing to the IBM project',
          sidebarLabel: 'Contributing',
          sidebarPosition: 1,
          filename: 'CONTRIBUTING.md',
          newFilename: 'contribute.md',
          repoUrl: 'https://github.com/ibm/repo-template',
          branch: 'dev',
          content,
          // Fix relative links in the content
          contentTransform: (content) => content.replace(/\(CODE_OF_CONDUCT\.md\)/g, '(code-of-conduct)')
        });
      }
      return undefined;
    },
  },
];
