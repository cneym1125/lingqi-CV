import { Hero } from './components/Hero'
import { ExperienceSection } from './components/ExperienceSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { ContactCardHost } from './components/ContactCard'

export default function App() {
  return (
    <div id="top" className="relative min-h-screen bg-zinc-50">
      <main>
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <ContactCardHost />
    </div>
  )
}
