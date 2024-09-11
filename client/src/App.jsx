import AppRoute from './core/routes/AppRoute';
import { AuthProvider } from './modules/start/submodules/auth/services/store/auth';

function App() {
  return (
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  );
}

export default App;
