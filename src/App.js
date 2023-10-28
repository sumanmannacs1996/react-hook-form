import './App.css';
import MuiLoginForm from "./components/MuiLoginForm";
import MyForm from "./components/MyForm";
import { YupYouTubeForm } from "./components/YupForm";
import { ZodForm } from "./components/ZordForm";

function App() {
  return (
    <div className="App">
      <MyForm />
      {/* <YupYouTubeForm />
      <MuiLoginForm />
      <ZodForm /> */}
    </div>
  );
}

export default App;
