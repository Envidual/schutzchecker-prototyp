import { HashRouter, Routes, Route } from "react-router-dom";
import { FlowProvider } from "./state/FlowContext";
import { PhoneFrame } from "./components/PhoneFrame";
import { ScrollToTop } from "./components/ScrollToTop";
import { IntroScreen } from "./screens/IntroScreen";
import { GebaeudeFlowLayout } from "./screens/GebaeudeFlowLayout";
import { GebaeudeListScreen } from "./screens/GebaeudeListScreen";
import { GebaeudeDetailScreen } from "./screens/GebaeudeDetailScreen";
import { FragenScreen } from "./screens/FragenScreen";
import { KontaktScreen } from "./screens/KontaktScreen";
import { TarifScreen } from "./screens/TarifScreen";
import { AntragScreen } from "./screens/AntragScreen";
import { DankeScreen } from "./screens/DankeScreen";

function App() {
  return (
    <FlowProvider>
      <HashRouter>
        <ScrollToTop />
        <PhoneFrame>
          <Routes>
            <Route path="/" element={<IntroScreen />} />
            <Route path="/gebaeude" element={<GebaeudeFlowLayout />}>
              <Route index element={<GebaeudeListScreen />} />
              <Route path=":id" element={<GebaeudeDetailScreen />} />
            </Route>
            <Route path="/fragen" element={<FragenScreen />} />
            <Route path="/kontakt" element={<KontaktScreen />} />
            <Route path="/tarif" element={<TarifScreen />} />
            <Route path="/antrag" element={<AntragScreen />} />
            <Route path="/danke" element={<DankeScreen />} />
          </Routes>
        </PhoneFrame>
      </HashRouter>
    </FlowProvider>
  );
}

export default App;
