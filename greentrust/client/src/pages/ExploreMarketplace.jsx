import Navbar from "../components/Navbar";
import ViewMarketplaceSources from "../components/ViewMarketplaceSources";

function ExploreMarketplace() {
  return (
    <div>
      <Navbar />
      <h2 className="text-2xl font-bold my-4 text-center">🔍 Explore Marketplace</h2>
      <ViewMarketplaceSources />
    </div>
  );
}

export default ExploreMarketplace;
