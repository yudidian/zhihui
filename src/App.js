import "@/style/app.scss";
import {HashRouter} from "react-router-dom";
import createRouter from "@/router";
import routers from "@/router/routers";

function App() {
  return (
    <HashRouter>
          {createRouter(routers)}
    </HashRouter>
  );
}

export default App;
