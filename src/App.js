import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RootPage } from "./pages/Root.js";
import {CharacterPage, CharacterPage1, CharacterPage2, CharacterPage3, CharacterPage4, CharacterPage5, CharacterPage6} from "./pages/Imger.js"
import {LogsPage} from "./pages/Logs.js"
import {CookPage} from "./pages/Cook.js"

function Header() {
  return (
    <section className="hero is-warning">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            さすらがwiki
          </h1>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer ">
      <div className="content">
        <p className="has-text-centered">
          ©聖人
        </p>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <Router>
      <Header />
      <section className="section has-background-warning-light">
        <div className="container">
          <div className="block has-text-right">
          </div>
          <Switch>
            <Route path="/" exact>
              <RootPage />
            </Route>
            <Route path="/character" exact>
              <CharacterPage/>
            </Route>
            <Route path="/character1" exact>
              <CharacterPage1/>
            </Route>
            <Route path="/character2" exact>
              <CharacterPage2/>
            </Route>
            <Route path="/character3" exact>
              <CharacterPage3/>
            </Route>
            <Route path="/character4" exact>
              <CharacterPage4/>
            </Route>
            <Route path="/character5" exact>
              <CharacterPage5/>
            </Route>
            <Route path="/character6" exact>
              <CharacterPage6/>
            </Route>
            <Route path="/logs" exact>
              <LogsPage/>
            </Route>
            <Route path="/cook" exact>
              <CookPage/>
            </Route>

            {/*
            <Route path="/restaurants" exact>
              <RestaurantListPage />
            </Route>
            <Route path="/restaurants/:restaurantId">
              <RestaurantDetailPage />
            </Route>
            */}
          </Switch>
        </div>
      </section>
      <Footer />
    </Router>
  );
}