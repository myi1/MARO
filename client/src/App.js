import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import MarsGallery from "./pages/Gallery/Gallery";
import Favorites from "./pages/Favorites/Favorites";

function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/gallery' component={MarsGallery}></Route>
          <Route path='/favorites' component={Favorites}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
