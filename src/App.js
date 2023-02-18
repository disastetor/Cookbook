import { BrowserRouter, Switch, Route } from "react-router-dom";

//Styles
import "./App.css";

//Page components
import Create from "./pages/create/Create";
import Home from "./pages/home/Home";
import Recipe from "./pages/recipe/Recipe";
import Search from "./pages/search/Search";
import Navbar from "./components/Navbar";
import { ThemeSelector } from "./components/ThemeSelector";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { mode } = useTheme();

  return (
    //${mode} changes class css attributes if it's dark or light (here changes only page background)
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        {/* Routes switch */}
        <Switch>
          {/* Home */}
          <Route exact path="/">
            <Home />
          </Route>

          {/* Create */}
          <Route exact path="/create">
            <Create />
          </Route>

          {/* Recipe */}
          <Route exact path="/recipes/:id">
            <Recipe />
          </Route>

          {/* Search */}
          <Route exact path="/search">
            <Search />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
