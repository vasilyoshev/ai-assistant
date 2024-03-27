import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClassicRoute, ContainerRoute, HomeRoute } from "routes";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<ContainerRoute />}>
        <Route index element={<HomeRoute />} />
        <Route path="classic" element={<ClassicRoute />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
