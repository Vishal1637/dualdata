import { useState, useEffect } from 'react';

const intervals = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 1 }
];

function formatTimeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 5) return 'just now';

  const interval = intervals.find(i => i.seconds <= seconds);
  if (!interval) return 'just now';
  
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}

export const useTimeAgo = (refreshInterval = 10000) => {
    const [startTime] = useState(new Date());
    const [timeAgo, setTimeAgo] = useState('just now');
    
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeAgo(formatTimeAgo(startTime));
        }, refreshInterval);

        return () => clearInterval(interval);
    }, [startTime, refreshInterval]);

    return timeAgo;
}
