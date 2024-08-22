import { Button } from "./components/Button"
import { useState } from "react"
import { generateIdea } from "./lib/generate"
function App() {
  const [idea, setIdea] = useState("↓");

  const generate = async () => {
    setIdea("thinking...");
    setIdea(await generateIdea());
  }

  return (
    <div className="flex flex-col justify-between items-center h-screen p-3">
      <div className="flex-grow flex flex-col items-center justify-center gap-y-5">
        <div className="text-3xl border-2 border-yellow rounded-xl p-2 flex flex-row">
          <span>{idea}</span>
        </div>
        <Button onClick={generate}><span className="text-2xl">Generate!</span></Button>
      </div>
      <div className="text-sm text-zinc-900 text-center mb-4">
        Thanks to <a href="https://hackclub.com" className="text-blue-500" target="_blank">HackClub</a> & <a href="https://github.com/hackclub/wizard-orpheus" className="text-blue-500" target="_blank">Wizard Orpheus</a> for providing the AI necessary for running this app!
      </div>
    </div>
  )
}

export default App
