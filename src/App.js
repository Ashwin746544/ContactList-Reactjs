import Icon from './component/Ui/Icon/Icon';
import './App.css';
import SideBar from './component/Sidebar/Sidebar';
import ContactPage from './component/ContactPage/ContactPage';

function App() {
  return (
    <div className="App">
      <SideBar />
      <main>
        <header>
          <div></div>
        </header>
        <ContactPage />
      </main>
    </div>
  );
}

export default App;
