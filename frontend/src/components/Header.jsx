import { Rocket, Star, Globe } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-purple-900 to-black text-white py-6 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Rocket className="h-8 w-8 text-blue-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            NASA Space Explorer
          </h1>
          <Star className="h-8 w-8 text-yellow-400" />
        </div>
        <p className="text-center text-lg text-gray-300 max-w-2xl mx-auto">
          Explore the wonders of space through NASA's incredible data and imagery
        </p>
      </div>
    </header>
  );
};

export default Header;

