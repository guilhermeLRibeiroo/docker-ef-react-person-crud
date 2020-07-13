import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';

import Home from './components/home/Home';
import People from './components/people/People';

export default function Router() {
    return (
        <BrowserRouter>
            <div>
                <Navbar bg="dark" variant="dark">
                    <Nav>
                        <Navbar.Brand>
                            Icon
                        </Navbar.Brand>
                        <Nav.Link href="/">
                            Home
                        </Nav.Link>
                        <Nav.Link href="/people">
                            People
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </div>

            <Switch>
                <Route path="/people">
                    <People />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}