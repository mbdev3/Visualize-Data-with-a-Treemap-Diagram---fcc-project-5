import { useState, useEffect } from 'react';
import { json } from 'd3';
const jsonUrl =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json';

export const useData = () => {
  const [data, setData] = useState(null);
  if (data) {
    console.log(data[0]);
  }

  useEffect(() => {
    
    json(jsonUrl).then((data) => {
      
      setData(data);
    });
  }, []);
  return data;
};
