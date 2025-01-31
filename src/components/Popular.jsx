import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/global'
import Sidebar from './Sidebar'

function Popular({ rendered }) {
    const { popularAnime, isSearch, searchResults } = useGlobalContext()

    const conditionalRender = () => {
        const animeList = !isSearch && rendered === 'popular' ? popularAnime : searchResults

        return animeList?.map((anime) => (
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="rounded-lg border-4 border-gray-300 overflow-hidden">
                <img src={anime.images.jpg.large_image_url} alt="" className="w-full h-full object-cover" />
            </Link>
        ))
    }

    return (
        <div className="flex">
            <div className="mt-8 p-8 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 bg-white border-t-4 border-gray-300">
                {conditionalRender()}
            </div>
            <Sidebar />
        </div>
    )
}

export default Popular
