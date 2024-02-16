import { fetchUserByUsername } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function SearchUser({ username }: { username: string}) {
    const userProfile = await fetchUserByUsername(username);
    if (!userProfile) return notFound();
    return (<p className='text-gray-200'>{userProfile.full_name}</p>)
}