export default function SubHeader({
  subTitle,
  children,
}: {
  subTitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-md font-bold text-gray-200">{formatSubtitle(subTitle!)}</h3>
      {children}
    </div>
  );
}

function formatSubtitle(string: string) {
  if (string.length === 0) return string;
  string = string.replace(/-/g, ' ');
  return string.charAt(0).toUpperCase() + string.slice(1);
}
