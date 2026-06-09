import properties from "../data/properties";
import PropertyCard from "./PropertyCard";
import "./PropertyGrid.css";

function PropertyGrid({ filteredProperties, onSelectProperty }) {
  const displayProperties = filteredProperties ?? properties;

  if (displayProperties.length === 0) {
    return (
      <section className="property-grid__section">
        <div className="property-grid__empty">
          <div className="property-grid__empty-icon">⌂</div>
          <h2 className="property-grid__empty-title">No properties found</h2>
          <p className="property-grid__empty-subtitle">Try adjusting your search criteria.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="property-grid__section">
      <div className="property-grid">
        {displayProperties.map((property) => (
          <PropertyCard
            key={property.id}
            bhk={property.bhk}
            area={property.area}
            location={property.location}
            price={property.price}
            thumbnail={property.thumbnail}
            matchReason={property.features[0]}
            onClick={() => onSelectProperty(property)}
          />
        ))}
      </div>
    </section>
  );
}

export default PropertyGrid;
