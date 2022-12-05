import './App.css';
import Layout from './component/layout/layout';
import AppContextProvider from './treeviewContext';


function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Layout />
      </AppContextProvider>
    </div>
  );
}

export default App;
