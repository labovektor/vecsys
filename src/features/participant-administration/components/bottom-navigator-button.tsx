import { Button } from "@/components/ui/button";
import { Check, MoveLeft, MoveRight } from "lucide-react";
import React from "react";

interface BottomNavigatorButtonProps {
  onLeftClick?: VoidFunction;
  onRightClick?: VoidFunction;
  leftDisabled?: boolean;
  rightButtonType?: "next" | "confirm";
}

const BottomNavigatorButton = ({
  onLeftClick,
  onRightClick,
  leftDisabled = false,
  rightButtonType = "next",
}: BottomNavigatorButtonProps) => {
  return (
    <div className=" w-full flex gap-2 justify-center">
      <Button type="button" onClick={onLeftClick} disabled={leftDisabled}>
        <MoveLeft /> Kembali
      </Button>
      {rightButtonType === "next" ? (
        <Button type="submit" onClick={onRightClick}>
          Simpan & Lanjut <MoveRight />
        </Button>
      ) : (
        <Button type="submit" variant="success" onClick={onRightClick}>
          Konfirmasi <Check />
        </Button>
      )}
    </div>
  );
};

export default BottomNavigatorButton;
