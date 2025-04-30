import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Ticket, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Animated Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white overflow-hidden relative">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-600 opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-500 opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-yellow-400 opacity-10"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Experience Unforgettable Events
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Book tickets for concerts, sports, theater, and more with just a few clicks.
            </motion.p>
            
            <motion.div 
              className="flex justify-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/items" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors flex items-center">
                  Get Started <ArrowRight className="ml-2" size={20} />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/how-it-works" className="border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Animated wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
            <motion.path
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              d="M0,0 C150,40 350,0 500,30 C650,60 800,20 1000,40 C1150,55 1350,40 1440,30 L1440,100 L0,100 Z"
              fill="#F8FAFC"
            />
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Tickets Hub
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10 }}
          >
            <motion.div 
              className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <Ticket className="text-blue-800" size={28} />
            </motion.div>
            <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Secure Booking</h3>
            <p className="text-gray-600 text-center">Book your tickets with confidence using our secure payment system and verification process.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10 }}
          >
            <motion.div 
              className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <Calendar className="text-blue-800" size={28} />
            </motion.div>
            <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Wide Selection</h3>
            <p className="text-gray-600 text-center">Access thousands of events across multiple categories, from concerts to sports and theater shows.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -10 }}
          >
            <motion.div 
              className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <Star className="text-blue-800" size={28} />
            </motion.div>
            <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Exclusive Deals</h3>
            <p className="text-gray-600 text-center">Get access to special offers, pre-sales, and member-only discounts on premium events.</p>
          </motion.div>
        </div>
      </div>

      {/* Event Categories */}
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Discover Events
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Exhibitions", image: "/test.png" },
              { title: "Concerts", image: "/concert-image.png" },
              { title: "Movies", image: "/movie.png" },
              { title: "Stage Drama", image: "/drama.png" }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="h-40 bg-purple-500 flex items-center justify-center group-hover:bg-purple-600 transition-colors overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </motion.div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-center">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/events" className="inline-flex items-center bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                View All Categories <ArrowRight className="ml-2" size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div 
          className="bg-gradient-to-r from-blue-800 to-indigo-800 rounded-2xl p-12 text-white text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to Find Your Next Event?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Join thousands of satisfied customers who book their tickets through TicketMaster. 
            Fast, secure, and hassle-free.
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/register" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors">
                Create Account
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/items" className="border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
                Browse Events
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}