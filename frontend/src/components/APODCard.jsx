import { useState } from 'react';
import { Calendar, ExternalLink, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';

const APODCard = ({ apod }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!apod) return null;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-800">{apod.title}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLiked(!liked)}
            className={`${liked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
          >
            <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
          </Button>
        </div>
        <CardDescription className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          {apod.date}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {apod.media_type === 'image' ? (
          <div className="relative">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Loading image...</span>
              </div>
            )}
            <img
              src={apod.url}
              alt={apod.title}
              className={`w-full h-64 object-cover rounded-lg transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          </div>
        ) : apod.media_type === 'video' ? (
          <div className="relative">
            <iframe
              src={apod.url}
              title={apod.title}
              className="w-full h-64 rounded-lg"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : null}
        
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
          {apod.explanation}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          {apod.copyright && (
            <p className="text-xs text-gray-500">© {apod.copyright}</p>
          )}
          {apod.hdurl && (
            <Button variant="outline" size="sm" asChild>
              <a href={apod.hdurl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                HD Image
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default APODCard;

