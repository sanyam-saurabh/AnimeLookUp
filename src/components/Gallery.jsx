import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGlobalContext } from '../context/global';


function Gallery() {
    const { getAnimePictures, pictures } = useGlobalContext();
    const { id } = useParams();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        getAnimePictures(id);
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
            <div className="absolute top-8 left-8">
                <Link to="/" className="text-red-500 font-semibold flex items-center gap-2">
                    <i className="fas fa-arrow-left"></i> Back to Home
                </Link>
            </div>
            <div className="p-8 m-8 bg-white rounded-lg border-4 border-gray-300 shadow-lg">
                {pictures[index] && <img src={pictures[index]?.jpg.image_url} alt="" className="w-80 rounded" />}
            </div>
            <div className="flex flex-wrap gap-2 w-4/5 p-4 bg-white border-4 border-gray-300 rounded-lg shadow-md">
                {pictures?.map((picture, i) => (
                    <div 
                        key={i} 
                        className={`w-24 h-24 cursor-pointer rounded-lg overflow-hidden border-4 transition-all duration-300 ${
                            i === index ? 'border-green-500 grayscale-0 scale-110' : 'border-gray-300 grayscale hover:grayscale-0'
                        }`} 
                        onClick={() => setIndex(i)}
                    >
                        <img src={picture?.jpg.image_url} alt="" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Gallery;


