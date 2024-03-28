import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FindTheDifferencesRoute, ContainerRoute, HomeRoute } from "routes";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<ContainerRoute />}>
        <Route index element={<HomeRoute />} />
        <Route path="find-the-differences" element={<FindTheDifferencesRoute />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
