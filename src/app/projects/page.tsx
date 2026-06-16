import HorizontalResponsive from "@/components/Responsive/HorizontalResponsive";
import ProjectsPage from "@/views/Projects/projectPage";
import Navbar from "@/views/shared/Navbar/Navbar";

export default function Page() {
  return (
    <HorizontalResponsive>
      <Navbar />
      <ProjectsPage />
    </HorizontalResponsive>
  );
}
