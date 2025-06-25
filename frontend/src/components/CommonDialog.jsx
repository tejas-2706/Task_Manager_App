import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from './ui/button'
import CommonForm from './CommonForm'
function CommonDialog({title, description, formControls, FormData,handleSubmit,btnText,SubmitbtnText, open, setOpen}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button >{btnText}</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div>
                <CommonForm 
                formControls={formControls}
                form={FormData}
                handleSubmit={handleSubmit}
                btnText={SubmitbtnText}
                />
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default CommonDialog