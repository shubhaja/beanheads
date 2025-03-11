import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Use dynamic import to load the BeanHeadVisualizer component client-side only
// This prevents hydration errors since the beanheads library may use browser APIs
const BeanHeadVisualizer = dynamic(
  () => import('../components/BeanHeadVisualizer'),
  { ssr: false, loading: () => <div className="h-64 w-64 bg-gray-100 animate-pulse rounded-full mx-auto" /> }
);

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>BeanHeads Avatar Visualizer</title>
        <meta name="description" content="Visualize and customize BeanHeads avatars" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <BeanHeadVisualizer />
        
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mt-12 mb-4">About This Visualizer</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="mb-4">
              This is a simple visualizer for the{' '}
              <a 
                href="https://github.com/rbrcsk/beanheads" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                BeanHeads
              </a>{' '}
              avatar library. It allows you to:
            </p>
            
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Customize your avatar with different features</li>
              <li>Randomize the avatar appearance</li>
              <li>Get the React code to use in your projects</li>
            </ul>
            
            <p className="text-sm text-gray-600">
              Note: This visualizer imports the BeanHeads library directly, which will include the full library in your bundle.
              Consider using dynamic imports or other bundle optimization techniques in production applications.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12 py-6 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>BeanHeads Visualizer - Created with Next.js and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default Home; 