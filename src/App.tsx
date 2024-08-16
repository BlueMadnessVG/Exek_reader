import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import Home from "./components/home/home";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;
