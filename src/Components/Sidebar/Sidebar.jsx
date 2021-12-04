import React from "react";
import s from "./Sidebar.module.css"
import {NavLink} from "react-router-dom";

let Sidebar = () => {
    return (

        <nav className={s.Sidebar}>
            <div className={s.ItemFlex}>
                <div className={s.item}>
                    <NavLink exact activeClassName={s.active}  to="/profile" >Profile</NavLink>
                </div>

                <div className={s.item}>
                    <NavLink   to="/message" activeClassName={s.hello}>Message</NavLink>
                </div>

                <div className={s.item}>
                    <NavLink to="/news">News</NavLink>
                </div>

                <div className={s.item}>
                    <NavLink to="/music">Music</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/settings">Settings</NavLink>
                </div>
            </div>

        </nav>

    )
}
export default Sidebar