import React from 'react';
import { useGlobalContext } from '../context/global';
import Popular from './Popular';
import Upcoming from './Upcoming';
import Airing from './Airing';

function Homepage() {
    const { handleSubmit, search, handleChange, getUpcomingAnime, getAiringAnime } = useGlobalContext();
    const [rendered, setRendered] = React.useState('popular');

    const switchComponent = () => {
        switch (rendered) {
            case 'popular':
                return <Popular rendered={rendered} />;
            case 'airing':
                return <Airing rendered={rendered} />;
            case 'upcoming':
                return <Upcoming rendered={rendered} />;
            default:
                return <Popular rendered={rendered} />;
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen py-10 px-5">
            <header className="w-full max-w-4xl mx-auto text-center">
                <h1 className="text-3xl font-bold mb-6">
                    {rendered === 'popular' ? 'Popular Anime' : rendered === 'airing' ? 'Airing Anime' : 'Upcoming Anime'}
                </h1>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <button
                        className="px-6 py-2 rounded-full text-lg bg-white border-4 border-gray-300 transition-all hover:border-red-500"
                        onClick={() => setRendered('popular')}
                    >
                        Popular 🔥
                    </button>
                    <button
                        className="px-6 py-2 rounded-full text-lg bg-white border-4 border-gray-300 transition-all hover:border-blue-500"
                        onClick={() => {
                            setRendered('airing');
                            getAiringAnime();
                        }}
                    >
                        Airing 📡
                    </button>
                    <button
                        className="px-6 py-2 rounded-full text-lg bg-white border-4 border-gray-300 transition-all hover:border-green-500"
                        onClick={() => {
                            setRendered('upcoming');
                            getUpcomingAnime();
                        }}
                    >
                        Upcoming 🚀
                    </button>
                </div>
                <form className="w-full flex justify-center" onSubmit={handleSubmit}>
                    <div className="relative w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Search Anime"
                            value={search}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-full text-lg border-4 border-gray-300 outline-none focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-5 py-2 rounded-full text-lg"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </header>
            <div className="mt-10">{switchComponent()}</div>
        </div>
    );
}

export default Homepage;