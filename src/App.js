import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import 'typeface-roboto';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './Auth/Auth';
import Home from './Home/Home';
import theme from './Theme';
import { UserContext } from './AppContext';

function App() {
    const [user, setUser] = React.useState({});
    const userValue = { user, setUser };

    return (
        <UserContext.Provider value={userValue}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Switch>
                        <Route path="/auth">
                            <Auth />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </UserContext.Provider>
    );
}

export default App;
