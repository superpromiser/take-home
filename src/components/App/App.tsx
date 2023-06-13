import type { FC } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";

import Agents from "../Agents/Agents";
import CreateAgent from "../Agents/CreateAgent"
import ViewAgent from "../Agents/ViewAgent";

const App: FC = () => {
  return (
      // <Agents />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Agents />}/>
          <Route path="/createAgent" element={<CreateAgent />} />
          <Route path="/viewAgent/:id" element={<ViewAgent />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
