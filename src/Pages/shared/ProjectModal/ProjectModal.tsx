// src/components/ProjectModal.tsx

import React, { useEffect, useRef } from "react";

// Defines the structure for the project data
interface ProjectDetails {
  title: string;
  description: string;
  team: string;
  startDate: string;
  projectUrl: string;
  buttonText: string;
}

// Defines the props for the ProjectModal component
interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectData: ProjectDetails;
  // Optional ref to the button that triggers the modal, for focus management
  triggerRef?: React.RefObject<HTMLButtonElement>;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  projectData,
  triggerRef,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Auto-close effect: closes the modal after 3 seconds
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // Cleanup function to clear the timer if the modal closes manually
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  // Focus trap effect: keeps focus inside the modal when it's open
  useEffect(() => {
    if (!isOpen) return;

    const modalElement = modalRef.current;
    if (!modalElement) return;

    // Find all focusable elements inside the modal
    const focusableElements = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    // Set focus to the first focusable element when the modal opens
    if (firstElement) {
      firstElement.focus();
    }

    // Function to handle tab key presses
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      // If Shift + Tab is pressed and focus is on the first element, move to the last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // If Tab is pressed and focus is on the last element, move to the first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    // Add the event listener
    modalElement.addEventListener("keydown", handleTabKey);

    // Cleanup function to remove the event listener and return focus to the trigger button
    return () => {
      modalElement.removeEventListener("keydown", handleTabKey);
      if (triggerRef?.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        triggerRef.current.focus();
      }
    };
  }, [isOpen, triggerRef]);

  // If the modal is not open, render nothing (this allows for exit animations)
  if (!isOpen) {
    return null;
  }

  // Handles clicks on the backdrop to close the modal
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Close the modal only if the click is directly on the backdrop, not its children
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    // Backdrop with click handler
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}>
      {/* Modal content container with scale animation */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg rounded-xl bg-background p-6 shadow-2xl transition-all duration-300 transform scale-100 opacity-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Close modal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
          <span className="sr-only">Close</span>
        </button>

        {/* Modal content */}
        <div className="mt-4 space-y-4">
          <h2 className="text-2xl font-bold leading-none tracking-tight">
            {projectData.title}
          </h2>

          <p className="text-sm text-muted-foreground">
            {projectData.description}
          </p>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Team:</span> {projectData.team}
            </p>
            <p>
              <span className="font-semibold">Started:</span>{" "}
              {projectData.startDate}
            </p>
          </div>

          <a
            href={projectData.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            {projectData.buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
