import { RouterProvider } from "react-router";
import { CookiesProvider } from "react-cookie";

import routes from "./routes.tsx";

function App() {
  return (
    <CookiesProvider>
      <RouterProvider router={routes}></RouterProvider>
    </CookiesProvider>
  );
}

export default App;
