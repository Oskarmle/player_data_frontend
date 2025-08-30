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
export function ChoosePlayerDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Oskar Eriksen</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Oskar Eriksen</DialogTitle>
          <DialogDescription>Fredensborg BTK</DialogDescription>
        </DialogHeader>
        <SelectSeason />
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
