import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
// import ItemList from "./items/ItemList";
import Items from "./items/Items";
import { CategoryList } from "./categories/CategoryList";
import ItemDetails from "./items/ItemDetails";
import { EditItem } from "./items/EditItem";
// import { CategoryCreate } from "./categories/CategoryCreate";


export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              {/* <Bikes /> */}
            </AuthorizedRoute>
          }
        />
        <Route path="items"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Items loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route path="items/:itemId"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <ItemDetails loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route path="items/:itemId/edit"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <EditItem loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route path="categories">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <CategoryList loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
          <Route
            path="create"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                {/* <CategoryCreate /> */}
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route
          path="employees"
          element={
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              {/* <UserProfileList /> */}
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
