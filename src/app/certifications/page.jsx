import PageCertifications from "@/views/Certifications/Certifications";
import Navbar from "@/views/shared/Navbar/Navbar";
import React from "react";

const Certifications = () => {
  return (
    <div>
      <Navbar />
      <div className="py-10 md:py-20">
        <PageCertifications />
      </div>
    </div>
  );
};

export default Certifications;
