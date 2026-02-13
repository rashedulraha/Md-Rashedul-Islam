/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Users, Calendar, User } from "lucide-react";
import type { ProjectDetails } from "./porojectModalTypes";
import { DialogTrigger } from "@radix-ui/react-dialog";

const ProjectDialog: React.FC<{ projectData: ProjectDetails }> = ({
  projectData,
}) => {
  const [open, setOpen] = useState(false);

  // ✅ First visit auto open
  useEffect(() => {
    const visited = localStorage.getItem("hasVisitedProjectDialog");

    if (!visited) {
      setOpen(true);
      localStorage.setItem("hasVisitedProjectDialog", "true");
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      setOpen(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="text-base">
          {projectData.buttonText}
          <ExternalLink className="ml-2 h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{projectData.title}</DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            {projectData.description}
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="grid gap-6">
          <div className="grid gap-3">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Team</p>
                <p className="text-sm text-muted-foreground">
                  {projectData.team}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">My Role</p>
                <p className="text-sm text-muted-foreground">
                  {projectData.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Started</p>
                <p className="text-sm text-muted-foreground">
                  {projectData.startDate}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {projectData.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex justify-end">
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
