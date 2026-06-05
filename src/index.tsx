import "bulma/css/bulma.css";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./App.css";

const rootElement = document.querySelector("#content");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
