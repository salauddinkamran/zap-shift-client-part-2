import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h2 className="text-4xl font-bold text-white">Count number is = {count}</h2>
      <button onClick={() => setCount(count + 1)} className="btn btn-primary">Click {count}</button>
    </div>
  );
};

export default App;
