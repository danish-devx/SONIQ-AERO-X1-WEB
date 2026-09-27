import "./Specifications.css";

const specs = [
  ["Audio", "40mm custom dynamic driver"],
  ["Noise control", "Adaptive ANC / transparency"],
  ["Playback", "Up to 40 hours"],
  ["Connectivity", "Bluetooth 5.4 / USB-C audio"],
  ["Spatial audio", "Head-tracked 360° sound"],
  ["Weight", "248g"],
  ["Materials", "Magnesium composite / memory foam"],
  ["Warranty", "2 years limited warranty"],
];

function Specifications() {
  return (
    <section className="specifications" id="specs">
      <div className="specs-container">
        <div className="specs-topline">
          <span>06 / SPECIFICATIONS</span>
          <span>THE COMPLETE PICTURE</span>
        </div>
        <div className="specs-heading">
          <h2>
            Quietly
            <br />
            <span>capable.</span>
          </h2>
          <p>Everything you need to know, in the details that matter.</p>
        </div>
        <div className="specs-table">
          {specs.map(([label, value], index) => (
            <div className="spec-row" key={label}>
              <span>0{index + 1}</span>
              <strong>{label}</strong>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Specifications;
