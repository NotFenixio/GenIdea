import { Button } from "./components/Button"
import { useState } from "react"
import { generateIdea } from "./lib/generate"
function App() {
  const [idea, setIdea] = useState("↓");

  const generate = () => {
    setIdea(generateIdea());
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-5">
      <div className="text-3xl border-2 border-yellow rounded-xl p-2 flex flex-row">
        <span>{idea}</span>
      </div>
      <Button onClick={generate}><span className="text-2xl">Generate!</span></Button>
    </div>
  )
}

export default App
