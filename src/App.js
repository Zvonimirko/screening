import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./components/login/Login";
import UserData from "./components/userData/UserData";
import setAuthToken from "./utilities/setAuthToken";

import "./App.scss";

function App() {
  const [user, updateUser] = useState(null);

  const checkAuth = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get(
        "https://api.getcountapp.com/api/v1/users/me"
      );
      const { firstName, lastName } = res.data;
      updateUser({
        firstName: firstName,
        lastName: lastName,
      });
    } catch (err) {
      console.log(err.response.status);
    }
  };

  useEffect(() => {
    checkAuth(localStorage.token);
  }, []);

  return (
    <div className="App">
      {!user && <Login updateUser={(data) => updateUser(data)} />}
      {user && <UserData user={user} updateUser={updateUser} />}
    </div>
  );
}

export default App;
