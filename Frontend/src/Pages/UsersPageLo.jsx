import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiEdit, FiLogOut, FiCalendar, FiMessageSquare, FiUser, FiSettings, FiMapPin, FiClock, FiHeart, FiSearch } from 'react-icons/fi';
import { FaUsers, FaHandsHelping, FaTasks, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/bg.jpg';
import { removeAuthToken, getAuthToken } from '../config/api';

const UsersPageLo = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 987-6543',
    interests: ['Environment', 'Education', 'Community Health'],
    location: 'San Francisco, CA'
  });
  
  const [formData, setFormData] = useState({ ...userProfile });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Event Reminder', text: 'Community cleanup event starts in 2 hours!', unread: true, time: '2 hours ago' },
    { id: 2, title: 'New Opportunity', text: 'Help needed for local food bank this weekend.', unread: true, time: '1 day ago' },
    { id: 3, title: 'Thank You!', text: 'Your feedback on last week\'s event was very helpful.', unread: false, time: '3 days ago' },
  ]);

  const [availableEvents] = useState([
    { id: 1, title: 'Community Garden Project', date: '2024-01-16', time: '10:00 AM', location: 'Sunset Community Garden', volunteers: 5, needed: 8, category: 'Environment', rating: 4.8 },
    { id: 2, title: 'Senior Center Visit', date: '2024-01-18', time: '2:00 PM', location: 'Golden Years Center', volunteers: 3, needed: 6, category: 'Community', rating: 4.9 },
    { id: 3, title: 'Children\'s Tutoring', date: '2024-01-20', time: '4:00 PM', location: 'City Library', volunteers: 8, needed: 10, category: 'Education', rating: 4.7 },
    { id: 4, title: 'Food Drive Collection', date: '2024-01-22', time: '9:00 AM', location: 'Community Center', volunteers: 12, needed: 15, category: 'Community', rating: 4.6 },
  ]);

  const [myEvents] = useState([
    { id: 1, title: 'Beach Cleanup', date: '2024-01-12', time: '8:00 AM', location: 'Ocean Beach', status: 'completed', feedback: 'Great experience!' },
    { id: 2, title: 'Food Drive', date: '2024-01-20', time: '10:00 AM', location: 'Community Center', status: 'upcoming' },
  ]);

  const [stats] = useState({
    eventsJoined: 12,
    hoursContributed: 48,
    peopleHelped: 156,
    badgesEarned: 8
  });

  const currentDate = new Date();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!getAuthToken()) {
      navigate('/user-login');
    }
  }, [navigate]);

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

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setModalOpen(false);
  };

  const joinEvent = (eventId) => {
    console.log(`Joining event ${eventId}`);
    // API call would go here
    closeModal();
  };

  const filteredEvents = availableEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiUser },
    { id: 'events', label: 'Find Events', icon: FiSearch },
    { id: 'my-events', label: 'My Events', icon: FaTasks },
    { id: 'messages', label: 'Messages', icon: FiMessageSquare },
    { id: 'profile', label: 'Profile', icon: FiSettings },
  ];

  const renderDashboard = () => (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Events Joined</p>
              <p className="text-3xl font-bold">{stats.eventsJoined}</p>
            </div>
            <FaTasks className="text-4xl text-green-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Hours Contributed</p>
              <p className="text-3xl font-bold">{stats.hoursContributed}</p>
            </div>
            <FiClock className="text-4xl text-blue-200" />
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
              <p className="text-purple-100">People Helped</p>
              <p className="text-3xl font-bold">{stats.peopleHelped}</p>
            </div>
            <FiHeart className="text-4xl text-purple-200" />
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
              <p className="text-orange-100">Badges Earned</p>
              <p className="text-3xl font-bold">{stats.badgesEarned}</p>
            </div>
            <FaStar className="text-4xl text-orange-200" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Recommended Events</h3>
          <div className="space-y-4">
            {availableEvents.slice(0, 3).map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-200"
                onClick={() => openEventModal(event)}
              >
                <h4 className="text-lg font-semibold text-white mb-2">{event.title}</h4>
                <div className="flex items-center justify-between text-white/70">
                  <span className="text-sm">{event.date} at {event.time}</span>
                  <span className="bg-cyan-500/30 text-cyan-300 px-2 py-1 rounded text-xs">{event.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Recent Notifications</h3>
          <div className="space-y-4">
            {notifications.slice(0, 3).map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 border cursor-pointer transition-all duration-200 hover:bg-white/20 ${
                  notification.unread ? 'border-blue-400' : 'border-white/20'
                }`}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <div className="flex items-center space-x-2">
                  <h4 className="text-white font-medium">{notification.title}</h4>
                  {notification.unread && <div className="w-2 h-2 bg-blue-400 rounded-full"></div>}
                </div>
                <p className="text-white/70 text-sm mt-1">{notification.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Find Volunteer Opportunities</h2>
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" />
          <input
            type="text"
            placeholder="Search events by title, category, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-200"
            onClick={() => openEventModal(event)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-white">{event.title}</h3>
              <span className="bg-cyan-500/30 text-cyan-300 px-3 py-1 rounded-full text-sm">{event.category}</span>
            </div>
            
            <div className="space-y-2 text-white/70 mb-4">
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                {event.date} at {event.time}
              </div>
              <div className="flex items-center">
                <FiMapPin className="mr-2" />
                {event.location}
              </div>
              <div className="flex items-center">
                <FaUsers className="mr-2" />
                {event.volunteers}/{event.needed} volunteers
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="text-white/70">{event.rating}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mx-4">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full" 
                  style={{ width: `${(event.volunteers / event.needed) * 100}%` }}
                ></div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
              >
                Join
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderMyEvents = () => (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">My Events</h2>
      <div className="space-y-4">
        {myEvents.map((event) => (
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/70 mb-4">
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

            {event.feedback && (
              <div className="mt-4 p-3 bg-white/5 rounded-lg">
                <p className="text-white/80 text-sm">Your feedback: "{event.feedback}"</p>
              </div>
            )}

            {event.status === 'upcoming' && (
              <div className="mt-4 flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 border border-white/30 text-white px-4 py-2 rounded-lg font-medium"
                >
                  View Details
                </motion.button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Messages & Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border cursor-pointer transition-all duration-200 hover:bg-white/20 ${
              notification.unread ? 'border-blue-400' : 'border-white/20'
            }`}
            onClick={() => markNotificationAsRead(notification.id)}
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
            <label className="block text-white/80 text-sm font-medium mb-2">Interests</label>
            <input
              type="text"
              value={formData.interests.join(', ')}
              onChange={(e) => setFormData({ ...formData, interests: e.target.value.split(', ') })}
              className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Separate interests with commas"
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
            <p className="text-white/70 text-sm">Interests</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {userProfile.interests.map((interest, index) => (
                <span key={index} className="bg-cyan-500/30 text-cyan-300 px-3 py-1 rounded-full text-sm">
                  {interest}
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
        return renderDashboard();
      case 'events':
        return renderEvents();
      case 'my-events':
        return renderMyEvents();
      case 'messages':
        return renderMessages();
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

      {/* Event Details Modal */}
      <AnimatePresence>
        {modalOpen && selectedEvent && (
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
              <h3 className="text-2xl font-bold text-white mb-4">{selectedEvent.title}</h3>
              
              <div className="space-y-3 text-white/80 mb-6">
                <div className="flex items-center">
                  <FiCalendar className="mr-3" />
                  {selectedEvent.date} at {selectedEvent.time}
                </div>
                <div className="flex items-center">
                  <FiMapPin className="mr-3" />
                  {selectedEvent.location}
                </div>
                <div className="flex items-center">
                  <FaUsers className="mr-3" />
                  {selectedEvent.volunteers}/{selectedEvent.needed} volunteers signed up
                </div>
                <div className="flex items-center">
                  <FaStar className="mr-3 text-yellow-400" />
                  Rating: {selectedEvent.rating}/5
                </div>
              </div>

              <div className="flex space-x-3">
                <motion.button
                  onClick={() => joinEvent(selectedEvent.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-medium"
                >
                  Join Event
                </motion.button>
                <motion.button
                  onClick={closeModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-white/10 border border-white/30 text-white py-3 rounded-lg font-medium"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UsersPageLo;
