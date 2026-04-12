import { Car, Zap, Wrench, Cpu, Package, Gauge, Users, Sparkles, Rocket, Globe } from 'lucide-react';
import { CountdownTimer } from './components/CountdownTimer';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return <RouterProvider router={router} />;
}