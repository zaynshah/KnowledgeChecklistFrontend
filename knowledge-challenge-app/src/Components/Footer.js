import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top footer"
    >
      <p className="col-md-4 mb-0 text-muted">© 2022 Team Kappa</p>
    </footer>
  );
}
