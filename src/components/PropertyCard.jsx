import "./PropertyCard.css";

function PropertyCard({ bhk, area, location, price, thumbnail, matchReason, onClick }) {
  return (
    <div className="property-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}>
      <div className="property-card__image-wrapper">
        <img
          src={thumbnail}
          alt={`${bhk} in ${location}`}
          className="property-card__image"
          loading="lazy"
        />
        <div className="property-card__image-overlay" />
      </div>

      <div className="property-card__body">
        <div className="property-card__meta">
          <span className="property-card__bhk">{bhk}</span>
          <span className="property-card__dot">·</span>
          <span className="property-card__area">{area.toLocaleString()} sq ft</span>
        </div>

        <p className="property-card__location">
          <svg className="property-card__pin" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {location}
        </p>

        <p className="property-card__price">₹{price} Lac</p>

        {matchReason && (
          <div className="property-card__badge">
            <span className="property-card__badge-dot" />
            {matchReason}
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyCard;
