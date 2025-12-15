import { CheckCircle2 } from "lucide-react";
import "./VerifiedBadge.css";

interface VerifiedBadgeProps {
  size?: number;
}

export default function VerifiedBadge({ size }: VerifiedBadgeProps) {
  return (
    <span
      className="verified-icon-wrapper"
      title="Verified sharer: ShareFare has confirmed this user has a strong track record of reliable pickups."
    >
      <CheckCircle2 size={size ?? 16} className="verified-icon" />
    </span>
  );
}
