# BeanHeads Avatar Visualizer

A simple web application to visualize and customize avatars from the [BeanHeads](https://github.com/rbrcsk/beanheads) library.

## Features

- Interactive avatar customization
- Wide range of customization options (hair, eyes, mouth, accessories, etc.)
- Random avatar generation
- React code generation for easy implementation

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:

```bash
cd beanheads-visualizer
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the visualizer.

## Bundle Size Considerations

This visualizer imports the entire BeanHeads library directly, which impacts the bundle size. In a production application, consider using one of these optimization techniques:

1. **Dynamic Imports**: Load the avatar component only when needed
2. **Server-Side Rendering**: Generate avatars on the server
3. **Pre-Generated Images**: Create static avatar images during build time
4. **Cherry-pick Components**: Import only the specific components you need

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- BeanHeads avatar library

## License

MIT

---

This project demonstrates how to integrate and use the BeanHeads library in a React application, but is not affiliated with the official BeanHeads project. 