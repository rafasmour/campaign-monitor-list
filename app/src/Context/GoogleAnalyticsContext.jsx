import React, {createContext, useContext, useEffect} from "react";

import ReactGA from "react-ga4";

const googleAnalyticsId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

const GoogleAnalyticsContext = createContext();

export const GoogleAnalyticsProvider = ({children}) => {
    const [status, setStatus] = React.useState(false);
    console.log(status);

    const connectToGoogleAnalytics = async () => {
        try {
            console.log(googleAnalyticsId)
            await ReactGA.initialize(googleAnalyticsId);
            if(!ReactGA.isInitialized){
                throw new Error("Failed to connect to Google Analytics");
            }
            ReactGA.send({ hitType: "pageview", page: "/", title: "New Visit" })
            setStatus(ReactGA.isInitialized);
        } catch (e) {
            console.log(e)
        }

    }
    const sendToGoogleAnalytics = (eventName, data) => {
        ReactGA.event(eventName, data);
    }

    const mainPlatforms = [
        'gmail.com',
        'yahoo.com',
        'outlook.com',
        'hotmail.com'
    ]
    const emailType = (email) => {
        const emailType = email.split('@')[1];
        console.log(emailType)
        if(mainPlatforms.some(platform => platform === emailType)){
            console.log('generic')
            return "generic";
        }
        console.log('possibly personal')
        return "possibly personal";
    }
    const subAdded = (subTime, email, errors) => {
        try {
            console.log(status)
            sendToGoogleAnalytics("click_add_subscriber",{
                category: "Subs",
                label: "Subscriber Added",
                time_needed: subTime,
                email_type: emailType(email),
                errors: errors
            });
        } catch(e) {
            console.error(e?.message);
        }
    }

    const subDeleted = (subIndex, subCount, email) => {
        try {
            const subPosition = `Subscriber: ${subIndex+1}/${subCount}`
            sendToGoogleAnalytics("click_remove_subscriber", {
                category: "Subs",
                label: "Subscriber Removed",
                sub_position: subPosition,
                email_type: emailType(email),
            });
        } catch(e) {
            console.error(e?.message);
        }
    }

    const campMonitorApiError = (error, on) => {
        try {
            sendToGoogleAnalytics("cm_error", {
                category: "Campaign Monitor API",
                error_message: error,
                error_on: on
            });
        } catch(e) {
            console.error(e?.message);
        }
    }

    const userTrack = (subCount) => {
        try {
            sendToGoogleAnalytics("subscriber_count", {
                category: "Subs",
                label: "Tracking Subscribers",
                sub_count: subCount
            });
        } catch(e) {
            console.error(e?.message);
        }
    }

    const saveTime = (seconds) => {
        try {
            sendToGoogleAnalytics("save_time", {
                category: "Subs",
                label: "Save Subscribers",
                time_needed: seconds
            });
        } catch(e) {
            console.error(e?.message);
        }
    }


    useEffect(() => {
        connectToGoogleAnalytics();
    }, [])
    return (
        <GoogleAnalyticsContext.Provider value={{status, subAdded, subDeleted, campMonitorApiError, userTrack, saveTime}}>
            {children}
        </GoogleAnalyticsContext.Provider>
    )
}

export const useGoogleAnalytics = () => {
    const context = useContext(GoogleAnalyticsContext);
    if (!context) {
        throw new Error('useGoogleAnalytics must be used within a GoogleAnalyticsProvider');
    }

    return context

}