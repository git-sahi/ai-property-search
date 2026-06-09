import properties from "../data/properties";
import PropertyCard from "./PropertyCard";
import "./PropertyGrid.css";

function PropertyGrid({ filteredProperties }) {
  const displayProperties = filteredProperties ?? properties;

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
            onClick={() => console.log(property)}
          />
        ))}
      </div>
    </section>
  );
}

export default PropertyGrid;
