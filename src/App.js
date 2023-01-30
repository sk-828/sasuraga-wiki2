import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RootPage } from "./pages/Root.js";
import { CharacterPage, CharacterPage1, CharacterPage2, CharacterPage3, CharacterPage4, CharacterPage5, CharacterPage6 } from "./pages/Imger.js"
import { CookPage } from "./pages/Cook.js"
import { TarotPage } from "./pages/Tarot.js"
import { MaterialPage, MaterialPage1, MaterialPage2, MaterialPage3, MaterialPage4, MaterialPage5, MaterialPage6 } from "./pages/Material.js"
import { LogsPage } from "./pages/Logs.js"
import { RootButton } from "./components";

function Header() {
  //ヘッダー
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
  //フッター
  return (
    <footer className="footer ">
      <div className="content">
        <p className="has-text-centered">
          ©2022 聖人 ほらがい　ユフトゥン　河辺文　黒上　もちたぬき
        </p>
      </div>
    </footer>
  );
}

export function App() {
  //ここが一番最初に表示される
  return (
    <Router>
      <Header />
      <section className="section has-background-warning-light">
        <div className="container">
          <div className="block has-text-right">
          </div>
          <div className="has-text-right">
            <div className="button is-warning" to="/material">
              データ更新
            </div>
          </div>
          <RootButton />
          <Switch>
            <Route path="/" exact>
              <RootPage />
            </Route>
            <Route path="/character" exact>
              <CharacterPage />
            </Route>
            <Route path="/character1" exact>
              <CharacterPage1 />
            </Route>
            <Route path="/character2" exact>
              <CharacterPage2 />
            </Route>
            <Route path="/character3" exact>
              <CharacterPage3 />
            </Route>
            <Route path="/character4" exact>
              <CharacterPage4 />
            </Route>
            <Route path="/character5" exact>
              <CharacterPage5 />
            </Route>
            <Route path="/character6" exact>
              <CharacterPage6 />
            </Route>
            <Route path="/tarot" exact>
              <TarotPage />
            </Route>
            <Route path="/logs" exact>
              <LogsPage />
            </Route>
            <Route path="/cook" exact>
              <CookPage />
            </Route>
            <Route path="/material" exact>
              <MaterialPage />
            </Route>
            <Route path="/material1" exact>
              <MaterialPage1 />
            </Route>
            <Route path="/material2" exact>
              <MaterialPage2 />
            </Route>
            <Route path="/material3" exact>
              <MaterialPage3 />
            </Route>
            <Route path="/material4" exact>
              <MaterialPage4 />
            </Route>
            <Route path="/material5" exact>
              <MaterialPage5 />
            </Route>
            <Route path="/material6" exact>
              <MaterialPage6 />
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
          <RootButton />
        </div>
      </section>
      <Footer />
    </Router>
  );
}