import type React from "react";

type Responsive = {
  children: React.ReactNode;
};

const Responsive = ({ children }: Responsive) => {
  return <div className="container mx-auto px-4">{children}</div>;
};

export default Responsive;
