import Image from 'next/image';
import { Inter } from 'next/font/google';
import { WavyBackground } from '../components/ui/wavy-background';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className='min-h-screen'>
      <WavyBackground className="max-w-4xl mx-auto pb-40">
        <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">Research Lens</p>
        <p className="text-base md:text-2xl mt-4 text-white font-normal inter-var text-center">Save Time - Learn More</p>
        <Link className="flex justify-center font-bold" href={'/search'}>
          <button className="border border-white rounded-xl p-2 m-2">Get Started</button>
        </Link>
      </WavyBackground>
    </main>
  );
}
