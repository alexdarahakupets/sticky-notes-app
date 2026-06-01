import { DragArea } from "./components/drag-area";
import { NoteContextProvider } from "./context/note-context/note-context-provider";

function App() {
  return (
    <NoteContextProvider>
      <div className="relative h-[100vh] w-[100wh]">
        <DragArea />
      </div>
    </NoteContextProvider>
  );
}

export default App;
