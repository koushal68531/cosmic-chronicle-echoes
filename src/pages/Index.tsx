
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Star, Telescope, Eclipse } from 'lucide-react';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [showEvents, setShowEvents] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Generate cosmic events based on date
  const generateCosmicEvents = (date: string) => {
    const events = [
      {
        id: 1,
        title: "Total Solar Eclipse Over the Pacific",
        description: "A magnificent total solar eclipse swept across the Pacific Ocean, casting its shadow over remote islands and creating a spectacular celestial display.",
        icon: <Eclipse className="w-6 h-6" />,
        type: "Eclipse",
        significance: "Witnessed by astronomical expeditions and local communities"
      },
      {
        id: 2,
        title: "Mars-Jupiter Conjunction",
        description: "Mars and Jupiter appeared in close conjunction in the constellation Gemini, creating a rare planetary dance visible to the naked eye.",
        icon: <Star className="w-6 h-6" />,
        type: "Planetary Alignment",
        significance: "Visible across the Northern Hemisphere for 3 hours"
      },
      {
        id: 3,
        title: "Perseid Meteor Shower Peak",
        description: "The annual Perseid meteor shower reached its peak intensity, with up to 60 meteors per hour streaking across the night sky.",
        icon: <Telescope className="w-6 h-6" />,
        type: "Meteor Shower",
        significance: "Best viewing conditions in rural areas after midnight"
      }
    ];

    // Simulate different events based on date
    const dateObj = new Date(date);
    const month = dateObj.getMonth();
    const day = dateObj.getDate();
    
    if (month === 5) { // June
      return events.slice(0, 2);
    } else if (month === 7) { // August
      return [events[2], events[0]];
    } else {
      return events.slice(0, 3);
    }
  };

  const validateDate = (date: string) => {
    if (!date) {
      setValidationError('Please select a date to explore');
      return false;
    }

    const selectedDate = new Date(date);
    const minDate = new Date('1000-01-01');
    const maxDate = new Date();

    if (selectedDate < minDate || selectedDate > maxDate) {
      setValidationError('Try a date from our known cosmic timeline (1000 AD - Today)');
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleRevealEvents = () => {
    if (!validateDate(selectedDate)) return;

    setIsLoading(true);
    setTimeout(() => {
      setShowEvents(true);
      setIsLoading(false);
      // Smooth scroll to events section
      document.getElementById('cosmic-timeline')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 1000);
  };

  const cosmicEvents = selectedDate ? generateCosmicEvents(selectedDate) : [];

  // Generate random stars for background
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        size: Math.random() * 2 + 1
      });
    }
    return stars;
  };

  const [stars] = useState(generateStars);

  useEffect(() => {
    // Reset events when date changes
    if (selectedDate && showEvents) {
      setShowEvents(false);
    }
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-cosmic-white relative overflow-hidden">
      {/* Animated Star Field Background */}
      <div className="star-field">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star animate-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Main Headline */}
          <div className="space-y-6 animate-fadeInUp">
            <h1 className="text-6xl md:text-8xl font-light tracking-tight text-deep-space">
              The Universe Has a
              <span className="block text-nebula-purple font-medium">Memory</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-void-gray font-light max-w-2xl mx-auto leading-relaxed">
              Enter a date and uncover what the cosmos witnessed that day.
            </p>
          </div>

          {/* Date Input Section */}
          <div className="space-y-6 max-w-md mx-auto">
            <div className="space-y-3">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-14 text-lg border-2 border-void-gray/20 focus:border-nebula-purple transition-colors bg-white/80 backdrop-blur-sm"
                min="1000-01-01"
                max={new Date().toISOString().split('T')[0]}
              />
              {validationError && (
                <p className="text-sm text-red-500 font-medium">{validationError}</p>
              )}
            </div>

            <Button
              onClick={handleRevealEvents}
              disabled={isLoading}
              className="w-full h-14 text-lg bg-nebula-purple hover:bg-nebula-purple/90 text-white transition-all duration-300 hover:shadow-lg hover:shadow-nebula-purple/25"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Consulting the Stars...
                </div>
              ) : (
                <>
                  <Calendar className="w-5 h-5 mr-3" />
                  Reveal Cosmic Events
                </>
              )}
            </Button>
          </div>

          {/* Floating Cosmic Quote */}
          <div className="mt-16 opacity-70">
            <p className="text-sm text-void-gray italic">
              "We are a way for the cosmos to know itself." — Carl Sagan
            </p>
          </div>
        </div>
      </section>

      {/* Cosmic Timeline Section */}
      {showEvents && (
        <section id="cosmic-timeline" className="relative z-10 py-24 px-6 bg-gradient-to-b from-cosmic-white to-void-gray/5">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-light text-deep-space">
                Events That Echo
                <span className="block text-nebula-purple font-medium">Through Time</span>
              </h2>
              <p className="text-lg text-void-gray max-w-2xl mx-auto">
                On {new Date(selectedDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}, the universe was busy creating history.
              </p>
            </div>

            {/* Timeline Events */}
            <div className="space-y-8">
              {cosmicEvents.map((event, index) => (
                <Card 
                  key={event.id} 
                  className="border-2 border-void-gray/10 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 group animate-fadeInUp"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Event Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-nebula-purple/10 rounded-full flex items-center justify-center text-nebula-purple group-hover:scale-110 transition-transform duration-300">
                          {event.icon}
                        </div>
                      </div>

                      {/* Event Content */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-2xl font-medium text-deep-space group-hover:text-nebula-purple transition-colors">
                            {event.title}
                          </h3>
                          <Badge variant="secondary" className="bg-celestial-gold/10 text-celestial-gold border-celestial-gold/20">
                            {event.type}
                          </Badge>
                        </div>

                        <p className="text-void-gray leading-relaxed text-lg">
                          {event.description}
                        </p>

                        <Separator className="my-4" />

                        <div className="flex items-center gap-2 text-sm text-void-gray/80">
                          <Star className="w-4 h-4" />
                          <span>{event.significance}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {cosmicEvents.length === 0 && (
                <Card className="border-2 border-void-gray/10 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-void-gray/10 rounded-full flex items-center justify-center mx-auto">
                        <Star className="w-8 h-8 text-void-gray" />
                      </div>
                      <p className="text-void-gray italic">
                        No notable events recorded — but the stars still burned silently.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Sky Map Section */}
      {showEvents && (
        <section className="relative z-10 py-24 px-6 bg-gradient-to-b from-void-gray/5 to-deep-space/5">
          <div className="max-w-6xl mx-auto text-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-light text-deep-space">
                The Sky Above You
              </h2>
              
              <p className="text-lg text-void-gray max-w-2xl mx-auto">
                Here's how the celestial dome appeared on your selected date at midnight UTC.
              </p>

              {/* Simplified Sky Representation */}
              <div className="relative max-w-2xl mx-auto">
                <div className="aspect-square bg-gradient-to-b from-deep-space via-void-gray to-deep-space rounded-full p-8 relative overflow-hidden">
                  {/* Constellation Points */}
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-celestial-gold rounded-full animate-twinkle"
                      style={{
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                        animationDelay: `${Math.random() * 3}s`
                      }}
                    />
                  ))}
                  
                  {/* Central Bright Star */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-celestial-gold rounded-full animate-glow" />
                  
                  {/* Constellation Lines (simplified) */}
                  <svg className="absolute inset-0 w-full h-full opacity-30">
                    <line x1="30%" y1="30%" x2="70%" y2="40%" stroke="#F1C40F" strokeWidth="1" />
                    <line x1="70%" y1="40%" x2="60%" y2="70%" stroke="#F1C40F" strokeWidth="1" />
                    <line x1="20%" y1="60%" x2="40%" y2="80%" stroke="#F1C40F" strokeWidth="1" />
                  </svg>
                </div>
                
                <p className="mt-6 text-sm text-void-gray italic">
                  Interactive sky maps coming soon — this is a glimpse of the cosmic canvas.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cosmic Facts Carousel */}
      {showEvents && (
        <section className="relative z-10 py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-deep-space mb-4">
                Did You Know?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  fact: "On this date, Voyager 1 was traveling at 17 kilometers per second through interstellar space.",
                  context: "Space Exploration"
                },
                {
                  fact: "The Sun completed approximately 0.04% of its 25-day rotation period on this day.",
                  context: "Solar Activity"
                },
                {
                  fact: "Light from the nearest star, Proxima Centauri, took 4.24 years to reach Earth on this date.",
                  context: "Stellar Distance"
                }
              ].map((item, index) => (
                <Card 
                  key={index}
                  className="border-2 border-void-gray/10 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group animate-fadeInUp"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-celestial-gold/10 rounded-full flex items-center justify-center mx-auto">
                      <Star className="w-6 h-6 text-celestial-gold" />
                    </div>
                    <p className="text-deep-space leading-relaxed">
                      {item.fact}
                    </p>
                    <Badge variant="outline" className="border-nebula-purple/30 text-nebula-purple">
                      {item.context}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA Section */}
      <section className="relative z-10 py-24 px-6 bg-gradient-to-b from-cosmic-white to-void-gray/10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-5xl font-light text-deep-space">
            The sky has more to show.
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button 
              onClick={() => {
                setSelectedDate('');
                setShowEvents(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              variant="outline"
              className="border-2 border-nebula-purple text-nebula-purple hover:bg-nebula-purple hover:text-white transition-all duration-300"
            >
              Try Another Date
            </Button>
            
            <Button 
              onClick={() => {
                const url = `${window.location.origin}?date=${selectedDate}`;
                navigator.clipboard.writeText(url);
                alert('Link copied to clipboard!');
              }}
              className="bg-celestial-gold hover:bg-celestial-gold/90 text-deep-space transition-all duration-300"
            >
              Share This Sky
            </Button>
          </div>

          {/* Footer */}
          <div className="pt-16 border-t border-void-gray/20 space-y-4">
            <p className="text-sm text-void-gray">
              © 2025 Echoes of the Cosmos | Crafted with curiosity and code.
            </p>
            <p className="text-xs text-void-gray/70 italic">
              "The cosmos is within us. We are made of star-stuff." — Carl Sagan
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
