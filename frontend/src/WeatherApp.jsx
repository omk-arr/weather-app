import { useState, useEffect } from 'react';
import { Sun, CloudRain, CloudSnow, Wind, Droplets, Thermometer, Navigation, CloudLightning, Cloudy, CloudDrizzle, CloudFog, Github, Linkedin, Instagram, ExternalLink, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// import {API_KEY} from '../.env'

export default function WeatherApp() {
  const [location, setLocation] = useState('London,UK');
  const [searchInput, setSearchInput] = useState('London,UK');
  const [unit, setUnit] = useState('°F');
  const [isExpanded, setIsExpanded] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (loc) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/weather?loc=${loc}&unit=${unit}`);
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(location);
  }, [location, unit]);

  const handleSearch = (e) => {
    e.preventDefault();
    setLocation(searchInput);
  };

  // Helper function to get weather icon based on condition
  const getWeatherIcon = (condition, size = 24) => {
    condition = condition?.toLowerCase() || '';
    
    if (condition.includes('sunny') || condition.includes('clear')) {
      return <Sun size={size} />;
    } else if (condition.includes('rain') || condition.includes('shower')) {
      return <CloudRain size={size} />;
    } else if (condition.includes('snow') || condition.includes('flurr')) {
      return <CloudSnow size={size} />;
    } else if (condition.includes('thunder') || condition.includes('lightning')) {
      return <CloudLightning size={size} />;
    } else if (condition.includes('fog') || condition.includes('mist') || condition.includes('haz')) {
      return <CloudFog size={size} />;
    } else if (condition.includes('drizzle')) {
      return <CloudDrizzle size={size} />;
    } else if (condition.includes('cloud') || condition.includes('overcast') || condition.includes('part')) {
      return <Cloudy size={size} />;
    }
    
    return <Sun size={size} />;
  };

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Format day of week
  const getDayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  // Format time (12hr) from hour string (like "00:00:00")
  const formatTime = (hourString) => {
    if (!hourString) return '';
    
    // Convert hour string (e.g., "14:00:00") to a display time
    const hourParts = hourString.split(':');
    const hour = parseInt(hourParts[0], 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    
    return `${hour12}${ampm}`;
  };

  // Social media links
  const socialLinks = [
    { 
      name: 'GitHub',
      url: 'https://github.com/yourusername', 
      icon: <Github size={18} />
    },
    { 
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername', 
      icon: <Linkedin size={18} />
    },
    { 
      name: 'Instagram',
      url: 'https://instagram.com/yourusername', 
      icon: <Instagram size={18} />
    },
    { 
      name: 'Portfolio',
      url: 'https://yourportfolio.com', 
      icon: <ExternalLink size={18} />
    },
    { 
      name: 'About Me',
      url: '/about', 
      icon: <User size={18} />
    }
  ];

  return (
    <div className="flex flex-col h-screen  text-white  p-4 md:p-8 mb-8">
      {/* Header */}
      <motion.header 
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Navigation size={24} />
          <h1 className="text-2xl font-bold">What-da-Weatha</h1>
        </motion.div>
        <div className="flex items-center space-x-4">
          <motion.button 
            className={`px-2 py-1 rounded-md ${unit === '°F' ? 'bg-white text-blue-600' : 'bg-blue-500'}`}
            onClick={() => setUnit('°F')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            °F
          </motion.button>
          <motion.button 
            className={`px-2 py-1 rounded-md ${unit === '°C' ? 'bg-white text-blue-600' : 'bg-blue-500'}`}
            onClick={() => setUnit('°C')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            °C
          </motion.button>
        </div>
      </motion.header>

      {/* Search Bar */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <form onSubmit={handleSearch} className="relative">
          <motion.input 
            type="text" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search location..." 
            className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.button 
            type="submit"
            className="absolute right-3 top-3"
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.button>
        </form>
      </motion.div>

      {isLoading && (
        <motion.div 
          className="flex justify-center items-center p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </motion.div>
      )}

      {error && (
        <motion.div 
          className="bg-red-500/70 p-4 rounded-lg text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}

      {weatherData && !isLoading && (
        <>
          {/* Current Weather */}
          <motion.div 
            className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{weatherData.resolvedAddress}</h2>
                <p className="text-sm opacity-80">{formatDate(weatherData.days[0].datetime)}</p>
                <motion.div 
                  className="mt-6"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                >
                  <span className="text-6xl font-bold">
                    {Math.round(weatherData.currentConditions?.temp || weatherData.days[0].temp)}{unit}
                  </span>
                  <p className="mt-2">{weatherData.currentConditions?.conditions || weatherData.days[0].conditions}</p>
                </motion.div>
              </div>
              <motion.div 
                className="flex flex-col items-center"
                animate={weatherData.currentConditions?.conditions?.toLowerCase().includes('sunny') ? 
                  { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {getWeatherIcon(weatherData.currentConditions?.conditions || weatherData.days[0].conditions, 72)}
              </motion.div>
            </div>
            
            {/* Weather Details */}
            <motion.div 
              className="grid grid-cols-3 gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.div 
                className="flex flex-col items-center p-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <Wind size={20} />
                <p className="mt-1 text-sm">Wind</p>
                <p className="font-medium">
                  {Math.round(weatherData.currentConditions?.windspeed || weatherData.days[0].windspeed)} 
                  {unit === '°F' ? ' mph' : ' km/h'}
                </p>
              </motion.div>
              <motion.div 
                className="flex flex-col items-center p-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <Droplets size={20} />
                <p className="mt-1 text-sm">Humidity</p>
                <p className="font-medium">
                  {Math.round(weatherData.currentConditions?.humidity || weatherData.days[0].humidity)}%
                </p>
              </motion.div>
              <motion.div 
                className="flex flex-col items-center p-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <Thermometer size={20} />
                <p className="mt-1 text-sm">Feels like</p>
                <p className="font-medium">
                  {Math.round(weatherData.currentConditions?.feelslike || weatherData.days[0].feelslike)}{unit}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hourly Forecast */}
          <motion.div 
            className="bg-white/20 backdrop-blur-sm rounded-3xl p-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <h3 className="font-medium mb-4">Hourly Forecast</h3>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {weatherData.days[0].hours && weatherData.days[0].hours
                .filter((_, index) => index % 3 === 0) // Show every 3 hours
                .slice(0, 7) // Limit to 7 entries
                .map((hour, index) => {
                  // Construct time based on datetime property in hours array
                  // Format: "datetime": "00:00:00"
                  const hourTime = formatTime(hour.datetime);
                  
                  return (
                    <motion.div 
                      key={index}
                      className="flex flex-col items-center flex-shrink-0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + (index * 0.1), duration: 0.5 }}
                      whileHover={{ y: -5, scale: 1.1 }}
                    >
                      <p className="text-sm">{hourTime}</p>
                      <motion.div 
                        className="my-2"
                        animate={index === 0 ? { y: [0, -5, 0], scale: [1, 1.1, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
                      >
                        {getWeatherIcon(hour.conditions)}
                      </motion.div>
                      <p className="font-medium">{Math.round(hour.temp)}{unit}</p>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>

          {/* 5-Day Forecast */}
          <motion.div 
            className="bg-white/20 backdrop-blur-sm rounded-3xl p-4 flex-grow mb-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <motion.h3 
              className="font-medium mb-4"
              layoutId="forecast-title"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>5-Day Forecast</span>
                <motion.span animate={{ rotate: isExpanded ? 180 : 0 }}>
                  ↓
                </motion.span>
              </div>
            </motion.h3>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  className="space-y-4"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {weatherData.days.slice(1, 6).map((day, index) => (
                    <motion.div 
                      key={index}
                      className="flex justify-between items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <p className="font-medium w-16">{getDayOfWeek(day.datetime)}</p>
                      <motion.div 
                        className="flex-grow flex justify-center"
                        whileHover={{ rotate: 15, scale: 1.2 }}
                      >
                        {getWeatherIcon(day.conditions)}
                      </motion.div>
                      <div className="w-24 flex justify-between">
                        <span>{Math.round(day.tempmax)}{unit}</span>
                        <span className="opacity-70">{Math.round(day.tempmin)}{unit}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            
            {!isExpanded && (
              <motion.div 
                className="space-y-4"
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {weatherData.days.slice(1, 6).map((day, index) => (
                  <motion.div 
                    key={index}
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + (index * 0.1), duration: 0.3 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <p className="font-medium w-16">{getDayOfWeek(day.datetime)}</p>
                    <motion.div 
                      className="flex-grow flex justify-center"
                      whileHover={{ rotate: 15, scale: 1.2 }}
                    >
                      {getWeatherIcon(day.conditions)}
                    </motion.div>
                    <div className="w-24 flex justify-between">
                      <span>{Math.round(day.tempmax)}{unit}</span>
                      <span className="opacity-70">{Math.round(day.tempmin)}{unit}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
          <motion.div
            className="bg-white/20 backdrop-blur-sm rounded-3xl p-4 flex-grow mb-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© {new Date().getFullYear()} Weather App</p>
            <p className="text-xs text-blue-200 mt-1">Powered by Visual Crossing</p>
            <p className="text-xs text-blue-200 mt-1">Built with ReactJS, Tailwind and Motion</p>
          </div>
          
          <motion.div 
            className="flex space-x-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.3,
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-200 transition-colors duration-300 text-sm"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-1">{link.icon}</span>
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
          </motion.div>
          {/* <div className='h-4 mb-6'></div> */}
        </>
      )}

      {/* Bottom Navigation */}
      {/* <motion.div 
        className="py-4 px-2 mt-6 bg-white/20 backdrop-blur-sm rounded-full fixed bottom-4 left-4 right-4 flex justify-around"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      >
        <motion.button 
          className="p-2 rounded-full bg-white text-blue-600"
          whileHover={{ scale: 1.2, y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
          </svg>
        </motion.button>
        <motion.button 
          className="p-2"
          whileHover={{ scale: 1.2, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => fetchWeatherData(location)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </motion.button>
        <motion.button 
          className="p-2"
          whileHover={{ scale: 1.2, y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </motion.button>
      </motion.div> */}
    </div>
  );
}