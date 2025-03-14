import React from 'react';
import {useSubs} from "../Context/SubscribersContext.jsx";
import SubscriberItem from "./SubscriberItem.jsx";
import axios from "axios";
export default function SubscriberContainer() {
    const {subs} = useSubs();

    return (
        <div className="flex flex-col p-2 w-full h-40  border border-sky-900 rounded">
            <section className="grid grid-cols-12 min-w-screen text-md font-bold ">
                <span className={"col-span-6 "}>email</span>
                <span className={"col-span-5 "}>full name</span>
            </section>
            <div className="overflow-y-auto overflow-x-hidden
             [&>*:nth-child(even)]:bg-indigo-950 [&>*:nth-child(odd)]:bg-blue-950
             ">
                {
                    subs.map((sub) =>
                        (
                            <SubscriberItem email={sub.EmailAddress} name={sub.Name}  />
                        )
                    )
                }
            </div>
        </div>
    )
}