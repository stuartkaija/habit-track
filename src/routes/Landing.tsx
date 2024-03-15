import Login from '../components/Login';

export default function Landing() {
  const videoUrl = `https://ggdzmmzzfftkrprycojs.supabase.co/storage/v1/object/public/habit-track-assets/admin/habit-track-demo.mp4`
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col items-center h-svh md:h-dvh'>
        <h1 className='text-indigo-600 font-extrabold text-5xl m-4 lg:m-12'>Habit Track</h1>
        <Login />
        <p className='mt-auto mb-4'>See the app first <a href={'#demo'} className='italic hover:underline'>here</a>.</p>
      </div>
      <div id='demo' className='flex justify-center items-center h-svh md:h-dvh'>
        <video src={videoUrl} controls controlsList='nodownload nofullscreen' className='w-4/5'></video>
      </div>
    </div>
  )
}