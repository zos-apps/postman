import { useState } from 'react';

interface Response {
  status: number;
  statusText: string;
  time: number;
  size: string;
  body: string;
}

const Postman: React.FC = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.example.com/users');
  const [body, setBody] = useState('{\n  "name": "John",\n  "email": "john@example.com"\n}');
  const [response, setResponse] = useState<Response | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'params' | 'body' | 'headers'>('body');

  const sendRequest = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponse({
        status: 200,
        statusText: 'OK',
        time: 234,
        size: '1.2 KB',
        body: JSON.stringify({ id: 1, name: 'John', email: 'john@example.com' }, null, 2)
      });
      setLoading(false);
    }, 500);
  };

  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Request Bar */}
      <div className="p-4 bg-white border-b">
        <div className="flex gap-2">
          <select 
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className={`px-3 py-2 border rounded font-semibold ${
              method === 'GET' ? 'text-green-600' :
              method === 'POST' ? 'text-yellow-600' :
              method === 'PUT' ? 'text-blue-600' :
              method === 'DELETE' ? 'text-red-600' : ''
            }`}
          >
            {methods.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter request URL"
            className="flex-1 px-3 py-2 border rounded font-mono text-sm"
          />
          <button
            onClick={sendRequest}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Request Panel */}
        <div className="flex-1 flex flex-col border-r">
          <div className="flex border-b bg-white">
            {(['params', 'body', 'headers'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm capitalize ${
                  activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex-1 p-4 bg-white overflow-auto">
            {activeTab === 'body' && (
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full h-full font-mono text-sm resize-none outline-none"
                placeholder="Request body (JSON)"
              />
            )}
          </div>
        </div>

        {/* Response Panel */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-4 p-2 bg-white border-b">
            <span className="text-sm font-semibold">Response</span>
            {response && (
              <>
                <span className={`text-sm ${response.status < 400 ? 'text-green-600' : 'text-red-600'}`}>
                  {response.status} {response.statusText}
                </span>
                <span className="text-sm text-gray-500">{response.time}ms</span>
                <span className="text-sm text-gray-500">{response.size}</span>
              </>
            )}
          </div>
          <div className="flex-1 p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-auto">
            {response ? (
              <pre>{response.body}</pre>
            ) : (
              <div className="text-gray-500">Send a request to see response</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postman;
