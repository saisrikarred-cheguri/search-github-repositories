import ReactDOM from "react-dom/client";
import App from "./App";
import { StrictMode } from "react";
import { QueryProvider } from "./lib/react-query/QueryProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>
);
