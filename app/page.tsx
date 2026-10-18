import { getProfile, getProjects, getExperiences } from "@/lib/sheets/api";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ProjectsList } from "@/components/sections/ProjectsList";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ArchitectureShowcase } from "@/components/sections/ArchitectureShowcase";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default async function HomePage() {
  const [profile, projects, experiences] = await Promise.all([
    getProfile(),
    getProjects(),
    getExperiences(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar githubUrl={profile.github} linkedinUrl={profile.linkedin} />
      <main className="flex-1">
        <Hero profile={profile} />
        <ProjectsList initialProjects={projects} />
        <ExperienceTimeline experiences={experiences} />
        <ArchitectureShowcase />
        <ContactSection
          email={profile.email}
          githubUrl={profile.github}
          linkedinUrl={profile.linkedin}
        />
      </main>
      <Footer />
    </div>
  );
}
