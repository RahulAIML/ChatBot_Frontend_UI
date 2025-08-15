import 'src/global.css';

// ----------------------------------------------------------------------

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import axiosInstance, { endpoints } from 'src/utils/axios';

import { CONFIG } from 'src/config-global';
import { LocalizationProvider } from 'src/locales';
// import { I18nProvider } from 'src/locales/i18n-provider';
import { ThemeProvider } from 'src/theme/theme-provider';

import { Snackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { Provider } from 'react-redux';
import { store } from './redux/store/index';

// import { AuthProvider as JwtAuthProvider } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

// const AuthProvider = JwtAuthProvider;

export default function App() {
  useScrollToTop();

  const handleTestClick = async () => {
    try {
      console.log('Testing /hello/ endpoint...');
      const response = await axiosInstance.get(endpoints.hello);
      console.log('Test successful:', response.data);
      alert('Connection to /hello/ was successful!');
    } catch (error) {
      console.error('Test failed:', error);
      alert('Connection to /hello/ failed. Check console for details.');
    }
  };

  return (
    // <I18nProvider>
    <Provider store={store}>
      <LocalizationProvider>
        {/* <AuthProvider> */}
        <SettingsProvider settings={defaultSettings}>
          <ThemeProvider>
            <MotionLazy>
              <Snackbar />
              <ProgressBar />
              <SettingsDrawer />
                    <button 
        onClick={handleTestClick} 
        style={{ position: 'fixed', top: 10, right: 10, zIndex: 9999, padding: '10px', backgroundColor: 'red', color: 'white' }}
      >
        Test API Connection
      </button>
      <Router />
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
        {/* </AuthProvider> */}
      </LocalizationProvider>
    </Provider>
    // </I18nProvider>
  );
}
