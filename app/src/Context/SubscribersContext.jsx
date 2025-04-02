import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useGoogleAnalytics} from "./GoogleAnalyticsContext.jsx";

const subsContext = createContext(undefined);
const DOMAIN = import.meta.env.VITE_DOMAIN;
export const SubsProvider = ({children}) => {
    const { subAdded, subDeleted, campMonitorApiError, userTrack, saveTime } = useGoogleAnalytics();
    const [subs, setSubs] = useState([]);
    useEffect(() => {
        fetchSubs();
    }, []);

    const fetchSubs = async () => {
        try {
            const request = axios.get(`http://campmonitor.${DOMAIN}/api/subscribers`)
            const response = await request;
            const data = response.data;
            if(data.error_message){
                throw new Error(data.error_message);
            }
            console.log(data[0]);
            setSubs(data);
        } catch (error) {
            campMonitorApiError(error.message, 'get')
            console.error(error);
        }
    }
    const deleteSub = (email) => {
        console.log(email);
        const subIndex = subs.findIndex(sub => sub.EmailAddress === email);
        console.log(subIndex);
        subDeleted(subIndex, subs.length, email);
        setSubs(subs.filter(sub => sub.EmailAddress !== email));
        userTrack(subs.length)
    }

    const addSub = (newSub) => {
        const duplicate = subs.some(sub => sub.EmailAddress === newSub.EmailAddress);
        if(duplicate){
            alert("Can't enter duplicate email!");
            throw new Error("Subscriber already exists");
        }
        subAdded(newSub.submitTime, newSub.EmailAddress, newSub.errors);
        setSubs([...subs, newSub]);
        userTrack(subs.length)
    }

    const saveSubs = async () => {
        try {
            const start = Date.now();
            const request = axios.post(`http://campmonitor.rafaelhome.mourou.dev/api/subscribers/import`, {subscribers: subs});
            const response = await request;
            const data = response.data;
            if(data.error_message){
                throw new Error(data.error_message);
            }
            const end = Date.now();
            const duration = Math.floor(((end - start)*100)/100)/1000;

            saveTime(`${duration}s`);
            userTrack(subs.length);
        } catch (error) {
            console.log(error)
            campMonitorApiError(error.message, 'save');
            console.error(error.message);
        }
    }

    return (
        <subsContext.Provider value={{subs, setSubs, deleteSub, addSub, saveSubs }}>
            {children}
        </subsContext.Provider>
    )
}

export const useSubs = () => {
    const context = useContext(subsContext);
    if (!context) {
        throw new Error('useTheme must be used within a SubsContext');
    }
    return context;
}

