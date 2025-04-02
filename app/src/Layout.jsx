import React from 'react';
import { SubsProvider } from "./Context/SubscribersContext.jsx";
import SubscriberContainer from "./Components/SubscriberContainer.jsx";
import SubscriberForm from "./Components/SubscriberForm.jsx";
import SubscriberSave from "./Components/SubscriberSave.jsx";
import {GoogleAnalyticsProvider} from "./Context/GoogleAnalyticsContext.jsx";
function Layout() {

  return (
  <GoogleAnalyticsProvider>
      <SubsProvider>
          <main className="w-full min-h-screen flex flex-col items-center justify-center bg-indigo-950">
              <div className="min-w-80 max-w-96 flex flex-col gap-12 h-full rounded-xl p-3  bg-blue-950 border-2 border-sky-900 shadow-2xl">
                  <SubscriberForm />
                  <SubscriberContainer />
                  <SubscriberSave />
              </div>
          </main>
      </SubsProvider>
  </GoogleAnalyticsProvider>
  )
}

export default Layout
