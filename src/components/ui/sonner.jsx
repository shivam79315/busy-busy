// components/ui/sonner.jsx
import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

const Toaster = (props) => {
  const { theme } = useTheme()

  return (
    <Sonner
      theme={theme === "dark" ? "dark" : "light"}
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "bg-neutral-900 text-neutral-100 border border-neutral-800 shadow-lg",
          description: "text-neutral-400",
          actionButton:
            "bg-neutral-800 text-neutral-100",
          cancelButton:
            "bg-neutral-800 text-neutral-400",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }