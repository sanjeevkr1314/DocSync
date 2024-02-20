import React from "react";

const Footer = () => {
  const currDate = new Date();
  const currYear = currDate.getFullYear();
  return (
    <footer>
      <p>Copyright © {currYear} Sanjeev</p>
    </footer>
  );
};

export default Footer;
