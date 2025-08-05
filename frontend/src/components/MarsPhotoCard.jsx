import { useState } from 'react';
import { Camera, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';

const MarsPhotoCard = ({ photo }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!photo) return null;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-gray-800">
            {photo.rover.name} Rover
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            Sol {photo.sol}
          </Badge>
        </div>
        <CardDescription className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          {photo.earth_date}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="relative">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Loading image...</span>
            </div>
          )}
          {imageError && (
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <span className="text-gray-500 text-sm">Image unavailable</span>
                <p className="text-gray-400 text-xs mt-1">Mars photo by {photo.rover.name} rover</p>
              </div>
            </div>
          )}
          <img
            src={photo.img_src}
            alt={`Mars photo by ${photo.rover.name} rover`}
            className={`w-full h-48 object-cover rounded-lg transition-opacity duration-300 ${
              imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => {
              setImageLoaded(true);
              setImageError(false);
            }}
            onError={() => {
              setImageLoaded(true);
              setImageError(true);
              console.error('Failed to load image:', photo.img_src);
            }}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Camera className="h-4 w-4 mr-2" />
            <span className="font-medium">{photo.camera.full_name}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>Landing Date: {photo.rover.landing_date}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline" className="text-xs">
              {photo.camera.name}
            </Badge>
            <Badge variant="outline" className="text-xs">
              ID: {photo.id}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarsPhotoCard;

