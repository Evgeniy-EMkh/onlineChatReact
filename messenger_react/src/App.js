import logo from './logo.svg';
import './App.css';
import { Message } from './components/Message/Message';

const lastName = 'Makhnach';

function App() {

  const foo = () => {
    alert('Hello');
  };

  return (
    <div className="App">
      <Message name="Evgeniy" age={26} lastName={lastName} doFoo={foo} />
    </div>
  );
}

export default App;
