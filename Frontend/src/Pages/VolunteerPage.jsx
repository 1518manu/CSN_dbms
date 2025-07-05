import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiEdit, FiLogOut, FiCalendar, FiMessageSquare, FiUser, FiSettings, FiBell, FiMapPin, FiClock, FiAward } from 'react-icons/fi';
import { FaHeart, FaUsers, FaHandsHelping, FaTasks } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/bg.jpg';
import { removeAuthToken, getAuthToken } from '../config/api';

const VolunteerPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    skills: ['Teaching', 'Mentoring', 'Event Planning'],
    availability: 'Weekends',
    location: 'New York, NY'
  });
  
  const [formData, setFormData] = useState({ ...userProfile });
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Event Available', text: 'Community cleanup event this Saturday!', unread: true, time: '2 hours ago' },
    { id: 2, title: 'Meeting Reminder', text: 'Volunteer orientation meeting tomorrow at 3 PM.', unread: true, time: '5 hours ago' },
    { id: 3, title: 'Thank You!', text: 'Thanks for your participation in last week\'s food drive.', unread: false, time: '2 days ago' },
  ]);

  const [events] = useState([
    { id: 1, title: 'Community Garden Cleanup', date: '2024-01-15', time: '9:00 AM', location: 'Central Park', volunteers: 12, status: 'upcoming' },
    { id: 2, title: 'Food Drive', date: '2024-01-20', time: '10:00 AM', location: 'Community Center', volunteers: 8, status: 'upcoming' },
    { id: 3, title: 'Elderly Care Visit', date: '2024-01-10', time: '2:00 PM', location: 'Sunset Nursing Home', volunteers: 6, status: 'completed' },
  ]);

  const [stats] = useState({
    hoursVolunteered: 156,
    eventsAttended: 23,
    impactPoints: 890,
    rank: 'Gold Volunteer'
  });

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!getAuthToken()) {
      navigate('/volunteer-login');
    }
  }, [navigate]);

  const getCalendarDays = () => {
    const startOfMonth = new Date(currentYear, currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentYear, currentDate.getMonth() + 1, 0);
    const startDayOfWeek = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const daysArray = Array(startDayOfWeek).fill(null);
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentDate.getMonth(), day);
      const hasEvent = events.some(event => new Date(event.date).toDateString() === date.toDateString());
      daysArray.push({ 
        date, 
        available: Math.random() > 0.7, // Random availability for demo
        hasEvent
      });
    }
    return daysArray;
  };

  const [calendar, setCalendar] = useState(getCalendarDays());

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleEditProfile = () => setEditProfileOpen(!editProfileOpen);

  const handleLogout = () => {
    removeAuthToken();
    navigate('/');
  };

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
    setUserProfile({ ...formData });
    setEditProfileOpen(false);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const openModal = (message) => {
    setSelectedMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setModalOpen(false);
  };

  const toggleAvailability = (index) => {
    const day = calendar[index];
    if (day && day.date >= currentDate) {
      setCalendar(prev =>
        prev.map((d, i) =>
          i === index ? { ...d, available: !d.available } : d
        )
      );
    }
  };

  const tabItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiUser },
    { id: 'calendar', label: 'Calendar', icon: FiCalendar },
    { id: 'events', label: 'Events', icon: FaTasks },
    { id: 'messages', label: 'Messages', icon: FiMessageSquare },
    { id: 'profile', label: 'Profile', icon: FiSettings },
  ];

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100">Hours Volunteered</p>
            <p className="text-3xl font-bold">{stats.hoursVolunteered}</p>
          </div>
          <FiClock className="text-4xl text-blue-200" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100">Events Attended</p>
            <p className="text-3xl font-bold">{stats.eventsAttended}</p>
          </div>
          <FaHandsHelping className="text-4xl text-green-200" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100">Impact Points</p>
            <p className="text-3xl font-bold">{stats.impactPoints}</p>
          </div>
          <FaHeart className="text-4xl text-purple-200" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100">Rank</p>
            <p className="text-lg font-bold">{stats.rank}</p>
          </div>
          <FaAward className="text-4xl text-orange-200" />
        </div>
      </motion.div>
    </div>
  );

  const renderCalendar = () => (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">{`${currentMonth} ${currentYear}`}</h2>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-bold text-center text-white/70 py-2">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {calendar.map((day, index) => {
          const isPastDate = day && day.date < currentDate;
          return day ? (
            <motion.div
              key={day.date}
              whileHover={{ scale: isPastDate ? 1 : 1.05 }}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 text-center relative
                ${day.available ? 'bg-green-500/30 border border-green-400' : 'bg-white/10 border border-white/30'} 
                ${isPastDate ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'}
                ${day.hasEvent ? 'ring-2 ring-yellow-400' : ''}`}
              onClick={() => !isPastDate && toggleAvailability(index)}
            >
              <div className="text-white font-medium">{day.date.getDate()}</div>
              {day.hasEvent && <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>}
            </motion.div>
          ) : (
            <div key={index} className="p-3"></div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-white/70">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            Available
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-400 rounded mr-2"></div>
            Has Event
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium"
          onClick={() => console.log('Updating availability...')}
        >
          Update Availability
        </motion.button>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-4">
      {events.map((event) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">{event.title}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              event.status === 'upcoming' ? 'bg-blue-500/30 text-blue-300' : 'bg-green-500/30 text-green-300'
            }`}>
              {event.status}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/70">
            <div className="flex items-center">
              <FiCalendar className="mr-2" />
              {event.date}
            </div>
            <div className="flex items-center">
              <FiClock className="mr-2" />
              {event.time}
            </div>
            <div className="flex items-center">
              <FiMapPin className="mr-2" />
              {event.location}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-white/70">
              <FaUsers className="mr-2" />
              {event.volunteers} volunteers
            </div>
            {event.status === 'upcoming' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                Join Event
              </motion.button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border cursor-pointer transition-all duration-200 hover:bg-white/20 ${
            notification.unread ? 'border-blue-400' : 'border-white/20'
          }`}
          onClick={() => {
            markNotificationAsRead(notification.id);
            openModal(notification.text);
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-white">{notification.title}</h3>
                {notification.unread && <div className="w-2 h-2 bg-blue-400 rounded-full"></div>}
              </div>
              <p className="text-white/70 mt-2">{notification.text}</p>
              <p className="text-white/50 text-sm mt-2">{notification.time}</p>
            </div>
            <FiMessageSquare className="text-white/50" />
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderProfile = () => (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleEditProfile}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
        >
          <FiEdit className="mr-2" />
          Edit Profile
        </motion.button>
      </div>

      {editProfileOpen ? (
        <form onSubmit={handleEditProfileSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Skills</label>
            <input
              type="text"
              value={formData.skills.join(', ')}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(', ') })}
              className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Separate skills with commas"
              required
            />
          </div>
          <div className="flex space-x-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-medium"
            >
              Save Changes
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleEditProfile}
              className="bg-white/10 border border-white/30 text-white px-6 py-2 rounded-lg font-medium"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-white/70 text-sm">Name</p>
              <p className="text-white font-medium">{userProfile.name}</p>
            </div>
            <div>
              <p className="text-white/70 text-sm">Email</p>
              <p className="text-white font-medium">{userProfile.email}</p>
            </div>
            <div>
              <p className="text-white/70 text-sm">Phone</p>
              <p className="text-white font-medium">{userProfile.phone}</p>
            </div>
            <div>
              <p className="text-white/70 text-sm">Location</p>
              <p className="text-white font-medium">{userProfile.location}</p>
            </div>
          </div>
          <div>
            <p className="text-white/70 text-sm">Skills</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {userProfile.skills.map((skill, index) => (
                <span key={index} className="bg-cyan-500/30 text-cyan-300 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            {renderDashboard()}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Recent Notifications</h3>
                {renderMessages()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Upcoming Events</h3>
                {renderEvents()}
              </div>
            </div>
          </div>
        );
      case 'calendar':
        return renderCalendar();
      case 'events':
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">All Events</h2>
            {renderEvents()}
          </div>
        );
      case 'messages':
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Messages & Notifications</h2>
            {renderMessages()}
          </div>
        );
      case 'profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Background Elements */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10" 
        style={{ backgroundImage: `url(${backgroundImage})` }} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Modern Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-white/10 backdrop-blur-lg border-b border-white/20"
      >
        <div className="text-white text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          CommunityHub
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center text-white/80">
            <FiUser className="mr-2" />
            Welcome, {userProfile.name}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center text-white/80 hover:text-white transition-colors"
          >
            <FiLogOut className="mr-2" />
            Logout
          </motion.button>
        </div>

        <div className="md:hidden">
          <motion.button 
            onClick={toggleMenu} 
            className="text-white p-2"
            whileTap={{ scale: 0.95 }}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="md:hidden fixed top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-lg z-40 p-6 pt-20"
          >
            <div className="space-y-6">
              {tabItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMenuOpen(false);
                  }}
                  className={`flex items-center w-full text-left text-lg transition-colors ${
                    activeTab === item.id ? 'text-cyan-400' : 'text-white hover:text-cyan-400'
                  }`}
                  whileHover={{ x: 10 }}
                >
                  <item.icon className="mr-3" />
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                onClick={handleLogout}
                className="flex items-center w-full text-left text-lg text-red-400 hover:text-red-300"
                whileHover={{ x: 10 }}
              >
                <FiLogOut className="mr-3" />
                Logout
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex pt-20 min-h-screen relative z-10">
        {/* Sidebar */}
        <div className="hidden md:block w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 p-6">
          <div className="space-y-2">
            {tabItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-white border border-cyan-400/50' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ x: 5 }}
              >
                <item.icon className="mr-3" />
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Message Details</h3>
              <p className="text-white/80 mb-6">{selectedMessage}</p>
              <motion.button
                onClick={closeModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VolunteerPage;
