import StartupCard from '@/app/components/StartupCard';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY, STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation';
import React from 'react'

async function page({ params }) {
    const id = parseInt((await params).id)

    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id })
    const posts = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { authorId: user._id })

    if(!user) return notFound()

    return (
        <>
            <section className='profile_container'>
                <div className='profile_card'>
                    <div className='profile_title'>
                        <h3 className='text-24-black uppercase text-center line-clamp-1'>
                            {user.name}
                        </h3>
                    </div>
                    <img src={user.image} alt="avatar" className='profile_image' loading='lazy' width={220} height={200} />
                    <p className='text-30-extrabold mt-7 text-center'>
                        @{user.username}
                    </p>
                </div>
                <div className='flex-1 flex flex-col gap-5 lg:mt-5'>
                    <p className='text-30-bold'>Your StartUps</p>
                    <ul className='card_grid-sm'>
                        {
                            posts ? (
                                posts.map((post)=>(<StartupCard key={post._id} item={post}/>))
                            ):(
                                <p className='no-result'>No posts yet</p>
                            )
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}

export default page