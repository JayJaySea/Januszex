import React from 'react';
import SignSite from "./SignSite";
import HomeSite from "./HomeSite";
// importing components from react-router-dom package
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PersInfoSite from "./PersInfoSite";
import PaymentSite from './PaymentSite';

function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<HomeSite />} />
        <Route path="/sign" element={<SignSite />} />
        <Route path="/persInfo" element={<PersInfoSite />} />
        <Route path="/payment" element={<PaymentSite />} />
        <Route path="/signUp" element={<PaymentSite />} />
      </Routes>
    </Router>
  );
}

export default MyRoutes;