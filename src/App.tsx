import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RootPage } from "./pages/Root";
import { CharacterPage } from "./pages/Imger";
import { CookPage } from "./pages/Cook";
import { TarotPage } from "./pages/Tarot";
import { MaterialPage } from "./pages/Material";
import { LogsPage } from "./pages/Logs";
import { NotFoundPage } from "./pages/NotFound";
import { RootButton } from "./components";
import { TABLES } from "./constants/tables";

function Header() {
  return (
    <section className="hero is-warning">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">さすらがwiki</h1>
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
          ©2022 聖人 ほらがい　ユフトゥン　河辺文　黒上　もちたぬき
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
          <RootButton />
          <Routes>
            <Route path="/" element={<RootPage />} />
            {TABLES.map((table) => (
              <Route
                key={table.characterRoute}
                path={table.characterRoute}
                element={<CharacterPage />}
              />
            ))}
            <Route path="/tarot" element={<TarotPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/cook" element={<CookPage />} />
            {TABLES.map((table) => (
              <Route
                key={table.materialRoute}
                path={table.materialRoute}
                element={<MaterialPage />}
              />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <RootButton />
        </div>
      </section>
      <Footer />
    </Router>
  );
}
