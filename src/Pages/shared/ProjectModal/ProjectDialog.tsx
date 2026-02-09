// src/components/ProjectDialog.tsx

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react"; // A popular icon library that works well with shadcn/ui
import { DialogTrigger } from "@radix-ui/react-dialog";

// Defines the structure for the project data
interface ProjectDetails {
  title: string;
  description: string;
  team: string;
  startDate: string;
  projectUrl: string;
  buttonText: string;
}

// Props for our component
interface ProjectDialogProps {
  projectData: ProjectDetails;
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({ projectData }) => {
  const [open, setOpen] = useState(false);

  // Auto-close effect: closes the modal after 5 seconds when opened
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      setOpen(false);
    }, 5000); // 5 seconds gives the user enough time to read

    // Cleanup function to clear the timer if the modal closes manually
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* This is the new, better-looking button that triggers the modal */}
      <DialogTrigger asChild>
        <Button size="lg" className="text-base">
          {projectData.buttonText}
          <ExternalLink className="ml-2 h-5 w-5" />
        </Button>
      </DialogTrigger>

      {/* This is the modal content itself */}
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-xl">{projectData.title}</DialogTitle>
          <DialogDescription className="text-sm">
            {projectData.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Team</p>
            <p className="text-sm text-muted-foreground">{projectData.team}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Started</p>
            <p className="text-sm text-muted-foreground">
              {projectData.startDate}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button asChild>
            <a
              href={projectData.projectUrl}
              target="_blank"
              rel="noopener noreferrer">
              View Live Project
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
