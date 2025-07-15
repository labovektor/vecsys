import { Button } from '@/components/ui/button';
import { EyeIcon, PrinterIcon } from 'lucide-react';
import { toast } from 'sonner';

const downloadIDCard = (participantId: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + `/admin/participant/${participantId}/card`;
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = `kartu-peserta-${participantId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    toast.error("Gagal mengunduh kartu peserta");
  }
};

const Header = ({ participantId }: { participantId: string }) => {
  return (
    <div className="flex justify-between py-4 px-1">
      <h1 className="text-xl font-bold">Detail Peserta</h1>
      <div className="flex gap-2">
        <Button className="bg-gray-800 text-white">
          <EyeIcon /> Lihat Bukti Pembayaran
        </Button>
        <Button className="bg-gray-800 text-white" onClick={() => downloadIDCard(participantId)}>
          <PrinterIcon /> Cetak Kartu Peserta
        </Button>
      </div>
    </div>
  );
}

export default Header;
