import React from "react";
import './App.css';
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import {Route, Routes} from "react-router-dom";
import Message from "./Components/Content/Message/Message";
import Profile from "./Components/Content/Profile/Profile";
import News from "./Components/Content/News/News";
import Music from "./Components/Content/Music/Music";
import Settings from "./Components/Content/Settings/Settings";


const App = () => {

    return (


            <div className='App'>
                <Header />
                <Sidebar />
                <div class='app-wrapper-content'>
                    <Routes>
                        <Route path="/message/:id" element= {<Message/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Routes>
                </div>
            </div>


    );
}

export default App;
