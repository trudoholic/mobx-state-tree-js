import React from "react"
import './App.css'
import Header from "./components/Header"
import MainSection from "./components/MainSection"
// import React from "@types/react"


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//       </header>
//         <div>
//             <Header addTodo={store.addTodo} />
//             <MainSection store={store} />
//         </div>
//     </div>
//   );
// }

const App = ({ store }) => (
    <div>
        <Header addTodo={store.addTodo} />
        <MainSection store={store} />
    </div>
)

export default App
