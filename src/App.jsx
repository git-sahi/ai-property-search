import PropertyGrid from "./components/PropertyGrid";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">AI Property Search</h1>
        <p className="app__subtitle">Find your perfect home in Gurgaon</p>
      </header>

      <main className="app__main">
        <PropertyGrid />
      </main>
    </div>
  );
}

export default App;
