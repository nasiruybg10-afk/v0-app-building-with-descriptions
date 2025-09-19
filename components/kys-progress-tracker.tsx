import { CheckCircle, Clock } from "lucide-react"

interface KYSProgressTrackerProps {
  currentStatus: string
  className?: string
}

const VERIFICATION_STEPS = [
  { key: "SUBMITTED", label: "Submitted" },
  { key: "PENDING_LGA", label: "LGA Review" },
  { key: "LGA_APPROVED", label: "LGA Approved" },
  { key: "PENDING_STATE", label: "State Review" },
  { key: "STATE_APPROVED", label: "State Approved" },
  { key: "PENDING_COUNTRY", label: "Country Review" },
  { key: "COUNTRY_APPROVED", label: "Country Approved" },
  { key: "PENDING_HQ", label: "HQ Review" },
  { key: "ACTIVATED", label: "Activated" },
]

export function KYSProgressTracker({ currentStatus, className = "" }: KYSProgressTrackerProps) {
  const currentIndex = VERIFICATION_STEPS.findIndex((step) => step.key === currentStatus)

  return (
    <div className={`flex items-center space-x-2 overflow-x-auto ${className}`}>
      {VERIFICATION_STEPS.map((step, index) => {
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex
        const isPending = index > currentIndex

        return (
          <div key={step.key} className="flex items-center space-x-2 flex-shrink-0">
            <div className="flex items-center space-x-1">
              {isCompleted ? (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-primary-foreground" />
                </div>
              ) : isCurrent ? (
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Clock className="w-3 h-3 text-white" />
                </div>
              ) : (
                <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                </div>
              )}
              <span
                className={`text-xs font-medium ${
                  isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < VERIFICATION_STEPS.length - 1 && (
              <div className={`w-4 h-px ${isCompleted ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
