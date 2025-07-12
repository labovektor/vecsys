import ProfileCard from "@/features/profile/components/profile-card";

const Page = () => {
  return (
    <div>
      <div className='flex items-center justify-between py-4 px-1'>
        <h1 className="text-3xl font-bold">Halo Sobat Vektorian</h1>
      </div>
      <div className="my-3 px-1">
        <h1 className="text-xl font-bold">Profile</h1>
        <ProfileCard />
      </div>
    </div>
  );
}

export default Page;
