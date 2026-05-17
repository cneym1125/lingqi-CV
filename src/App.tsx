import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { ExperienceSection } from './components/ExperienceSection'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'
import { EducationSection } from './components/EducationSection'
import { AwardsSection } from './components/AwardsSection'
import { SelfEvalSection } from './components/SelfEvalSection'
import { ContactSection } from './components/ContactSection'
import { ScrollProgress } from './components/ScrollProgress'
import { ContactCardHost } from './components/ContactCard'

export default function App() {
  return (
    <div id="top" className="relative min-h-screen">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <AwardsSection />
        <SelfEvalSection />
        <ContactSection />
      </main>
      <ContactCardHost />
    </div>
  )
}
