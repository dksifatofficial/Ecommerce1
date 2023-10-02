import Image from 'next/image'
import cover from '@/picture/logo/cp.jpg'
import img1 from '@/picture/logo/cp2.png'
import BestExperienceTile from '@/components/BestExperience/BestExperienceTile'

const page = () => {
  return (
    <div>
        <div>
            <div className=''>
                <Image className='w-full -mt-1' src={cover} alt='' height="500" width="1800" />
            </div>
            <div className='w-full'>
                <BestExperienceTile />
            </div>
            <div className='w-full'>
            <Image className='px-[100px] pb-8' src={img1} alt='' height="500" width="1800" />
            </div>
        </div>
    </div>
  )
}

export default page