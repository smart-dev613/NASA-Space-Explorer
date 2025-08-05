import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Calendar, Camera, Globe, Zap, Search, RefreshCw } from 'lucide-react';

import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import APODCard from './components/APODCard';
import MarsPhotoCard from './components/MarsPhotoCard';
import NEOChart from './components/NEOChart';
import { useAPOD, useMarsPhotos, useNEO, useNASAAPI } from './hooks/useNASAAPI';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('apod');
  const [marsParams, setMarsParams] = useState({ rover: 'curiosity', sol: '1000' });
  const [neoParams, setNeoParams] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  // API hooks
  const { data: apodData, loading: apodLoading, error: apodError, refetch: refetchAPOD } = useAPOD();
  const { data: marsData, loading: marsLoading, error: marsError, refetch: refetchMars } = useMarsPhotos(marsParams);
  const { data: neoData, loading: neoLoading, error: neoError, refetch: refetchNEO } = useNEO(neoParams);
  const { loading: searchLoading, error: searchError, searchNASA } = useNASAAPI();

  const handleMarsSearch = () => {
    refetchMars();
  };

  const handleNEOSearch = () => {
    const today = new Date();
    const startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    setNeoParams({
      start_date: startDate.toISOString().split('T')[0],
      end_date: today.toISOString().split('T')[0]
    });
  };

  const handleImageSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const results = await searchNASA({ q: searchQuery, media_type: 'image' });
      setSearchResults(results);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  useEffect(() => {
    if (activeTab === 'neo' && !neoData) {
      handleNEOSearch();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white shadow-lg rounded-xl p-2 border-2 border-gray-200">
            <TabsTrigger 
              value="apod" 
              className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg px-4 py-3 font-semibold transition-all duration-200 hover:bg-blue-50"
            >
              <Calendar className="h-4 w-4" />
              <span>APOD</span>
            </TabsTrigger>
            <TabsTrigger 
              value="mars" 
              className="flex items-center space-x-2 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg px-4 py-3 font-semibold transition-all duration-200 hover:bg-red-50"
            >
              <Camera className="h-4 w-4" />
              <span>Mars Photos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="neo" 
              className="flex items-center space-x-2 data-[state=active]:bg-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg px-4 py-3 font-semibold transition-all duration-200 hover:bg-yellow-50"
            >
              <Zap className="h-4 w-4" />
              <span>Near Earth Objects</span>
            </TabsTrigger>
            <TabsTrigger 
              value="search" 
              className="flex items-center space-x-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg px-4 py-3 font-semibold transition-all duration-200 hover:bg-purple-50"
            >
              <Search className="h-4 w-4" />
              <span>Image Search</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="apod" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Astronomy Picture of the Day</h2>
              <Button onClick={refetchAPOD} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
            
            {apodLoading && <LoadingSpinner message="Loading today's astronomy picture..." />}
            {apodError && <ErrorMessage message={apodError} onRetry={refetchAPOD} />}
            {apodData && <APODCard apod={apodData} />}
          </TabsContent>

          <TabsContent value="mars" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Mars Rover Photos</h2>
              <Button onClick={handleMarsSearch} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 p-6 bg-white rounded-xl shadow-lg border-2 border-red-200">
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Only currently operational rovers are available. Opportunity and Spirit missions have ended.
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">Rover Selection</label>
                <Select value={marsParams.rover} onValueChange={(value) => setMarsParams({...marsParams, rover: value})}>
                  <SelectTrigger className="w-48 border-2 border-red-300 focus:border-red-500 focus:ring-red-200 rounded-lg shadow-sm">
                    <SelectValue placeholder="Select Rover" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="curiosity">Curiosity</SelectItem>
                    <SelectItem value="perseverance">Perseverance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">Sol (Martian Day)</label>
                <Input
                  type="number"
                  placeholder="Sol (Martian day)"
                  value={marsParams.sol}
                  onChange={(e) => setMarsParams({...marsParams, sol: e.target.value})}
                  className="w-48 border-2 border-red-300 focus:border-red-500 focus:ring-red-200 rounded-lg shadow-sm"
                />
                <p className="text-xs text-gray-500">
                  Suggested: Curiosity (100-4000), Perseverance (1-1000)
                </p>
              </div>
            </div>
            
            {marsLoading && <LoadingSpinner message="Loading Mars rover photos..." />}
            {marsError && <ErrorMessage message={marsError} onRetry={refetchMars} />}
            {marsData && marsData.photos && (
              <>
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Found {marsData.photos.length} photos for {marsParams.rover} rover at Sol {marsParams.sol}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {marsData.photos.slice(0, 12).map((photo) => (
                    <MarsPhotoCard key={photo.id} photo={photo} />
                  ))}
                </div>
              </>
            )}
            {marsData && marsData.photos && marsData.photos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No photos found for the selected parameters. Try different values.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="neo" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Near Earth Objects (Last 7 Days)</h2>
              <Button onClick={handleNEOSearch} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
            
            {neoLoading && <LoadingSpinner message="Loading Near Earth Objects data..." />}
            {neoError && <ErrorMessage message={neoError} onRetry={refetchNEO} />}
            {neoData && <NEOChart neoData={neoData} />}
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">NASA Image Library Search</h2>
            </div>
            
            <div className="flex gap-4 p-4 bg-white rounded-lg shadow">
              <Input
                type="text"
                placeholder="Search NASA images (e.g., 'mars', 'nebula', 'earth')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleImageSearch()}
                className="flex-1"
              />
              <Button onClick={handleImageSearch} disabled={!searchQuery.trim() || searchLoading}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            
            {searchLoading && <LoadingSpinner message="Searching NASA image library..." />}
            {searchError && <ErrorMessage message={searchError} />}
            {searchResults && searchResults.collection && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Found {searchResults.collection.metadata.total_hits} results
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.collection.items.slice(0, 12).map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                      {item.links && item.links[0] && (
                        <img
                          src={item.links[0].href}
                          alt={item.data[0].title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">{item.data[0].title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {item.data[0].description}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(item.data[0].date_created).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            Built with NASA's Open APIs • Data provided by NASA
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Explore the universe through the lens of space exploration
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

