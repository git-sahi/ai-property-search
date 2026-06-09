import "./FilterChips.css";

const CHIPS = [
  { label: "All",   value: "all" },
  { label: "2 BHK", value: "2BHK" },
  { label: "3 BHK", value: "3BHK" },
  { label: "4 BHK+", value: "4BHK+" },
];

function FilterChips({ activeChip, onChipSelect }) {
  return (
    <div className="filter-chips" role="group" aria-label="Filter by BHK">
      {CHIPS.map((chip) => (
        <button
          key={chip.value}
          className={`filter-chips__chip ${activeChip === chip.value ? "filter-chips__chip--active" : ""}`}
          onClick={() => onChipSelect(chip.value)}
          aria-pressed={activeChip === chip.value}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}

export default FilterChips;
