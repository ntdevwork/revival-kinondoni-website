
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-church-gray py-16">
        <div className="church-container">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('about')} Kinondoni Revival Church
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            We are a Spirit-filled church committed to transforming lives through the power of the Gospel.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="church-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title border-l-4 border-church-orange pl-4">
                Our Story
              </h2>
              <p className="mb-4">
                Kinondoni Revival Church was established in 1995 as a small prayer group in
                Dar es Salaam. Over the years, we have grown into a thriving community of
                believers dedicated to serving God and our community.
              </p>
              <p className="mb-4">
                Under the leadership of Bishop Dr. Rogathe Z. Swai, our congregation has flourished,
                reaching out to the community through various ministries and outreach programs.
              </p>
              <p>
                Today, we continue to grow as we focus on authentic worship, sound biblical teaching,
                and creating an environment where all people can encounter God's love and transforming power.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1554232456-8727aae0cfa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Church Building"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-16 bg-gray-100">
        <div className="church-container">
          <div className="text-center mb-12">
            <h2 className="section-title inline-block border-b-2 border-church-orange pb-2">
              Our Foundation
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-church-orange">
              <CardHeader>
                <CardTitle className="text-xl text-church-gray">
                  {t('ourVision')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  To be a beacon of God's love and power, transforming lives and 
                  communities through the Gospel of Jesus Christ.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-church-orange">
              <CardHeader>
                <CardTitle className="text-xl text-church-gray">
                  {t('ourMission')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  To create an environment where people can encounter God, connect with 
                  others, grow spiritually, and serve in their areas of giftedness.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-church-orange">
              <CardHeader>
                <CardTitle className="text-xl text-church-gray">
                  {t('ourValues')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Biblical Authority</li>
                  <li>Spirit-Empowered Living</li>
                  <li>Authentic Worship</li>
                  <li>Meaningful Community</li>
                  <li>Compassionate Service</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-white">
        <div className="church-container">
          <h2 className="section-title text-center mb-12 border-b-2 border-church-orange pb-2 inline-block">
            Our Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4">
                <img
                  src="/lovable-uploads/24ed29dd-2470-4442-bb92-2e387d526605.png"
                  alt="Bishop Dr. Rogathe Z. Swai"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Bishop Dr. Rogathe Z. Swai</h3>
              <p className="text-church-orange mb-3">Senior Pastor</p>
              <p className="text-gray-600">
                Leading our congregation with wisdom and compassion for over 20 years.
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-5xl">?</span>
              </div>
              <h3 className="text-xl font-bold mb-1">Pastor Sarah Mwakasege</h3>
              <p className="text-church-orange mb-3">Associate Pastor</p>
              <p className="text-gray-600">
                Overseeing our women's ministry and community outreach programs.
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-5xl">?</span>
              </div>
              <h3 className="text-xl font-bold mb-1">Pastor David Munisi</h3>
              <p className="text-church-orange mb-3">Youth Pastor</p>
              <p className="text-gray-600">
                Leading our vibrant youth ministry with energy and passion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
