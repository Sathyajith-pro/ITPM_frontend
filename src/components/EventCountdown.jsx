import { useState, useEffect } from "react";

/**
 * EventCountdown component displays a countdown timer to an event date
 * @param {Object} props - Component props
 * @param {string} props.eventDate - Date string in format YYYY-MM-DD or any format parseable by Date()
 */
function EventCountdown({ eventDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Return early if no event date is provided
    if (!eventDate) {
      setIsExpired(true);
      return;
    }
    
    const targetDate = new Date(eventDate);
    
    // Check if the date is valid
    if (isNaN(targetDate.getTime())) {
      setIsExpired(true);
      return;
    }
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;
      
      // If the event date has passed
      if (difference <= 0) {
        setIsExpired(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [eventDate]);
  
  // Display message if event has passed
  if (isExpired) {
    return (
      <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-yellow-700">This event has already taken place</h3>
      </div>
    );
  }
  
  return (
    <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6">
      <h3 className="font-semibold text-orange-700 mb-2">Event starts in:</h3>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white rounded-lg p-2">
          <div className="text-2xl font-bold text-orange-600">{timeLeft.days}</div>
          <div className="text-xs text-gray-500">Days</div>
        </div>
        <div className="bg-white rounded-lg p-2">
          <div className="text-2xl font-bold text-orange-600">{timeLeft.hours}</div>
          <div className="text-xs text-gray-500">Hours</div>
        </div>
        <div className="bg-white rounded-lg p-2">
          <div className="text-2xl font-bold text-orange-600">{timeLeft.minutes}</div>
          <div className="text-xs text-gray-500">Minutes</div>
        </div>
        <div className="bg-white rounded-lg p-2">
          <div className="text-2xl font-bold text-orange-600">{timeLeft.seconds}</div>
          <div className="text-xs text-gray-500">Seconds</div>
        </div>
      </div>
    </div>
  );
}

export default EventCountdown;