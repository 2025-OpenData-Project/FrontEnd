import { faqData } from "../../data/data";
import QnAItem from "./QnAItem";

const HomeQnA = () => {
  return (
    <div className="py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">자주 묻는 질문</h2>
          <p className="text-gray-600">궁금한 점이 있으시면 확인해보세요</p>
        </div>
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="flex-1 min-w-[300px] md:min-w-[calc(50%-8px)]"
            >
              <QnAItem question={item.question} answer={item.answer} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeQnA;
