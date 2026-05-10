import { WebcamPixelGrid } from "@/components/ui/webcam-pixel-grid";

export function WebcamPixelGridDemo() {
  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      {/* AI Webcam Pixel Background */}
      <div className="absolute inset-0">
        <WebcamPixelGrid
          gridCols={60}
          gridRows={40}
          maxElevation={50}
          motionSensitivity={0.25}
          elevationSmoothing={0.2}
          colorMode="webcam"
          mirror={true}
          gapRatio={0.05}
          invertColors={false}
          darken={0.5}
          borderOpacity={0.05}
          className="w-full h-full"
          onWebcamReady={() => console.log("Webcam enabled")}
          onWebcamError={(err) => console.error(err)}
        />
      </div>

      {/* Soft overlay for readability */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-20 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1 text-sm text-muted-foreground">
          Experimental UI Feature → AI Webcam Pixel Background
        </div>

        {/* Title */}
        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-5xl">
          Interactive AI-Powered Web Experience
        </h1>
      </div>
    </div>
  );
}
