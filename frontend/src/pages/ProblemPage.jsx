import {useEffect, useState} from 'react'
import {useNavigate,useParams} from "react-router";
import {Panel,PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import ProblemDescription from '../components/ProblemDescription';
import OutputPanel from '../components/OutputPanel';
import CodeEditorPanel from '../components/CodeEditorPanel';
import { PROBLEMS } from '../data/problems';
import Navbar from '../components/Navbar';
import {toast} from "react-hot-toast"
import {executeCode} from "../lib/piston"

function ProblemPage() {

 const { id } = useParams();
 const navigate = useNavigate();

 const [currentProblemId, setCurrentProblemId] = useState("two-sum")
 const [selectedLanguage, setSelectedLanguage] = useState("javascript")
 const [code,setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript)
 const [output,setOutput] = useState(null)
 const [isRunning,setIsRunning]= useState(false)
 const currentProblem = PROBLEMS[currentProblemId]
 useEffect(()=>{
  if(id && PROBLEMS[id]){
    setCurrentProblemId(id)
    setCode(PROBLEMS[id].starterCode[selectedLanguage])
    setOutput(null)
  }
 },[id, selectedLanguage]);

 const handleLanguageChange = (e) => {
  const newLang =e.target.value;
  setSelectedLanguage(newLang)
  setCode(currentProblem.starterCode[newLang])
  setOutput(null);

 } 

  const normalizeOutput = (output) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };
 const handleProblemChange = (newproblemid)=>navigate(`/problem/${newproblemid}`)
 const triggerConfetti = ()=>{}
 const checkIfTestsPassed = (actualOutput , expectedOutput)=>{
  const normalizedActual = normalizeOutput(actualOutput);
  const normalizedExpected = normalizeOutput(expectedOutput);
  return normalizeOutput==normalizedExpected;
 }
 const handleRunCode = async () =>{
  setIsRunning(true)
  setOutput(null)
  const result = await executeCode(selectedLanguage,code);
  setOutput(result);
  setIsRunning(false);
  if(result.success){
    const expectedOutput = currentProblem.expectedOutput[selectedLanguage]
    const testsPassed = checkIfTestsPassed(result.output.expectedOutput)

    if(testsPassed){
      toast.success("Chal gya , badhayi ho")
    }
    else{
      toast.error("Kuch toh gadbad hai daya");
    }
  }
 }

  return (
    <div className='h-screen bg-base-100 flex flex-col'>
      <Navbar/>
<div className='flex-1'>
  <PanelGroup direction='horizontal'>
    <Panel defaultSize={40} minSize={30}>
      <ProblemDescription
      problem={currentProblem}
      currentProblem={currentProblemId}
      onProblemChange={handleProblemChange}
      allProblems={Object.values(PROBLEMS)}/>
    </Panel>
    <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize"/>
       <Panel defaultSize={60} minSize={30}>
      <PanelGroup direction='vertical'>
         <Panel defaultSize={70} minSize={30}>
      <CodeEditorPanel
      selectedLanguage={selectedLanguage}
      code={code}
      onLanguageChange={handleLanguageChange}
      onCodeChange={setCode}
onRunCode={handleRunCode}
isRunning={isRunning}/>
        </Panel>
         <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize"/>
        <Panel defaultSize={30} minSize={30}>
      <OutputPanel/>
        </Panel>
      </PanelGroup>
    </Panel>

  </PanelGroup>
</div>
    </div>
  )
}

export default ProblemPage
