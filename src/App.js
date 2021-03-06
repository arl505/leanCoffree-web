import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Session from "./session/Session";
import Splash from "./splash/Splash";
import Alert from './Alert';

function App() {

  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");

  return (
    <div>
      <Alert isVisible={isAlertVisible} setIsVisible={setIsAlertVisible} text={alertText}/>
      <Router>
        <Switch>
        <Route path='/session' 
            render={(props) => (
              <Session {...props} isAlertVisible={isAlertVisible} setIsAlertVisible={setIsAlertVisible} setAlertText={setAlertText}/>
            )}
          />
          <Route path='/' 
            render={(props) => (
              <Splash {...props} isAlertVisible={isAlertVisible} setIsAlertVisible={setIsAlertVisible} setAlertText={setAlertText}/>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
