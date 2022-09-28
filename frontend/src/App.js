import React, { useState } from "react";
function App() {

  const [items, setItems] = useState([]);

  let homePage = async () => {
      const response = await fetch("/");
      const data = await response.json();
      setItems(data);
 }
  return (
    <div className="App">
      <form onSubmit={homePage}>
        <input
          type="text"
          value={items}
          placeholder="This doesn't do anything"
        ></input>
        <button type ="submit">Hi</button>
      </form>
    </div>
  );
}

export default App;
