/// Import necessary components and functions from react-router-dom.
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Feed } from "./pages/Feed";
import { Profile } from "./pages/Profile";

export const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Feed */}
        <Route path="/feed" element={<Feed />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

      </Route>
    )
);
