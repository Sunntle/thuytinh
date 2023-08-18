import HeaderComponent from "./components/header";
import MenuPage from "./pages/menu/menu";

const App = () => {
  return (
    <div>
      <header>
        <HeaderComponent />
        <MenuPage />
      </header>
    </div>
  );
};

export default App;
