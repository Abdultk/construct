
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressCircularVariants = cva("inline-grid place-content-center", {
  variants: {
    size: {
      sm: "size-16",
      md: "size-24",
      lg: "size-32",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

type ProgressCircularProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof progressCircularVariants> & {
    value?: number
  }

const ProgressCircular = React.forwardRef<HTMLDivElement, ProgressCircularProps>(
  ({ className, style, size, value = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(progressCircularVariants({ size }), className)}
        style={
          {
            ...style,
            "--value": value,
          } as React.CSSProperties
        }
        {...props}
      />
    )
  }
)
ProgressCircular.displayName = "ProgressCircular"

const progressCircularIndicatorVariants = cva(
  "col-start-1 row-start-1 rounded-full",
  {
    variants: {
      variant: {
        background:
          "stroke-secondary transition-all ease-in-out duration-500",
        foreground:
          "stroke-primary transition-all ease-in-out duration-500 origin-center -rotate-90",
      },
    },
  }
)

type ProgressCircularIndicatorProps = React.ComponentProps<"svg"> &
  VariantProps<typeof progressCircularIndicatorVariants> & {
    radius?: number
  }

const ProgressCircularIndicator = React.forwardRef<
  SVGSVGElement,
  ProgressCircularIndicatorProps
>(({ className, variant, radius: radiusProp = 45, ...props }, ref) => {
  const radius = Math.min(Math.max(radiusProp, 0), 50)
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset =
    variant === "foreground"
      ? circumference - (circumference * (props.strokeWidth as number)) / 100
      : undefined

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      className={cn(progressCircularIndicatorVariants({ variant }), className)}
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className="[stroke-width:var(--stroke-width,10px)]"
      />
    </svg>
  )
})
ProgressCircularIndicator.displayName = "ProgressCircularIndicator"

const ProgressCircularLabel = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "p"

  return (
    <Comp
      ref={ref}
      className={cn(
        "col-start-1 row-start-1 text-center text-sm",
        className
      )}
      {...props}
    />
  )
})
ProgressCircularLabel.displayName = "ProgressCircularLabel"

export {
  ProgressCircular,
  ProgressCircularIndicator,
  ProgressCircularLabel,
}
