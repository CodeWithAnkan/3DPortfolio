import React from 'react'
import {counterItems} from "../constants/index.js";
import CountUp from 'react-countup'

const AnimatedCounter = () => {
    return (
        <div id='counter' className="padding-x-lg xl:mt-0 mt-32">
            <div className="mx-auto grid-4-cols">
                {
                    counterItems.map((item) => (
                        <div key={item.label} className="card-border rounded-lg p-10 flex flex-col justify-center"> {/* Replaced bg-zinc-900 with card-border */}
                            <div className="counter-number text-5xl font-bold mb-2"> {/* Removed text-white */}
                                <CountUp suffix={item.suffix} end={item.value} />
                            </div>
                            <div className="text-lg" style={{ color: 'var(--color-blue-50)' }}>{item.label}</div> {/* Used var(--color-blue-50) which maps to secondary-text-color in light and muted-blue in dark */}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default AnimatedCounter
