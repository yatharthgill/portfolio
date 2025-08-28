"use client";
import Education from "../components/Education";
import Main from "../components/Main";
import ContactPage from "./(pages)/contact/page";
import ProjectPage  from "./(pages)/projects/page";

export default function Home() {


  return (
    <>
      <Main/>
    

      <div>
        <Education />
      </div>
      <div>
        <ProjectPage />
      </div>
      <div>
        <ContactPage/>
      </div>
    </>
  );
}
