import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';
import Sidebar from './Sidebar';

function Airing({ rendered }) {
    const { airingAnime, isSearch, searchResults } = useGlobalContext();

    const conditionalRender = () => {
        if (!isSearch && rendered === 'airing') {
            return airingAnime?.map((anime) => (
                <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="h-[500px] rounded-lg border-4 border-gray-300 overflow-hidden">
                    <img src={anime.images.jpg.large_image_url} alt="" className="w-full h-full object-cover rounded-md" />
                </Link>
            ));
        } else {
            return searchResults?.map((anime) => (
                <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="h-[500px] rounded-lg border-4 border-gray-300 overflow-hidden">
                    <img src={anime.images.jpg.large_image_url} alt="" className="w-full h-full object-cover rounded-md" />
                </Link>
            ));
        }
    };

    return (
        <div className="flex">
            <div className="mt-8 px-20 py-8 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 bg-white border-t-4 border-gray-300">
                {conditionalRender()}
            </div>
            <Sidebar />
        </div>
    );
}

export default Airing;