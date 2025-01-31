import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/global'

function Sidebar() {
    const { popularAnime } = useGlobalContext()

    const sorted = popularAnime?.sort((a, b) => b.score - a.score)

    return (
        <div className="mt-8 bg-white border-t-4 border-gray-300 pr-20 pl-8 pt-8">
            <h3 className="text-lg font-bold mb-4">Top 5 Popular</h3>
            <div className="flex flex-col w-40">
                {sorted?.slice(0, 5).map((anime) => (
                    <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="mt-4 flex flex-col gap-2 text-green-600">
                        <img src={anime.images.jpg.large_image_url} alt="" className="w-full rounded-lg border-4 border-gray-300" />
                        <h5 className="text-sm font-semibold">{anime.title}</h5>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
