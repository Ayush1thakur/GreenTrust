import { useEffect, useState } from "react";
import SourceCard from "./SourceCard";
import axios from "axios";

function ViewMarketplaceSources() {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    async function fetchSources() {
      try {
        const res = await axios.get("http://localhost:5000/api/resources/get-sources");
        setSources(res.data);
      } catch (err) {
        console.error("Error fetching sources:", err);
      }
    }

    fetchSources();
  }, []);

  const handleBuy = (ownerId, index) => {
    // You can implement buy logic here
    alert(`Buying from ${ownerId}, index: ${index}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {sources.map((source, idx) => (
        <SourceCard key={idx} source={source} index={idx} onBuy={handleBuy} />
      ))}
    </div>
  );
}

export default ViewMarketplaceSources;
