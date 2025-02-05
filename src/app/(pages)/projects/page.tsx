import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ProjectPage() {
  const workExperience = [
    {
      title: "Mystry Message",
      image: "/mystryMessage.png",
      description:
        "I made a news app using Next.js that includes core authentication and email verification through OTP. After verification and login, users can share their profile link to receive anonymous messages. ",
      link: "https://nextjs-liard-nine-48.vercel.app/",
      badge: "NextJs",
    },
    {
      title: "CoreNetworking Classes",
      image: "/cnc.png",
      description:
        "I designed the footer, made changes to the testimonial section, and modified the form that appears when the website opens.",
      link: "https://www.corenetworkingclasses.com/",
      badge: "Web Design",
    },
    {
      title: "TechHub Technology",
      image: "/techhub.png",
      description:
        "I have designed the entire website of TechHub Technology using HTML, CSS, JavaScript, and PHP. This project is under development, and I'm currently working as an intern on this website.",
      link: "https://techhubtechnology.com/",
      badge: "Full Stack",
    },
    {
      title: "Text Utils",
      image: "/textutil.png",
      description:
        "I made the Text-Utils app using React when I was learning React. In this app, we can copy text, convert text to uppercase, convert text to lowercase, etc.",
      link: "#",
      badge: "React",
    },
    {
      title: "News Monkey",
      image: "/newsmonkey.png",
      description:
        "I made a news app using React which fetches news from a news API. It also has different categories, and you can read news in both light and dark modes.",
      link: "#",
      badge: "React & API",
    },

    
  ];

  return (
    <div className="p-8 md:px-36 md:py-7">
      <div className="heading text-center text-4xl mb-5">Projects</div>
      <div className=" md:min-h-[500px] h-full w-full rounded-2xl grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 overflow-hidden p-4 transition-colors duration-300">
        {workExperience.map((item, idx) => (
          <div
            key={`work-${idx}`}
            className="relative min-h-[500px] max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-black
            dark:border-black hover:border-[#E00FE0] hover:dark:border-[#E00FE0] hover:scale-105 transition-transform duration-300 hover:shadow-[0px_0px_10px_#E00FE0]"
          >
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <div className="relative w-full h-40">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
            </a>
            <div className="p-5">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item.description}
              </p>
            </div>
            <div className="absolute bottom-5 left-5 p-5">
              <Button
                asChild
                className="bg-[#E00FE0] hover:bg-[#C00DC0] text-black hover:text-black dark:hover:text-white dark:text-white hover:shadow-[0px_0px_10px_#E00FE0] border-[#E00FE0] hover:border-[#E00FE0] hover:dark:shadow-[0px_0px_10px_#E00FE0]"
              >
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
