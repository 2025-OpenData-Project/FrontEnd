import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/HomeUtil";

interface QnAItemProps {
  question: string;
  answer: string;
}

const QnAItem = ({ question, answer }: QnAItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg bg-white self-start">
      <button
        className="inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground w-full p-4 h-auto text-left hover:bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-700">{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray-400 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <p className="text-gray-600 text-sm pt-3">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QnAItem;
