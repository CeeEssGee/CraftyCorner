import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Items from "./items/Items";
import { CategoryList } from "./categories/CategoryList";
import ItemDetails from "./items/ItemDetails";
import { EditItem } from "./items/EditItem";
import { MyProfile } from "./userProfiles/MyProfile";
import { MyBorrowedItems } from "./userProfiles/MyBorrowedItems";
import MyItems from "./userProfiles/MyItems";
import Home from "./home/Home";
import { EditProfile } from "./userProfiles/EditProfile";
import { EventList } from "./events/EventList";
import EventDetails from "./events/EventDetails";
import { EditEvent } from "./events/EditEvent";
import { MyEvents } from "./userProfiles/MyEvents";
import { MyRsvps } from "./userProfiles/MyRsvps";


export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home />
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

        <Route
          path="community"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <EventList loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route
          path="community/:eventId"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <EventDetails loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route
          path="community/:eventId/edit"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <EditEvent loggedInUser={loggedInUser} />
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

        </Route>

        <Route
          path="profile"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MyProfile loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route
          path="profile/edit/:id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <EditProfile loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route
          path="profile/borrowed"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MyBorrowedItems loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route
          path="profile/myItems"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MyItems loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route
          path="profile/myEvents"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MyEvents loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route
          path="profile/myRsvps"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MyRsvps loggedInUser={loggedInUser} />
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
