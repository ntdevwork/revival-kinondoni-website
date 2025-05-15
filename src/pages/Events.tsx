
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import EventCard from '../components/EventCard';

const Events = () => {
  const { t } = useLanguage();
  
  const events = [
    {
      title: "Men's Day",
      date: "May 4, 2025",
      description: "Join us for a special Men's Day service with Bishop Dr. Rogathe Z. Swai. The theme is 'Men of Faith, Men of Action'.",
      image: "/lovable-uploads/24ed29dd-2470-4442-bb92-2e387d526605.png"
    },
    {
      title: "Youth Conference",
      date: "June 15, 2025",
      description: "Annual youth conference focused on empowering the next generation with practical faith for today's challenges.",
      image: "https://images.unsplash.com/photo-1523803326055-13445f272bf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Women's Prayer Meeting",
      date: "July 2, 2025",
      description: "Monthly women's prayer meeting focusing on family and community. Special guest speaker from Nairobi.",
      image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Children's Day",
      date: "July 15, 2025",
      description: "A fun-filled day for children with games, Bible stories, and activities centered around growing in faith.",
      image: "https://images.unsplash.com/photo-1536337005238-94b997371b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Revival Week",
      date: "August 10-17, 2025",
      description: "A week of powerful evening services focused on spiritual renewal and revival in our community.",
      image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Worship Night",
      date: "September 5, 2025",
      description: "An evening dedicated to praise and worship, featuring our church choir and worship team.",
      image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-church-gray py-16">
        <div className="church-container">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('events')}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Join us for these upcoming events and special services at Kinondoni Revival Church.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 bg-white">
        <div className="church-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                date={event.date}
                description={event.description}
                image={event.image}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Calendar */}
      <section className="py-16 bg-gray-100">
        <div className="church-container text-center">
          <h2 className="section-title mb-8">Church Calendar</h2>
          <p className="text-lg mb-8">
            For a complete view of our church activities and events, please view our full calendar 
            or contact the church office.
          </p>
          <div className="flex justify-center">
            <iframe 
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23F47920&ctz=Africa%2FDar_es_Salaam" 
              className="w-full max-w-4xl h-96 border-2 border-church-orange rounded-lg"
              title="Church Calendar"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
