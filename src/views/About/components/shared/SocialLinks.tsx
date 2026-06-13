import { Button } from "@/components/ui/button";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SocialLinks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <Button variant="outline" size="sm" asChild className="w-full h-10">
        <a
          href="https://linkedin.com/in/rashedulraha"
          target="_blank"
          rel="noreferrer">
          <FaFacebook className="w-4 h-4 mr-2" />
          LinkedIn
        </a>
      </Button>
      <Button variant="outline" size="sm" asChild className="w-full h-10">
        <a
          href="https://github.com/rashedulraha"
          target="_blank"
          rel="noreferrer">
          <FaGithub className="w-4 h-4 mr-2" />
          GitHub
        </a>
      </Button>
      <Button variant="outline" size="sm" asChild className="w-full h-10">
        <a
          href="https://twitter.com/rashedulraha"
          target="_blank"
          rel="noreferrer">
          <FaXTwitter className="w-4 h-4 mr-2" />
          Twitter
        </a>
      </Button>
    </div>
  );
}
