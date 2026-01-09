type IconComponentType = React.ComponentType<{ className?: string }>;

export interface TechItem {
  text: string;
  Icon: IconComponentType;
  delay: number;
  duration: number;
  color: string;
  description: string;
}

export interface CodeSymbol {
  Icon: IconComponentType;
  delay: number;
  duration: number;
}

export interface MousePosition {
  x: number;
  y: number;
}
