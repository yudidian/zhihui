import "@/style/app.scss";
import {Routes, HashRouter} from "react-router-dom";
import createRouter from "@/router";
import routers from "@/router/routers";
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          {createRouter(routers)}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
