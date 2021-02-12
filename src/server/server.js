import {useState, useEffect} from "react";
import {serverEndpoint, rollingRetentionX, rollingRetentionY} from "../config/endpoints";

// post user data
export async function insertUser (url, userData) {
    const {userID, dateRegistration, dateLastActivity} = userData;
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: "include",
            body: JSON.stringify({
                userID: userID,
                dateRegistration: dateRegistration,
                dateLastActivity: dateLastActivity,
            })
        })
        if (response.ok) {
            console.log("ok");
        }
        document.location.reload();
    } catch(e) {
        console.log( e.name, e.message);
    }
}

// get users table
export function useAsyncHook(searchUsers) {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState("false");

    // сhange postgres timestamp to dd.mm.yyyy
    const changeDateFormat = (date) => {
        const newDate = date.toString().slice(0,10).split('-')
        return [newDate[2], newDate[1], newDate[0]].join('.')
    }

    useEffect(()=> {
        async function fetchUserList(url) {
            try {
                setLoading("true");
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    credentials: "include",
                })
                if (response.ok) {
                    const json = await response.json();

                    setResult(
                        json.map(item => {
                            item.date_registration = changeDateFormat(item.date_registration)
                            item.date_last_activity = changeDateFormat(item.date_last_activity)
                            return item;
                        })
                    );
                }
            } catch(e) {
                console.log( e.name, e.message);
                setLoading(null);
            }
        }

        if (searchUsers === "") {
            fetchUserList(serverEndpoint);
        }
    }, [searchUsers]);

    return [result, loading];
}

// get rolling retention first parameter
export async function getRollingRetentionX() {
    try {
        const response = await fetch(rollingRetentionX, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: "include",
        })
        if (response.ok) {
            return await response.json();
        }
    } catch(e) {
        console.log( e.name, e.message);
    }
}

// get rolling retention second parameter
export async function getRollingRetentionY() {
    try {
        const response = await fetch(rollingRetentionY, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: "include",
        })
        if (response.ok) {
            return await response.json();
        }
    } catch(e) {
        console.log( e.name, e.message);
    }
}