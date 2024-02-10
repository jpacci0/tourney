"use client";
export default function RulesTeam({ rules }: { rules?: any}) {
  console.log(rules);

  return <p className="text-gray-200" dangerouslySetInnerHTML={{ __html: rules }}></p>;
}