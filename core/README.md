# Bean Heads

Easily generate avatars for your projects with Bean Heads.

<p align="center">
  <img alt="Bean Heads Demo" src="https://raw.githubusercontent.com/shubhaja/beanheads/main/demo/demo.gif" />
</p>

## Installation

```bash
# Install from GitHub Packages
npm install @shubhaja/beanheads

# or with yarn
yarn add @shubhaja/beanheads
```

### GitHub Packages Configuration

Since this package is hosted on GitHub Packages, you'll need to authenticate:

1. Create a GitHub personal access token with the `read:packages` scope
2. Add this to your `.npmrc` file:

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
@shubhaja:registry=https://npm.pkg.github.com
```

## Usage

```tsx
import { Grumpy, AllInOne, Random } from '@shubhaja/beanheads';

// Use a specific avatar
function MyComponent() {
  return <Grumpy />;
}

// Use the all-in-one component
function AvatarSelector() {
  return <AllInOne />;
}

// Generate a random avatar
function RandomAvatar() {
  return <Random />;
}
```

## Documentation

For full documentation and examples, visit the [project website](https://beanheads.robertbroersma.com).

## License

MIT 