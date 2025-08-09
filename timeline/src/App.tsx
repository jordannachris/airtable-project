import { useState } from "react";
import { Timeline } from "./components/Timeline";
import { timelineItems as initialItems } from "./data/timelineItems.js";
import type { TimelineItem } from "./types/timeline";
import "./App.css";

function App() {
  const [items, setItems] = useState<TimelineItem[]>(initialItems);

  const handleItemUpdate = (updatedItem: TimelineItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>Software Development Timeline</h1>
          <p>
            Track your software project phases from planning to deployment with
            our interactive timeline.
          </p>
        </div>

        <Timeline items={items} onItemUpdate={handleItemUpdate} />
      </div>
    </div>
  );
}

export default App;
