import { SubsProvider } from "./Context/SubscribersContext.jsx";
import SubscriberContainer from "./Components/SubscriberContainer.jsx";
function Layout() {

  return (
    <SubsProvider>
      <main>
        <SubscriberContainer />
      </main>
    </SubsProvider>
  )
}

export default Layout
