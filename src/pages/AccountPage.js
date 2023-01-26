import React from "react";
import { Link } from "react-router-dom";
import PersInfoPanel from "../components/PersInfoPanel";

function AccountPage() {
  return (
    <div className="account-page">
      <h1>Your account</h1>
      <PersInfoPanel />
    </div>
  );
}

export default AccountPage;