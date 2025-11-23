import { useEffect, useState } from 'react';

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [params, setParams] = useState(null);

    useEffect(() => {
        const handleMessage = (event) => {
            // In production, check event.origin
            console.log('Received message:', event.data);
            setMessages((prev) => [...prev, event.data]);

            if (event.data.params) {
                setParams(event.data.params);
            }
        };

        window.addEventListener('message', handleMessage);

        // Notify parent that we are loaded
        if (window.parent) {
            window.parent.postMessage({ action: 'load', value: 120 }, '*');
        }

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Hello World from Stitch App!</h1>
            <p>This is an independent Next.js app running inside Backstage.</p>

            <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>Received Params:</h2>
                <pre>{JSON.stringify(params, null, 2)}</pre>
            </div>

            <div style={{ marginTop: '20px' }}>
                <h3>Message Log:</h3>
                <ul>
                    {messages.map((msg, i) => (
                        <li key={i}><pre>{JSON.stringify(msg)}</pre></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
