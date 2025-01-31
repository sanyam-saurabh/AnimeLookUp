import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function AnimeItem() {
    const { id } = useParams();
    const [anime, setAnime] = useState({});
    const [characters, setCharacters] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const {
        title, synopsis, trailer, duration, aired, season, images,
        rank, score, scored_by, popularity, status, rating, source
    } = anime;

    const getAnime = async (animeId) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
        const data = await response.json();
        setAnime(data.data);
    };

    const getCharacters = async (animeId) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
        const data = await response.json();
        setCharacters(data.data);
    };

    useEffect(() => {
        getAnime(id);
        getCharacters(id);
    }, [id]);

    return (
        <div className="p-12 bg-gray-100">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-500 mb-6">{title}</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <img className="rounded-lg" src={images?.jpg.large_image_url} alt="Anime" />
                    <div className="space-y-2">
                        <p><span className="font-semibold">Aired:</span> {aired?.string}</p>
                        <p><span className="font-semibold">Rating:</span> {rating}</p>
                        <p><span className="font-semibold">Rank:</span> {rank}</p>
                        <p><span className="font-semibold">Score:</span> {score}</p>
                        <p><span className="font-semibold">Scored By:</span> {scored_by}</p>
                        <p><span className="font-semibold">Popularity:</span> {popularity}</p>
                        <p><span className="font-semibold">Status:</span> {status}</p>
                        <p><span className="font-semibold">Source:</span> {source}</p>
                        <p><span className="font-semibold">Season:</span> {season}</p>
                        <p><span className="font-semibold">Duration:</span> {duration}</p>
                    </div>
                </div>
                <p className="mt-4 text-gray-700">
                    {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
                    <button className="text-green-600 font-semibold ml-2" onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Show Less' : 'Read More'}
                    </button>
                </p>
            </div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-500 my-6">Trailer</h3>
            <div className="flex justify-center">
                {trailer?.embed_url ? (
                    <iframe className="border-4 border-gray-300 p-4 rounded-lg bg-white shadow-lg" src={trailer.embed_url} title="Trailer" width="800" height="450" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                ) : (
                    <h3 className="text-xl">Trailer not available</h3>
                )}
            </div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-500 my-6">Characters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white p-6 rounded-lg shadow-lg">
                {characters?.map((character, index) => {
                    const { role } = character;
                    const { images, name, mal_id } = character.character;
                    return (
                        <Link to={`/character/${mal_id}`} key={index} className="p-2 bg-gray-200 rounded-lg hover:-translate-y-1 transition-transform">
                            <img className="w-full rounded-lg" src={images?.jpg.image_url} alt="Character" />
                            <h4 className="text-lg font-semibold mt-2 text-gray-700">{name}</h4>
                            <p className="text-green-600">{role}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default AnimeItem;