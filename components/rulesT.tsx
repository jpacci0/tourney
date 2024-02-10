import { fetchRules } from "@/lib/actions";
import RulesTeam from "@/components/rulesTeam";

export default async function RulesT({ id }: { id?: string}) {
  const rules = await fetchRules(id!);
  console.log(rules?.rules);
  
  if (!rules?.rules) {
    return <p className="text-gray-200">No rules have been inserted for this tournament.</p>;
  }
  return <RulesTeam rules={rules.rules} />;
}