import HorizontalResponsive from "@/components/Responsive/HorizontalResponsive";
import PageCertifications from "@/views/Certifications/Certifications";
import Navbar from "@/views/shared/Navbar/Navbar";

import React from "react";

const Certifications = () => {
  return (
    <div>
      <Navbar />

      <HorizontalResponsive>
        <PageCertifications />
      </HorizontalResponsive>
    </div>
  );
};

export default Certifications;
