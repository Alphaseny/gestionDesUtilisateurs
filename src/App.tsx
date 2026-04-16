import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserContextProvider } from "./contexts/userContext";
import { Home } from "./feats/Users/components/home";
import { Layout } from "./feats/Users/components/layout";
import { UserAdd } from "./feats/Users/components/userAdd";
import { UserList } from "./feats/Users/components/userList";
import { NotFound } from "./pages/notFound";
export function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="useradd" element={<UserAdd />} />
            <Route path="userlist" element={<UserList />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}
