import React from 'react';
import Header from '../components/custom/Header';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Home() {
  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 text-zinc-900">
      <Header />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-grow flex flex-col items-center justify-center text-center px-6 py-20 bg-white"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-4 text-zinc-900"
        >
          Build Your Resume with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl mb-6 text-zinc-700 max-w-2xl"
        >
          AI-powered resume builder that creates tailored, professional resumes optimized for recruiters.
        </motion.p>
      </motion.section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-zinc-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: 'AI-Powered',
              desc: 'Generate resumes with AI that fits your job description.',
            },
            {
              title: 'ATS Friendly',
              desc: 'Your resume will pass Applicant Tracking Systems with ease.',
            },
            {
              title: 'Fast & Easy',
              desc: 'Create a resume in under 5 minutes with our guided tool.',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={featureVariants}
              initial="hidden"
              animate="visible"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
            >
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-zinc-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="px-6 py-16 bg-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">How it Works</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-6">
            {[
              'Add Your Job Title',
              'Add Your Info',
              'Download Your Resume',
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-zinc-100 p-6 rounded-xl shadow hover:shadow-lg"
              >
                <h4 className="font-semibold text-lg mb-2">{step}</h4>
                <p className="text-sm text-zinc-600">
                  {`Step ${i + 1} of using our AI builder.`}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-6 py-16 bg-zinc-200"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow text-left"
            >
              <p className="text-sm italic">
                “This tool helped me land an interview within a week. Super intuitive and fast!”
              </p>
              <p className="mt-3 font-bold">— Aditi, Software Engineer</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow text-left"
            >
              <p className="text-sm italic">
                “Clean design, easy flow, and it made resume writing fun. Love it!”
              </p>
              <p className="mt-3 font-bold">— Rahul, Data Analyst</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Badges Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-6 py-10 bg-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-semibold mb-4">Trusted by </h2>
          <div className="flex flex-wrap justify-center gap-6 text-zinc-600 text-sm">
            <span className="px-4 py-2 border rounded">JobSeekr</span>
            <span className="px-4 py-2 border rounded">LinkedCareers</span>
            <span className="px-4 py-2 border rounded">TechHire</span>
            <span className="px-4 py-2 border rounded">IndiaWorks</span>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-zinc-300 text-center text-sm text-zinc-800 py-4">
        <div className="flex justify-center items-center gap-6">
          <p>© 2025 AI Resume Builder. All rights reserved.</p>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/shreeya-khatri-860650258"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-zinc-700 hover:text-zinc-900 text-2xl transition-all" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Tyyuu55"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-zinc-800 hover:text-black text-2xl transition-all" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
