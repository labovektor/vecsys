import { Button } from "@/components/ui/button";
import { Check, MoveLeft, MoveRight } from "lucide-react";
import React from "react";

interface BottomNavigatorButtonProps {
  onLeftClick?: VoidFunction;
  leftDisabled?: boolean;
  rightButtonType?: "next" | "confirm";
  rightDisabled?: boolean;
}

const BottomNavigatorButton = ({
  onLeftClick,
  leftDisabled,
  rightDisabled,
  rightButtonType = "next",
}: BottomNavigatorButtonProps) => {
  return (
    <div className=" w-full flex gap-2 justify-center">
      <Button type="button" onClick={onLeftClick} disabled={leftDisabled}>
        <MoveLeft /> Kembali
      </Button>
      {rightButtonType === "next" ? (
        <Button type="submit" disabled={rightDisabled}>
          Simpan & Lanjut <MoveRight />
        </Button>
      ) : (
        <Button type="submit" variant="success" disabled={rightDisabled}>
          Konfirmasi <Check />
        </Button>
      )}
    </div>
  );
};

export default BottomNavigatorButton;
