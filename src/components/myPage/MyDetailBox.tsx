const MyDetailBox = ({
  email,
  membership,
  name,
}: {
  email: string;
  membership: string;
  name: string;
}) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6 top-24 flex">
      {/* <img src="/placeholder.svg" alt="profile" className="w-24 h-24 rounded-full" /> */}
      <div className="w-24 h-24 rounded-full bg-gray-300 mr-4" />
      <div className="flex flex-col items-start justify-center">
        <h2 className="text-2xl font-bold">{name}</h2>
        <h2>{email}</h2>
        <h2>{membership}</h2>
      </div>
    </div>
  );
};

export default MyDetailBox;
