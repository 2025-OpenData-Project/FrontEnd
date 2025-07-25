import { locations } from "../../data/data.ts";
import type { EndAddressBtnProps } from "../../utils/interface.tsx";

const EndAddressBtn = ({ setEndAddress }: EndAddressBtnProps) => {
  return (
    <div className="flex rounded-tr-lg rounded-br-lg flex-col gap-2 justify-start w-full h-[103px] bg-white p-4 text-[16px] inset-shadow-sm inset-shadow-black-500">
      방문할 관광지
      <hr className="border-[#EFEFEF]" />
      <select
        className="flex-1 border rounded px-2 py-1"
        onChange={(e) => setEndAddress(e.target.value)}
      >
        {locations.map((location, index) => (
          <option key={index} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
};
export default EndAddressBtn;
