import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Gift, MapPin, Mail, Filter, CheckCircle2, Clock, Route, Eye, Building2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Mock data for letters
const mockLetters = [
  {
    id: 1,
    childName: 'Emma Johnson',
    age: 7,
    location: 'New York, USA',
    category: 'Toys & Games',
    message: 'Dear Santa, I have been very good this year. I would love a teddy bear and some coloring books. I also helped my mom with chores every day!',
    status: 'pending',
    sponsor: null,
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: 2,
    childName: 'Lucas Martin',
    age: 9,
    location: 'London, UK',
    category: 'Books & Learning',
    message: 'Hi Santa! I love reading adventure books. Could you bring me some new ones? I finished reading 20 books this year!',
    status: 'accepted',
    sponsor: { name: 'BookWorld', logo: '📚' },
    coordinates: { lat: 51.5074, lng: -0.1278 },
  },
  {
    id: 3,
    childName: 'Sofia Garcia',
    age: 6,
    location: 'Madrid, Spain',
    category: 'Arts & Crafts',
    message: 'Dear Santa, I want to be an artist when I grow up! Can you please bring me paint supplies and a canvas?',
    status: 'delivered',
    sponsor: { name: 'ArtSupply Co', logo: '🎨' },
    coordinates: { lat: 40.4168, lng: -3.7038 },
  },
  {
    id: 4,
    childName: 'Oliver Brown',
    age: 8,
    location: 'Sydney, Australia',
    category: 'Sports & Outdoors',
    message: 'G\'day Santa! I would really love a new soccer ball and some cricket equipment. I play sports every day after school!',
    status: 'pending',
    sponsor: null,
    coordinates: { lat: -33.8688, lng: 151.2093 },
  },
  {
    id: 5,
    childName: 'Mia Anderson',
    age: 5,
    location: 'Toronto, Canada',
    category: 'Toys & Games',
    message: 'Dear Santa, I want a dollhouse! I have been sharing my toys with my little brother all year. Love, Mia',
    status: 'accepted',
    sponsor: { name: 'ToyWorld', logo: '🧸' },
    coordinates: { lat: 43.6532, lng: -79.3832 },
  },
];

const sponsors = [
  { name: 'ToyWorld', logo: '🧸' },
  { name: 'BookWorld', logo: '📚' },
  { name: 'ArtSupply Co', logo: '🎨' },
  { name: 'Happy Games', logo: '🎮' },
  { name: 'Sports Plus', logo: '⚽' },
];

