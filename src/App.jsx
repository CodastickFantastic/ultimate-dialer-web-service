import "./App.scss";

import firebase from "./services/firebase.js";

import LogInScreen from "./components/LogInScreen/LogInScreen";
import Dashboard from "./components/Dashboard/Dashboard";

import { useEffect, useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import AddContactList from "./pages/AddContactList/AddContactList";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataBaseContextProvider } from "./utility/contexts/DataBaseContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <>
      {user ? (
        <>
          <DataBaseContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigation user={user} />}>
                  <Route index element={<Dashboard user={user} />} />
                  <Route
                    path="/add-contact-list"
                    element={<AddContactList />}
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </DataBaseContextProvider>
        </>
      ) : (
        <LogInScreen />
      )}
    </>
  );
}

export default App;
