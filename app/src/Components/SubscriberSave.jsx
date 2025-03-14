import React from 'react';
import {useSubs} from "../Context/SubscribersContext.jsx";

export default function SubscriberSave() {
    const { saveSubs } = useSubs();
    return (
        <button
            className="p-1.5 font-bold text-md bg-indigo-950 rounded-md
                 text-whiterounded-md w-32 self-center border-2 border-sky-900 focus:ring-2 focus:ring-sky-700 focus:border-transparent focus:outline-none active:bg-sky-700"
            onClick={() => saveSubs()}
        >
            Save
        </button>
    )

}