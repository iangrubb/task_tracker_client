import './App.css';

import Landing from './pages/Landing'
import MainApp from './MainApp'

import useServerAdapter from './hooks/useServerAdapter';


function App() {

  const [autoLogging, server, login, signup] = useServerAdapter()
  
  const determineView = () => {
    if (autoLogging) {
      return <h2>Loading...</h2>
    } else if (server) {
      return <MainApp server={server}/>
    } else {
      return <Landing login={login} signup={signup}/>
    }
  }

  return (
    <div className="App column-centered">
      {determineView()}
    </div>
  );
}

export default App;
