import React, {useRef} from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
    const sectionRef = useRef(null);
    const project1Ref = useRef(null);
    const projectRefs = useRef([]);

    const githubProjects = [
        {
            title: "Klarity",
            image: "/images/project1.png",
            bgClass: "bg-[#ffefdb]",
            repoUrl: "https://github.com/CodeWithAnkan/klarity",
        },
        {
            title: "Kuber AI Invoice App",
            image: "/images/project2.png",
            bgClass: "bg-[#f1f5ff]",
            repoUrl: "https://github.com/CodeWithAnkan/kuber-ai-invoice-app",
        },
        {
            title: "PathForge AI",
            image: "/images/project3.png",
            bgClass: "bg-[#ffe7eb]",
            repoUrl: "https://github.com/CodeWithAnkan/pathforge-ai",
        },
        {
            title: "Earnings Analyzer",
            image: "/images/cine.png",
            bgClass: "bg-[#e8f8f2]",
            repoUrl: "https://github.com/CodeWithAnkan/earnings-analyzer",
        },
    ];

    useGSAP(() => {
        const projects = [project1Ref.current, ...projectRefs.current];
        projects.forEach((card, index) => {
            if (!card) return;
            gsap.fromTo(
                card,
                {y: 50, opacity: 0},
                {y: 0, opacity: 1, duration: 1, delay: 0.3 * (index + 1), scrollTrigger:{
                        trigger: card,
                        start: 'top bottom-=100'
                    }},
            )
        })
        gsap.fromTo(sectionRef.current,
            { opacity: 0 },
            {opacity: 1, duration: 1.5}
        );
    }, []);

    return (
        <section id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    {/*LEFT*/}
                    <div className="first-project-wrapper pt-6" ref={project1Ref}>
                        <div className="image-wrapper">
                            <img src="/images/CineIQ.png"  alt="CineIQ"/>
                        </div>
                        <div className="text-content">
                            <h2>Movie Discovery Made Effortless With CineIQ — Your Go-To App For Exploring, Tracking, And Learning About Films In A Tap</h2>
                            <p className="text-white-50 md:text-xl">
                                An app built with React-Native, Expo, & TailwindCSS for a fast, user-friendly experience
                            </p>
                        </div>
                    </div>

                    {/*RIGHT*/}
                    <div className="project-list-wrapper overflow-hidden">
                        {githubProjects.map((project, index) => (
                            <div
                                className="project pt-6"
                                key={project.title}
                                ref={(el) => {
                                    projectRefs.current[index] = el;
                                }}
                            >
                                <div className={`image-wrapper ${project.bgClass}`}>
                                    <img src={project.image} alt={project.title}/>
                                    <h2>{project.title}</h2>
                                </div>
                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`} className="text-white-50 md:text-lg hover:text-white">
                                    View on GitHub
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ShowcaseSection
