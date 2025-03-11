# Publishing to GitHub Packages

This document describes how to publish this package to GitHub Packages.

## Automatic Publishing (Recommended)

The easiest way to publish a new version is to:

1. Update the version in `package.json`
2. Commit your changes
3. Create a new release on GitHub
   - Go to the repository's Releases page
   - Click "Draft a new release"
   - Create a new tag (e.g., `v0.3.4`)
   - Add release notes
   - Publish the release

The GitHub Action workflow will automatically build and publish the package.

## Manual Publishing

If you need to publish manually:

1. Authenticate with GitHub Packages:

   ```bash
   # Create a Personal Access Token with `write:packages` scope
   # Then configure npm:
   npm login --registry=https://npm.pkg.github.com --scope=@shubhaja
   ```

2. Build and publish:

   ```bash
   cd core
   npm run build
   npm publish
   ```

## Installing in Other Projects

To use this package in another project:

1. Create or edit `.npmrc` in your project with:

   ```
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
   @shubhaja:registry=https://npm.pkg.github.com
   ```

2. Install the package:

   ```bash
   npm install @shubhaja/beanheads
   # or
   yarn add @shubhaja/beanheads
   ``` 