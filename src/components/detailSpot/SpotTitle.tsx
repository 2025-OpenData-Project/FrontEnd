const SpotTitle = ({ title }: { title: string }) => {
  return (
    <div className="max-w-[1000px] w-full mx-auto py-4 mt-10">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default SpotTitle;
