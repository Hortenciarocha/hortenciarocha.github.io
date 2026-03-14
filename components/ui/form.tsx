import * as React from "react"
import * as FormPrimitive from "@radix-ui/react-form"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const Form = FormPrimitive.Root

interface FormFieldContextValue {
  name: string
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  return fieldContext
}

const FormField = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Field>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Field> & {
    name: string
  }
>(({ name, ...props }, ref) => (
  <FormFieldContext.Provider value={{ name }}>
    <FormPrimitive.Field ref={ref} name={name} {...props} />
  </FormFieldContext.Provider>
))
FormField.displayName = "FormField"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => (
  <Slot ref={ref} {...props} />
))
FormControl.displayName = "FormControl"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Label>
>(({ className, ...props }, ref) => (
  <FormPrimitive.Label
    ref={ref}
    className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    {...props}
  />
))
FormLabel.displayName = "FormLabel"

const FormMessage = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Message>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Message>
>(({ className, ...props }, ref) => (
  <FormPrimitive.Message
    ref={ref}
    className={cn("text-sm font-medium text-destructive", className)}
    {...props}
  />
))
FormMessage.displayName = "FormMessage"

export { Form, FormField, FormControl, FormLabel, FormMessage, useFormField }
