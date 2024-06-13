import StoryCompletedCard from "./StoryCompletedCard";


export default function StoryCompleted({posts}) {

    const storyStatusFull = posts?.filter((e) => e.status == 'full')
    return (
        <div className=' mx-auto p-3 flex flex-col gap-8 py-7'>
    {storyStatusFull && storyStatusFull.length > 0 && (
      <div className='flex flex-col gap-6'>
        <h2 className='text-2xl font-semibold text-center'>Truyện đã hoàn thành</h2>
        <div className='grid lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-3 gap-3 '>
          {storyStatusFull.map((post) => (
            <StoryCompletedCard key={post._id} post={post} />
          ))}
        </div>
       
      </div>
    )}
  </div>
    )
}