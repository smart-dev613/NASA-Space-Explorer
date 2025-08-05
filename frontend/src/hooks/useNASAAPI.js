import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const useNASAAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (endpoint, params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = new URL(`${API_BASE_URL}${endpoint}`);
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const fetchAPOD = (params = {}) => makeRequest('/apod', params);
  const fetchMarsPhotos = (params = {}) => makeRequest('/mars-photos', params);
  const fetchNEO = (params = {}) => makeRequest('/neo', params);
  const fetchEPIC = (params = {}) => makeRequest('/epic', params);
  const searchNASA = (params = {}) => makeRequest('/search', params);

  return {
    loading,
    error,
    fetchAPOD,
    fetchMarsPhotos,
    fetchNEO,
    fetchEPIC,
    searchNASA,
    clearError: () => setError(null)
  };
};

export const useAPOD = (params = {}) => {
  const [data, setData] = useState(null);
  const { loading, error, fetchAPOD, clearError } = useNASAAPI();

  const loadData = async () => {
    try {
      const result = await fetchAPOD(params);
      setData(result);
    } catch (err) {
      console.error('Failed to fetch APOD:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, error, refetch: loadData, clearError };
};

export const useMarsPhotos = (params = {}) => {
  const [data, setData] = useState(null);
  const { loading, error, fetchMarsPhotos, clearError } = useNASAAPI();

  const loadData = async () => {
    try {
      const result = await fetchMarsPhotos(params);
      setData(result);
    } catch (err) {
      console.error('Failed to fetch Mars photos:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, [params.rover, params.sol, params.camera, params.page]);

  return { data, loading, error, refetch: loadData, clearError };
};

export const useNEO = (params = {}) => {
  const [data, setData] = useState(null);
  const { loading, error, fetchNEO, clearError } = useNASAAPI();

  const loadData = async () => {
    try {
      const result = await fetchNEO(params);
      setData(result);
    } catch (err) {
      console.error('Failed to fetch NEO data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, [params.start_date, params.end_date]);

  return { data, loading, error, refetch: loadData, clearError };
};

