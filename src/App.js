import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Session from "./session/Session";
import Splash from "./splash/Splash";
import Alert from './Alert';

function App() {

  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [confirmationCallback, setConfirmationCallback] = React.useState(() => {})
  const [callbackWithoutConfirmation, setCallbackWithoutConfirmation] = React.useState(false)

  let wipeCallback = () => {
    setConfirmationCallback(() => {})
  }

  let wipeCallbackWithoutConfirmation = () => {
    setCallbackWithoutConfirmation(false)
  }

  return (
    <div>
      <Alert wipeCallback={wipeCallback} isVisible={isAlertVisible} setIsVisible={setIsAlertVisible} text={alertText} confirmationCallback={confirmationCallback}
        callbackWithoutConfirmation={callbackWithoutConfirmation} wipeCallbackWithoutConfirmation={wipeCallbackWithoutConfirmation}/>
      <Router>
        <Switch>
        <Route path='/session' 
            render={(props) => (
              <Session {...props} isAlertVisible={isAlertVisible} setIsAlertVisible={setIsAlertVisible} setAlertText={setAlertText} setConfirmationCallback={setConfirmationCallback} setCallbackWithoutConfirmation={setCallbackWithoutConfirmation}/>
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
