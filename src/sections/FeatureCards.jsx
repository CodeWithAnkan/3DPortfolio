import React from 'react'
import {abilities} from "../constants/index.js";

const FeatureCards = () => {
    return (
        <div className="w-full padding-x-lg">
            <div className="mx-auto grid-3-cols">
                {abilities.map(({imgPath, title, desc}) => (
                    <div key={title} className="card-border rounded-xl p-8 flex flex-col gap-4">
                        <div className="size-14 flex items-center justify-center rounded-full">
                            {/* Assuming imgPath are SVGs or transparent PNGs that work on both light/dark card backgrounds, or they are themed via CSS if they are class-based SVGs */}
                            <img src={imgPath} alt={title} />
                        </div>
                        <h3 className="text-2xl font-semibold mt-2">{title}</h3> {/* Removed text-white */}
                        <p className="text-lg" style={{ color: 'var(--color-blue-50)' }}>{desc}</p> {/* Used var(--color-blue-50) for secondary text */}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default FeatureCards
