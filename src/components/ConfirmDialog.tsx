import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Icon from "@/components/ui/icon"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
  icon?: string
  onConfirm: () => void
}

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  variant = 'default',
  icon,
  onConfirm
}: ConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-card border-border">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            {icon && (
              <div className={`p-2 rounded-lg ${
                variant === 'destructive' 
                  ? 'bg-red-500/10' 
                  : 'bg-primary/10'
              }`}>
                <Icon 
                  name={icon} 
                  size={24} 
                  className={variant === 'destructive' ? 'text-red-500' : 'text-primary'} 
                />
              </div>
            )}
            <AlertDialogTitle className="text-foreground">{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-muted-foreground">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-border">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={
              variant === 'destructive'
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-primary hover:bg-primary/90'
            }
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDialog