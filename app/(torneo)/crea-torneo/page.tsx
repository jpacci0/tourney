import CreaTorneo from "@/components/creaTorneo";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Tournament',
};

export default function CreaTorneoPage() {
  return <CreaTorneo />
}