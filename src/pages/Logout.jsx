
import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorHandler from "../components/ErrorHandler";
import { UserContext } from "../App";

export default function Logout(args) {

    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        localStorage.setItem("authToken", null)
        localStorage.setItem("user", null)
        setUser(false);
        navigate("/");
    }
    )

    return(
        <div>
    </div>
    )
}