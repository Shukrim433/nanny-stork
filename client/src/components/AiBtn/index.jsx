import { Link } from 'react-router-dom';

const AiBtn = () => {
  return (
    <div className="fixed bottom-4 right-4">
      <Link to="/nanny-bot">
        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center w-12 h-12">
          AI
        </div>
      </Link>
    </div>
  );
};

export default AiBtn;