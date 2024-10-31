import React, { useContext, useEffect } from 'react';
import { ActivityTrackerProvider, ActivityTrackerContext } from 'activity-tracker';

const TestComponent = () => {
    // Access tracking functions from the context
    const { trackPageView, trackClick, trackAddToCart, activityLog } = useContext(ActivityTrackerContext);
    
    useEffect(() => {
        // Test tracking functions on component mount
        trackPageView({ test: 'page view test' });
        trackClick({ x: 100, y: 200, elementId: 'test-button', elementClass: 'test-class',str:"he clicked" });
        trackAddToCart({ productId: '1234', productName: 'Sample Product', price: 49.99 });
    }, []);

    return (
        <div>
            <h1>Testing Activity Tracker</h1>
            <button onClick={() => trackClick({ x: 50, y: 75, elementId: 'button1' })}>
                Click to Track
            </button>
            <div>
                <h2>Activity Log</h2>
                <ul>
                    {activityLog.map((entry, index) => (
                        <li key={index}>
                            <strong>{entry.eventType}</strong>: {JSON.stringify(entry.details)} at {entry.timestamp}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const App = () => (
    <ActivityTrackerProvider>
        <TestComponent />
    </ActivityTrackerProvider>
);

export default App;
