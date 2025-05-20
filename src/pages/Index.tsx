
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Hero from '../components/Hero';
import ServiceTimes from '../components/ServiceTimes';
import EventCard from '../components/EventCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { t } = useLanguage();

  const upcomingEvents = [
    {
      title: "Men's Day",
      date: "May 4, 2025",
      description: "Join us for a special Men's Day service with Bishop Dr. Rogathe Z. Swai.",
      image: "/lovable-uploads/24ed29dd-2470-4442-bb92-2e387d526605.png"
    },
    {
      title: "Youth Conference",
      date: "June 15, 2025",
      description: "Annual youth conference focused on empowering the next generation.",
      image: "https://images.unsplash.com/photo-1523803326055-13445f272bf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Women's Prayer Meeting",
      date: "July 2, 2025",
      description: "Monthly women's prayer meeting focusing on family and community.",
      image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
  ];

  return (
    <div>
      <Hero />
      
      {/* About Section */}
      <section className="bg-white py-16">
        <div className="church-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <h2 className="section-title border-l-4 border-church-orange pl-4">
                  {t('about')} Kinondoni Revival Church
                </h2>
                <img 
                  src="/lovable-uploads/650c6a50-7fdb-496b-b9aa-e14f2dffddf9.png" 
                  alt="Tanzania Assemblies of God Logo" 
                  className="h-12 ml-4"
                />
              </div>
              <p className="text-lg mb-6">
                Kinondoni Revival Church is a vibrant community of believers 
                dedicated to spreading the Gospel of Jesus Christ. As part of the 
                Tanzania Assemblies of God, we strive to create an environment where 
                people can encounter God and grow spiritually.
              </p>
              <p className="text-lg mb-6">
                Our church focuses on authentic worship, biblical teaching, 
                community service, and missions both locally and globally. We believe 
                in the power of prayer and the importance of fellowship among believers.
              </p>
              <Button asChild className="bg-church-orange hover:bg-church-orangeDark">
                <Link to="/about">
                  {t('learnMore')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div>
              <ServiceTimes />
            </div>
          </div>
        </div>
      </section>
      
      {/* Events Section */}
      <section className="bg-gray-100 py-16">
        <div className="church-container">
          <h2 className="section-title text-center mb-10 border-b-2 border-church-orange pb-2 inline-block">
            {t('upcomingEvents')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                date={event.date}
                description={event.description}
                image={event.image}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild className="bg-church-orange hover:bg-church-orangeDark">
              <Link to="/events">
                {t('viewAllEvents')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-church-orange py-16 text-white">
        <div className="church-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('joinUs')}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We'd love to welcome you to our church family. Join us for our Sunday services and experience God's presence.
          </p>
          <Button asChild variant="outline" className="bg-white text-church-orange border-white hover:bg-gray-100">
            <Link to="/contact">
              {t('contactUs')}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
