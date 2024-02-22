"use client";
export default function RulesTeam({ rules }: { rules?: any}) {

  return <div className="text-gray-200" id="formatRules" dangerouslySetInnerHTML={{ __html: rules }}></div>;
}