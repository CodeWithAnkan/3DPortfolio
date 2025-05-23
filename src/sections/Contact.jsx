import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
    useUser,
    SignedIn,
    SignedOut,
    SignInButton,
} from "@clerk/clerk-react";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/Models/contact/ContactExperience";

const Contact = () => {
    const { user } = useUser();
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    useEffect(() => {
        if (user) {
            setForm((prevForm) => ({
                ...prevForm,
                email: user?.primaryEmailAddress?.emailAddress || "",
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await emailjs.send(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                {
                    name: form.name,
                    email: form.email,
                    message: form.message,
                },
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            );

            setForm({
                name: "",
                email: user?.primaryEmailAddress?.emailAddress || "",
                message: "",
            });
        } catch (error) {
            console.error("EmailJS Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Get in Touch – Let’s Connect"
                    sub="💬 Have questions or ideas? Let’s talk! 🚀"
                />

                <SignedOut>
                    <div className="flex flex-col items-center justify-center mt-10 gap-4">
                        <p className="text-lg text-gray-600">Please sign in to contact me.</p>
                        <SignInButton mode="modal">
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Sign In
                            </button>
                        </SignInButton>
                    </div>
                </SignedOut>

                <SignedIn>
                    <div className="grid-12-cols mt-16">
                        <div className="xl:col-span-5">
                            <div className="flex-center card-border rounded-xl p-10">
                                <form
                                    ref={formRef}
                                    onSubmit={handleSubmit}
                                    className="w-full flex flex-col gap-7"
                                >
                                    <div>
                                        <label htmlFor="name">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="What’s your good name?"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email">Your Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            readOnly
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message">Your Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="How can I help you?"
                                            rows="5"
                                            required
                                        />
                                    </div>

                                    <button type="submit" disabled={loading}>
                                        <div className="cta-button group">
                                            <div className="bg-circle" />
                                            <p className="text">
                                                {loading ? "Sending..." : "Send Message"}
                                            </p>
                                            <div className="arrow-wrapper">
                                                <img src="/images/arrow-down.svg" alt="arrow" />
                                            </div>
                                        </div>
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="xl:col-span-7 min-h-96">
                            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
                                <ContactExperience />
                            </div>
                        </div>
                    </div>
                </SignedIn>
            </div>
        </section>
    );
};

export default Contact;