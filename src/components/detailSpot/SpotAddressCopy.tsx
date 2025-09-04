import { MapPin, Copy } from "lucide-react";

const SpotAddressCopy = ({ address }: { address: string }) => {
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      alert(`주소가 복사되었습니다: ${address}`);
    } catch {
      alert("주소 복사에 실패했습니다.");
    }
  };

  return (
    <div
      className="w-full max-w-[800px] flex items-center space-x-2 mb-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border"
      onClick={handleCopyAddress}
    >
      <MapPin className="h-5 w-5 text-gray-600 flex-shrink-0" />
      <span className="text-gray-800 flex-1">{address}</span>
      <Copy className="h-4 w-4 text-gray-400" />
    </div>
  );
};

export default SpotAddressCopy;
