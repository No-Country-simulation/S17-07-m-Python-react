import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../../modules/start/submodules/auth/pages/LoginPage';
import DashboardLayout from '../layouts/DashboardLayout';
import { PublicRoute } from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { HomePage } from '../../modules/dashboard/pages/HomePage';
import RegisterPage from '../../modules/start/submodules/auth/pages/RegisterPage';
import { PlaylistRecentPage } from '../../modules/dashboard/submodules/playlists/pages/PlaylistRecentPage';
import { FavoritesPage } from '../../modules/dashboard/submodules/library/pages/FavoritesPage';
import { ExplorePage } from '../../modules/dashboard/submodules/recommendation/pages/ExplorePage';
import { AlbumPage } from '../../modules/dashboard/submodules/playlists/pages/AlbumPage';
import { PlaylistPage } from '../../modules/dashboard/submodules/playlists/pages/PlaylistPage';
import { Navigate } from 'react-router-dom';
import { MyPlaylistPage } from '../../modules/dashboard/submodules/playlists/pages/MyPlaylistPage';
import { MyPlaylistsPage } from '../../modules/dashboard/submodules/library/pages/MisPlaylistsPage';

function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<HomePage />} />

          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} />

          <Route path="/recientes" element={<PlaylistRecentPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/descubrir" element={<ExplorePage />} />
          <Route path="/mis-playlists">
            <Route path="" element={<MyPlaylistsPage />} />
            <Route path=":id" element={<MyPlaylistPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoute;
