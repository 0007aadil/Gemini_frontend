
import ChatBox from './components/ChatBox';
import SnakeTrail from './components/SnakeTrail'; 

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl text-center font-bold mt-8">🧠 Gemini Chat</h1>
      <SnakeTrail />
      <ChatBox />
    </div>
  );
};

export default App;
