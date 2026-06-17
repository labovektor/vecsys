import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { redirect } from "next/navigation";

async function searchEvent(formData: FormData) {
  "use server";
  redirect(`/e/${formData.get("event_code")}/login`);
}

const SearchEventForm = ({ className }: { className?: string }) => {
  return (
    <form action={searchEvent} className={className}>
      <Input
        name="event_code"
        placeholder="Masukkan Event Code"
        className=" bg-white"
      />
      <Button size="lg" type="submit">
        <Search /> Temukan
      </Button>
    </form>
  );
};

export default SearchEventForm;
