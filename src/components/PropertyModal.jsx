import { useEffect } from "react";
import "./PropertyModal.css";

function PropertyModal({ property, onClose }) {
  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close when clicking the backdrop, not the card itself
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="modal__backdrop" onClick={handleBackdropClick} role="dialog"
      aria-modal="true" aria-label={`${property.bhk} in ${property.location}`}>

      <div className="modal__card">

        <button className="modal__close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal__image-wrapper">
          <img
            src={property.thumbnail}
            alt={`${property.bhk} in ${property.location}`}
            className="modal__image"
          />
          <div className="modal__image-overlay" />
        </div>

        <div className="modal__body">

          <div className="modal__meta">
            <span className="modal__bhk">{property.bhk}</span>
            <span className="modal__dot">·</span>
            <span className="modal__area">{property.area.toLocaleString()} sq ft</span>
          </div>

          <p className="modal__location">
            <svg className="modal__pin" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {property.location}
          </p>

          <p className="modal__price">₹{property.price} Lac</p>

          <div className="modal__divider" />

          <h3 className="modal__features-heading">Features</h3>
          <ul className="modal__features">
            {property.features.map((feature, i) => (
              <li key={i} className="modal__feature-item">
                <span className="modal__feature-dot" />
                {feature}
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default PropertyModal;
