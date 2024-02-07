export default function SubHeader({
  subTitle,
  children,
}: {
  subTitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-bold text-gray-200">{firstLetterUppercase(subTitle!)}</h3>
      {children}
    </div>
  );
}

function firstLetterUppercase(string: string) {
  if (string.length === 0) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}
