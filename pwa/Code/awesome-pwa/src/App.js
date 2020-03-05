import React from "react";
import { Route, Router as BrowserRouter, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { createBrowserHistory } from "history";
import {
  AppProvider,
  useApp,
  hideNotification,
  setAppDeferPrompt
} from "./AppContextState";
import { KEY_INSTALLED_APP } from "./constants";
import PromoteDialog from "./components/PromoteDialog";
import LabelsModal from "./components/LabelsModal";
import './services/db'

export const history = createBrowserHistory();

const Login = React.lazy(() => import("./screen/login"));
const Home = React.lazy(() => import("./screen/home"));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ffff55",
      main: "#ffe401",
      dark: "#c7b200",
      contrastText: "#000"
    }
  }
});

const App = () => {
  const [appState, dispatch] = useApp();
  const [showButton, setShowButton] = React.useState(false);
  const {
    alert: { message, open },
    labelsModal: { open: labelsModalOpen },
    appPrompt
  } = appState;

  const handleInstall = () => {
    setShowButton(false);
    if (appPrompt) {
      appPrompt.prompt();
      appPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
          window.localStorage.setItem(KEY_INSTALLED_APP, "accept");
        } else {
          console.log("User dismissed the install prompt");
          window.localStorage.setItem(KEY_INSTALLED_APP, false);
        }
      });
    }
  };

  React.useEffect(() => {
    console.log('run useeffect')
    window.addEventListener("beforeinstallprompt", e => {
      const installed = localStorage.getItem(KEY_INSTALLED_APP);
      console.log(
        "beforeinstallprompt",
        installed,
        navigator.standalone,
        matchMedia("(display-mode: standalone)").matches
      );
      if (
        !installed &&
        (!navigator.standalone ||
          !matchMedia("(display-mode: standalone)").matches)
      ) {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        dispatch(setAppDeferPrompt(e));
        // Update UI notify the user they can install the PWA
        setShowButton(true);
      }
    });

    window.addEventListener("appinstalled", evt => {
      window.localStorage.setItem(KEY_INSTALLED_APP, "installed");
    });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter history={history}>
        <React.Suspense fallback={null}>
          <Switch>
            <Route path={"/login"} exact render={() => <Login />} />
            <Route path={"/"} component={Home} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => {
          dispatch(hideNotification());
        }}
        TransitionComponent={props => <Slide {...props} direction="up" />}
        message={message}
      />
      <LabelsModal open={labelsModalOpen} />
      <PromoteDialog
        open={showButton}
        onAcceptInstall={handleInstall}
        onDeclineInstall={() => setShowButton(false)}
      />
    </ThemeProvider>
  );
};

export default function() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}
