import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-black text-forge-700 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-snow mb-2">Lost on the mountain</h2>
      <p className="text-forge-400 mb-8">This page doesn't exist. Let's get you back on track.</p>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
