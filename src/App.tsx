import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./hooks/AppProvider";
import Layout from "./components/Layout";
import { LoadingSkeleton } from "./components/ui";
const Home = lazy(() => import("./pages/Home"));
const Cats = lazy(() => import("./pages/Cats"));
const CatDetails = lazy(() => import("./pages/CatDetails"));
const Match = lazy(() => import("./pages/Match"));
const QuemMeAdota = lazy(() => import("./pages/QuemMeAdota"));
const Adoption = lazy(() => import("./pages/Adoption"));
const Help = lazy(() => import("./pages/Help"));
const About = lazy(() => import("./pages/About"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Suspense fallback={<LoadingSkeleton />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="gatos" element={<Cats />} />
              <Route path="gatos/:slug" element={<CatDetails />} />
              <Route path="match" element={<Match />} />
              <Route path="quem-me-adota" element={<QuemMeAdota />} />
              <Route
                path="encontro-felino"
                element={<Navigate to="/quem-me-adota" replace />}
              />
              <Route
                path="tinder"
                element={<Navigate to="/quem-me-adota" replace />}
              />
              <Route path="adotar" element={<Adoption />} />
              <Route path="ajudar" element={<Help />} />
              <Route path="sobre" element={<About />} />
              <Route path="duvidas" element={<FAQ />} />
              <Route path="contato" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </AppProvider>
    </BrowserRouter>
  );
}
