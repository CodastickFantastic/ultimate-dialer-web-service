import "./App.css";

import firebase from "./services/firebase.js";

import LogInScreen from "./components/LogInScreen/LogInScreen";
import Dashboard from "./components/Dashboard/Dashboard";

import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="appContainer">
      {user ? <Dashboard user={user} /> : <LogInScreen />}
    </div>
  );
}

export default App;
