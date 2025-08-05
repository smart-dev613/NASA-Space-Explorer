import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const NEOChart = ({ neoData }) => {
  if (!neoData || !neoData.near_earth_objects) return null;

  // Process data for visualization
  const processNEOData = () => {
    const dates = Object.keys(neoData.near_earth_objects);
    const dailyData = dates.map(date => {
      const objects = neoData.near_earth_objects[date];
      return {
        date: date,
        count: objects.length,
        hazardous: objects.filter(obj => obj.is_potentially_hazardous_asteroid).length,
        safe: objects.filter(obj => !obj.is_potentially_hazardous_asteroid).length
      };
    });
    return dailyData;
  };

  const processSizeData = () => {
    const allObjects = Object.values(neoData.near_earth_objects).flat();
    const sizeCategories = {
      'Small (< 100m)': 0,
      'Medium (100-500m)': 0,
      'Large (500m-1km)': 0,
      'Very Large (> 1km)': 0
    };

    allObjects.forEach(obj => {
      const maxDiameter = obj.estimated_diameter.meters.estimated_diameter_max;
      if (maxDiameter < 100) {
        sizeCategories['Small (< 100m)']++;
      } else if (maxDiameter < 500) {
        sizeCategories['Medium (100-500m)']++;
      } else if (maxDiameter < 1000) {
        sizeCategories['Large (500m-1km)']++;
      } else {
        sizeCategories['Very Large (> 1km)']++;
      }
    });

    return Object.entries(sizeCategories).map(([name, value]) => ({ name, value }));
  };

  const dailyData = processNEOData();
  const sizeData = processSizeData();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Near Earth Objects</CardTitle>
          <CardDescription>
            Number of NEOs detected each day (Hazardous vs Safe)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hazardous" stackId="a" fill="#FF8042" name="Potentially Hazardous" />
              <Bar dataKey="safe" stackId="a" fill="#00C49F" name="Safe" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>NEO Size Distribution</CardTitle>
          <CardDescription>
            Distribution of Near Earth Objects by estimated size
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sizeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sizeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default NEOChart;