const SantaDashboard: React.FC = () => {
  const [letters, setLetters] = useState(mockLetters);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<typeof mockLetters[0] | null>(null);

  const filteredLetters = letters.filter((letter) => {
    const matchesCategory = filterCategory === 'all' || letter.category.toLowerCase().includes(filterCategory.toLowerCase());
    const matchesStatus = filterStatus === 'all' || letter.status === filterStatus;
    const matchesSearch = letter.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          letter.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleAcceptLetter = (id: number) => {
    setLetters(letters.map(letter => 
      letter.id === id ? { ...letter, status: 'accepted' } : letter
    ));
    toast.success('Letter accepted! Ready for sponsor assignment.');
  };

  const handleAssignSponsor = (letterId: number, sponsor: typeof sponsors[0]) => {
    setLetters(letters.map(letter => 
      letter.id === letterId ? { ...letter, sponsor } : letter
    ));
    toast.success(`Gift sponsored by ${sponsor.name}!`);
  };

  const handleMarkDelivered = (id: number) => {
    setLetters(letters.map(letter => 
      letter.id === id ? { ...letter, status: 'delivered' } : letter
    ));
    toast.success('Gift marked as delivered! 🎁');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-amber-500/20 text-amber-700 border-amber-300">Pending</Badge>;
      case 'accepted':
        return <Badge variant="secondary" className="bg-blue-500/20 text-blue-700 border-blue-300">Accepted</Badge>;
      case 'delivered':
        return <Badge variant="secondary" className="bg-green-500/20 text-green-700 border-green-300">Delivered</Badge>;
      default:
        return null;
    }
  };

  const stats = {
    total: letters.length,
    pending: letters.filter(l => l.status === 'pending').length,
    accepted: letters.filter(l => l.status === 'accepted').length,
    delivered: letters.filter(l => l.status === 'delivered').length,
  };

  return (
    <>
      <Helmet>
        <title>Santa's Dashboard - Manage Letters & Deliveries</title>
        <meta name="description" content="Santa's command center for managing letters, assigning sponsors, and planning gift deliveries." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-muted/30 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              🎅 Santa's Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage letters, assign sponsors, and plan your magical delivery route!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Letters', value: stats.total, icon: Mail, color: 'bg-primary' },
              { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-amber-500' },
              { label: 'Accepted', value: stats.accepted, icon: CheckCircle2, color: 'bg-blue-500' },
              { label: 'Delivered', value: stats.delivered, icon: Gift, color: 'bg-green-500' },
            ].map((stat, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Letters List */}
            <div className="lg:col-span-2">
              {/* Filters */}
              <div className="bg-card border border-border rounded-xl p-4 mb-6 shadow-card">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by name or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-10"
                    />
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="toys">Toys & Games</SelectItem>
                      <SelectItem value="books">Books & Learning</SelectItem>
                      <SelectItem value="sports">Sports & Outdoors</SelectItem>
                      <SelectItem value="arts">Arts & Crafts</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Letters Grid */}
              <div className="space-y-4">
                {filteredLetters.map((letter) => (
                  <div
                    key={letter.id}
                    className={`bg-card border rounded-xl p-5 shadow-card transition-all hover:shadow-lg cursor-pointer ${
                      selectedLetter?.id === letter.id ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                    }`}
                    onClick={() => setSelectedLetter(letter)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display font-bold text-foreground">{letter.childName}</h3>
                          <Badge variant="outline" className="text-xs">Age {letter.age}</Badge>
                          {getStatusBadge(letter.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {letter.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Gift className="w-3.5 h-3.5" />
                            {letter.category}
                          </span>
                        </div>
                        <p className="text-sm text-foreground line-clamp-2">{letter.message}</p>
                        
                        {letter.sponsor && (
                          <div className="mt-3 inline-flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
                            <span className="text-lg">{letter.sponsor.logo}</span>
                            <span className="text-xs text-muted-foreground">Sponsored by</span>
                            <span className="text-sm font-medium text-foreground">{letter.sponsor.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {letter.status === 'pending' && (
                          <Button size="sm" variant="green" onClick={(e) => { e.stopPropagation(); handleAcceptLetter(letter.id); }}>
                            Accept
                          </Button>
                        )}
                        {letter.status === 'accepted' && !letter.sponsor && (
                          <Button size="sm" variant="gold" onClick={(e) => e.stopPropagation()}>
                            Assign
                          </Button>
                        )}
                        {letter.status === 'accepted' && letter.sponsor && (
                          <Button size="sm" variant="christmas" onClick={(e) => { e.stopPropagation(); handleMarkDelivered(letter.id); }}>
                            Delivered
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Selected Letter Details */}
              {selectedLetter && (
                <div className="bg-card border border-border rounded-xl p-5 shadow-card">
                  <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    Letter Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">From</p>
                      <p className="font-semibold text-foreground">{selectedLetter.childName}, Age {selectedLetter.age}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Location</p>
                      <p className="text-foreground">{selectedLetter.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Category</p>
                      <p className="text-foreground">{selectedLetter.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Message</p>
                      <p className="text-foreground text-sm bg-muted p-3 rounded-lg">{selectedLetter.message}</p>
                    </div>
                    {selectedLetter.status === 'accepted' && !selectedLetter.sponsor && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Assign Sponsor</p>
                        <div className="grid grid-cols-2 gap-2">
                          {sponsors.slice(0, 4).map((sponsor) => (
                            <Button
                              key={sponsor.name}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => handleAssignSponsor(selectedLetter.id, sponsor)}
                            >
                              {sponsor.logo} {sponsor.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Map Preview */}
              <div className="bg-card border border-border rounded-xl p-5 shadow-card">
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Delivery Map
                </h3>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Interactive map coming soon</p>
                      <p className="text-xs text-muted-foreground mt-1">{letters.length} delivery points</p>
                    </div>
                  </div>
                  {/* Decorative dots representing locations */}
                  {letters.slice(0, 5).map((letter, i) => (
                    <div
                      key={letter.id}
                      className="absolute w-3 h-3 bg-primary rounded-full animate-pulse"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 3) * 20}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Route className="w-4 h-4 mr-2" />
                  Optimize Route
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="bg-card border border-border rounded-xl p-5 shadow-card">
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-christmas-gold" />
                  Active Sponsors
                </h3>
                <div className="space-y-3">
                  {sponsors.map((sponsor) => (
                    <div key={sponsor.name} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                      <span className="text-xl">{sponsor.logo}</span>
                      <span className="text-sm font-medium text-foreground">{sponsor.name}</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {letters.filter(l => l.sponsor?.name === sponsor.name).length} gifts
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default SantaDashboard;
