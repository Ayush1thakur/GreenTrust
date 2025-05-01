function SourceCard({ source, index, onBuy }) {
    const { location, capacity, output, price, ownerName, ownerId } = source;
  
    return (
      <div className="border p-4 rounded mb-4 shadow">
        <h4 className="text-lg font-semibold">🌍 {location}</h4>
        <p>⚡ Capacity: {capacity} kW</p>
        <p>🔋 Output: {output} kWh</p>
        <p>💰 Price: ₹{price}</p>
        <p>👤 Seller: {ownerName}</p>
        <button
          className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => onBuy(ownerId, index)}
        >
          Buy
        </button>
      </div>
    );
  }
  
  export default SourceCard;
  