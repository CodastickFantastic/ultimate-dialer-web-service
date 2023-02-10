import "./App.scss";

import firebase from "./services/firebase.js";

import LogInScreen from "./components/LogInScreen/LogInScreen";

import { useEffect, useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import AddContactList from "./pages/AddContactList";

import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { DataBaseContextProvider } from "./utility/contexts/DataBaseContext";
import ContactList from "./pages/ContacList";
import UnderConstruction from "./pages/UnderConstruction";
import Dashboard from "./pages/Dashboard";

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
          <DataBaseContextProvider user={user}>
            <HashRouter>
              <Routes>
                <Route path="/" element={<Navigation user={user} />}>
                  <Route index element={<Dashboard user={user} />} />
                  <Route
                    path="/add_contact_list"
                    element={<AddContactList />}
                  />
                  <Route path="/contact_list" element={<ContactList />} />
                  <Route
                    path="/bulk_sms"
                    element={<UnderConstruction name="Bulk SMS" />}
                  />
                  <Route
                    path="/settings"
                    element={<UnderConstruction name="Settings" />}
                  />
                </Route>
              </Routes>
            </HashRouter>
          </DataBaseContextProvider>
        </>
      ) : (
        <LogInScreen />
      )}
    </>
  );
}

export default App;
