import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SelectSeason } from "./select-season";
import { User } from "@/app/types/user";

export function ChoosePlayerDialog({ name, user_id }: User) {
  const handleButtonClick = () => {
    console.log("Selected user ID:", user_id);
    localStorage.setItem("user_id", user_id);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      console.log("Dialog closed, removing user_id from localStorage");
      localStorage.removeItem("user_id");
    }
  };

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-2" onClick={handleButtonClick}>
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>
            Vælg en sæson for at se dine statistikker, eller vælg hele din
            bordtennis karriere
          </DialogDescription>
        </DialogHeader>
        <SelectSeason />
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
