import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login'
import Error404 from './components/Error404';
import Navbar from './components/Navbar';
import { UserContext } from './context/userContext';

export default function App() {
  const [isLogged, setIsLogged] = useState(false);

  const setAuth = () => {
    setIsLogged(!isLogged);
    /*if (isLogged) {
      setIsLogged(false)
    } else {
      setIsLogged(true)
    }*/
    //setIsLogged(isLogged ? false : true);
  }

  return (
    <UserContext.Provider value={{ isLogged, setAuth }}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="*" component={Error404} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  )
}
