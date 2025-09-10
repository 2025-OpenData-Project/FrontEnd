import { RouterProvider } from "react-router";
import routes from "./routes.tsx";

function App() {
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
