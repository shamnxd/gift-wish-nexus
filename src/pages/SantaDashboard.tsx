import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Gift, MapPin, Mail, Filter, CheckCircle2, Clock, Route, Eye, Building2, Menu, X, IndianRupee, CreditCard, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { getLetters, updateLetterStatus, Letter } from '@/lib/firebase/letters';
import { getSponsors, Sponsor } from '@/lib/firebase/sponsors';

// Category mapping for display
const categoryMap: Record<string, string> = {
  toys: 'Toys & Games',
  books: 'Books & Learning',
  sports: 'Sports & Outdoors',
  arts: 'Arts & Crafts',
  electronics: 'Electronics',
  clothes: 'Clothes & Accessories',
  other: 'Other',
};

const SantaDashboard: React.FC = () => {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [lettersData, sponsorsData] = await Promise.all([
        getLetters(),
        getSponsors(),
      ]);
      setLetters(lettersData);
      setSponsors(sponsorsData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const filteredLetters = letters.filter((letter) => {
    const matchesCategory = filterCategory === 'all' || letter.category.toLowerCase().includes(filterCategory.toLowerCase());
    const matchesStatus = filterStatus === 'all' || letter.status === filterStatus;
    const matchesSearch = letter.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          letter.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Get sponsor info for a letter
  const getSponsorForLetter = (letter: Letter) => {
    if (letter.sponsorId) {
      const sponsor = sponsors.find(s => s.id === letter.sponsorId);
      if (sponsor) {
        return { name: sponsor.companyName, logo: sponsor.logoUrl || '🏢' };
      }
    }
    if (letter.sponsorName) {
      return { name: letter.sponsorName, logo: '🏢' };
    }
    return null;
  };

  const handleAcceptLetter = async (id: string) => {
    try {
      await updateLetterStatus(id, 'accepted');
      setLetters(letters.map(letter => 
        letter.id === id ? { ...letter, status: 'accepted' } : letter
      ));
      toast.success('Letter accepted!');
    } catch (error) {
      console.error('Error accepting letter:', error);
      toast.error('Failed to accept letter');
    }
  };

  const handleAssignSponsor = async (letterId: string, sponsor: Sponsor) => {
    try {
      await updateLetterStatus(letterId, 'accepted', sponsor.id, sponsor.companyName);
      setLetters(letters.map(letter => 
        letter.id === letterId 
          ? { ...letter, status: 'accepted', sponsorId: sponsor.id, sponsorName: sponsor.companyName } 
          : letter
      ));
      toast.success(`Gift sponsored by ${sponsor.companyName}!`);
    } catch (error) {
      console.error('Error assigning sponsor:', error);
      toast.error('Failed to assign sponsor');
    }
  };

  const handleMarkDelivered = async (id: string) => {
    try {
      await updateLetterStatus(id, 'delivered');
      setLetters(letters.map(letter => 
        letter.id === id ? { ...letter, status: 'delivered' } : letter
      ));
      toast.success('Gift marked as delivered! 🎁');
    } catch (error) {
      console.error('Error marking as delivered:', error);
      toast.error('Failed to update status');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">Pending</Badge>;
      case 'accepted':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">Accepted</Badge>;
      case 'delivered':
        return <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">Delivered</Badge>;
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
        <title>Santa's Dashboard - SecretSanta</title>
        <meta name="description" content="Santa's command center for managing letters and deliveries." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-muted/30 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">
                🎅 Santa's Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage letters, assign sponsors, and plan deliveries!
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Letters', value: stats.total, icon: Mail, color: 'bg-primary' },
              { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-amber-500' },
              { label: 'Accepted', value: stats.accepted, icon: CheckCircle2, color: 'bg-blue-500' },
              { label: 'Delivered', value: stats.delivered, icon: Gift, color: 'bg-green-500' },
            ].map((stat, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-4 shadow-soft">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Sidebar */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>Letters & Sponsors</SheetTitle>
              </SheetHeader>
              <div className="h-[calc(100vh-4rem)]">
                <Tabs defaultValue="letters" className="h-full flex flex-col">
                  <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
                    <TabsTrigger value="letters" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Letters
                    </TabsTrigger>
                    <TabsTrigger value="sponsors" className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Sponsors
                    </TabsTrigger>
                  </TabsList>
                  
                  <ScrollArea className="flex-1 px-4 pb-4">
                    <TabsContent value="letters" className="mt-4 space-y-3">
                      {loading ? (
                        <div className="text-center py-8">
                          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">Loading...</p>
                        </div>
                      ) : letters.length === 0 ? (
                        <div className="text-center py-8">
                          <Mail className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">No letters yet</p>
                        </div>
                      ) : (
                        letters.map((letter) => (
                          <div
                            key={letter.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedLetter?.id === letter.id
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-border bg-muted/30 hover:border-primary/50'
                            }`}
                            onClick={() => {
                              setSelectedLetter(letter);
                              setSidebarOpen(false);
                            }}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="font-semibold text-sm text-foreground">{letter.childName}</h4>
                              {getStatusBadge(letter.status)}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                              <span>Age {letter.age}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {letter.location}
                              </span>
                            </div>
                            <p className="text-xs text-foreground line-clamp-2 mt-2">{letter.message}</p>
                            {getSponsorForLetter(letter) && (
                              <div className="mt-2 flex items-center gap-1 text-xs">
                                <span className="text-muted-foreground">Sponsored by:</span>
                                <span className="font-medium text-foreground">{getSponsorForLetter(letter)?.name}</span>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </TabsContent>
                    
                    <TabsContent value="sponsors" className="mt-4 space-y-3">
                      {loading ? (
                        <div className="text-center py-8">
                          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">Loading...</p>
                        </div>
                      ) : sponsors.length === 0 ? (
                        <div className="text-center py-8">
                          <Building2 className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">No sponsors yet</p>
                        </div>
                      ) : (
                        sponsors.map((sponsor) => (
                          <div
                            key={sponsor.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedSponsor?.id === sponsor.id
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-border bg-muted/30 hover:border-primary/50'
                            }`}
                            onClick={() => {
                              setSelectedSponsor(sponsor);
                              setSidebarOpen(false);
                            }}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              {sponsor.logoUrl ? (
                                <img src={sponsor.logoUrl} alt={sponsor.companyName} className="w-10 h-10 rounded object-cover" />
                              ) : (
                                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                                  <Building2 className="w-5 h-5 text-primary" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm text-foreground truncate">{sponsor.companyName}</h4>
                                <p className="text-xs text-muted-foreground truncate">{sponsor.contactEmail}</p>
                              </div>
                            </div>
                            <div className="space-y-1.5 mt-2 pt-2 border-t border-border">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Gifts:</span>
                                <span className="font-medium text-foreground">{sponsor.giftCount}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Amount/Gift:</span>
                                <span className="font-medium text-foreground">₹{sponsor.amountPerGift}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs pt-1 border-t border-border">
                                <span className="text-muted-foreground">Total:</span>
                                <span className="font-bold text-primary">₹{sponsor.totalAmount}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  <CreditCard className="w-3 h-3 mr-1" />
                                  {sponsor.paymentMethod === 'paypal' ? 'PayPal' : 'Other'}
                                </Badge>
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                                  {sponsor.paymentStatus}
                                </Badge>
                              </div>
                              {sponsor.paymentTransactionId && (
                                <p className="text-xs text-muted-foreground mt-1 font-mono truncate">
                                  {sponsor.paymentTransactionId}
                                </p>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </TabsContent>
                  </ScrollArea>
                </Tabs>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <div className={`${sidebarOpen ? 'w-80' : 'w-0'} hidden lg:block transition-all duration-300 overflow-hidden`}>
              <div className="bg-card border border-border rounded-xl shadow-soft h-[calc(100vh-12rem)] sticky top-24">
                <Tabs defaultValue="letters" className="h-full flex flex-col">
                  <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
                    <TabsTrigger value="letters" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Letters
                    </TabsTrigger>
                    <TabsTrigger value="sponsors" className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Sponsors
                    </TabsTrigger>
                  </TabsList>
                  
                  <ScrollArea className="flex-1 px-4 pb-4">
                    <TabsContent value="letters" className="mt-4 space-y-3">
                      {loading ? (
                        <div className="text-center py-8">
                          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">Loading...</p>
                        </div>
                      ) : letters.length === 0 ? (
                        <div className="text-center py-8">
                          <Mail className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">No letters yet</p>
                        </div>
                      ) : (
                        letters.map((letter) => (
                          <div
                            key={letter.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedLetter?.id === letter.id
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-border bg-muted/30 hover:border-primary/50'
                            }`}
                            onClick={() => setSelectedLetter(letter)}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="font-semibold text-sm text-foreground">{letter.childName}</h4>
                              {getStatusBadge(letter.status)}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                              <span>Age {letter.age}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {letter.location}
                              </span>
                            </div>
                            <p className="text-xs text-foreground line-clamp-2 mt-2">{letter.message}</p>
                            {getSponsorForLetter(letter) && (
                              <div className="mt-2 flex items-center gap-1 text-xs">
                                <span className="text-muted-foreground">Sponsored by:</span>
                                <span className="font-medium text-foreground">{getSponsorForLetter(letter)?.name}</span>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </TabsContent>
                    
                    <TabsContent value="sponsors" className="mt-4 space-y-3">
                      {loading ? (
                        <div className="text-center py-8">
                          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">Loading...</p>
                        </div>
                      ) : sponsors.length === 0 ? (
                        <div className="text-center py-8">
                          <Building2 className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">No sponsors yet</p>
                        </div>
                      ) : (
                        sponsors.map((sponsor) => (
                          <div
                            key={sponsor.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedSponsor?.id === sponsor.id
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-border bg-muted/30 hover:border-primary/50'
                            }`}
                            onClick={() => setSelectedSponsor(sponsor)}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              {sponsor.logoUrl ? (
                                <img src={sponsor.logoUrl} alt={sponsor.companyName} className="w-10 h-10 rounded object-cover" />
                              ) : (
                                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                                  <Building2 className="w-5 h-5 text-primary" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm text-foreground truncate">{sponsor.companyName}</h4>
                                <p className="text-xs text-muted-foreground truncate">{sponsor.contactEmail}</p>
                              </div>
                            </div>
                            <div className="space-y-1.5 mt-2 pt-2 border-t border-border">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Gifts:</span>
                                <span className="font-medium text-foreground">{sponsor.giftCount}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Amount/Gift:</span>
                                <span className="font-medium text-foreground">₹{sponsor.amountPerGift}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs pt-1 border-t border-border">
                                <span className="text-muted-foreground">Total:</span>
                                <span className="font-bold text-primary">₹{sponsor.totalAmount}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  <CreditCard className="w-3 h-3 mr-1" />
                                  {sponsor.paymentMethod === 'paypal' ? 'PayPal' : 'Other'}
                                </Badge>
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                                  {sponsor.paymentStatus}
                                </Badge>
                              </div>
                              {sponsor.paymentTransactionId && (
                                <p className="text-xs text-muted-foreground mt-1 font-mono truncate">
                                  {sponsor.paymentTransactionId}
                                </p>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </TabsContent>
                  </ScrollArea>
                </Tabs>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Letters List */}
              <div>
              {/* Filters */}
              <div className="bg-card border border-border rounded-xl p-4 mb-6 shadow-soft">
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
              {loading ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading letters...</p>
                </div>
              ) : filteredLetters.length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No letters found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredLetters.map((letter) => (
                  <div
                    key={letter.id}
                    className={`bg-card border rounded-xl p-5 shadow-soft transition-all hover:shadow-card cursor-pointer ${
                      selectedLetter?.id === letter.id ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                    }`}
                    onClick={() => setSelectedLetter(letter)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-foreground">{letter.childName}</h3>
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
                            {categoryMap[letter.category] || letter.category}
                          </span>
                        </div>
                        <p className="text-sm text-foreground line-clamp-2">{letter.message}</p>
                        
                        {getSponsorForLetter(letter) && (
                          <div className="mt-3 inline-flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
                            <span className="text-lg">{getSponsorForLetter(letter)?.logo}</span>
                            <span className="text-xs text-muted-foreground">Sponsored by</span>
                            <span className="text-sm font-medium text-foreground">{getSponsorForLetter(letter)?.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {letter.status === 'pending' && (
                          <Button size="sm" variant="green" onClick={(e) => { e.stopPropagation(); if (letter.id) handleAcceptLetter(letter.id); }}>
                            Accept
                          </Button>
                        )}
                        {letter.status === 'accepted' && !getSponsorForLetter(letter) && (
                          <Button size="sm" variant="gold" onClick={(e) => e.stopPropagation()}>
                            Assign
                          </Button>
                        )}
                        {letter.status === 'accepted' && getSponsorForLetter(letter) && (
                          <Button size="sm" variant="christmas" onClick={(e) => { e.stopPropagation(); if (letter.id) handleMarkDelivered(letter.id); }}>
                            Delivered
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              )}
              </div>
            </div>

            {/* Details Panel */}
            <div className="w-80 hidden xl:block">
              <div className="space-y-6 sticky top-24">
                {/* Selected Letter Details */}
                {selectedLetter && (
                  <div className="bg-card border border-border rounded-xl p-5 shadow-soft">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-foreground flex items-center gap-2">
                        <Eye className="w-5 h-5 text-primary" />
                        Letter Details
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setSelectedLetter(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <ScrollArea className="max-h-[calc(100vh-20rem)]">
                      <div className="space-y-4 pr-4">
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
                          <p className="text-foreground">{categoryMap[selectedLetter.category] || selectedLetter.category}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Status</p>
                          {getStatusBadge(selectedLetter.status)}
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Message</p>
                          <p className="text-foreground text-sm bg-muted p-3 rounded-lg">{selectedLetter.message}</p>
                        </div>
                        {selectedLetter.drawingUrl && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Drawing</p>
                            <img src={selectedLetter.drawingUrl} alt="Child's drawing" className="w-full rounded-lg border border-border" />
                          </div>
                        )}
                        {selectedLetter.status === 'accepted' && !getSponsorForLetter(selectedLetter) && selectedLetter.id && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Assign Sponsor</p>
                            <div className="grid grid-cols-1 gap-2">
                              {sponsors.map((sponsor) => (
                                <Button
                                  key={sponsor.id}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs justify-start"
                                  onClick={() => handleAssignSponsor(selectedLetter.id!, sponsor)}
                                >
                                  {sponsor.logoUrl ? (
                                    <img src={sponsor.logoUrl} alt={sponsor.companyName} className="w-4 h-4 mr-2 rounded" />
                                  ) : (
                                    <Building2 className="w-4 h-4 mr-2" />
                                  )}
                                  {sponsor.companyName}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                        {getSponsorForLetter(selectedLetter) && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Sponsored By</p>
                            <div className="bg-muted p-3 rounded-lg">
                              <p className="font-medium text-foreground">{getSponsorForLetter(selectedLetter)?.name}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                {/* Selected Sponsor Details */}
                {selectedSponsor && (
                  <div className="bg-card border border-border rounded-xl p-5 shadow-soft">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-foreground flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-amber-500" />
                        Sponsor Details
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setSelectedSponsor(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <ScrollArea className="max-h-[calc(100vh-20rem)]">
                      <div className="space-y-4 pr-4">
                        <div className="flex items-center gap-3 mb-4">
                          {selectedSponsor.logoUrl ? (
                            <img src={selectedSponsor.logoUrl} alt={selectedSponsor.companyName} className="w-16 h-16 rounded-lg object-cover border border-border" />
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center border border-border">
                              <Building2 className="w-8 h-8 text-primary" />
                            </div>
                          )}
                          <div>
                            <h4 className="font-semibold text-foreground">{selectedSponsor.companyName}</h4>
                            <p className="text-xs text-muted-foreground">{selectedSponsor.contactEmail}</p>
                          </div>
                        </div>
                        <div className="space-y-3 pt-3 border-t border-border">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Gifts Sponsored:</span>
                            <span className="font-semibold text-foreground">{selectedSponsor.giftCount}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Amount per Gift:</span>
                            <span className="font-semibold text-foreground">₹{selectedSponsor.amountPerGift}</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-border">
                            <span className="text-sm font-semibold text-foreground">Total Amount:</span>
                            <span className="text-lg font-bold text-primary">₹{selectedSponsor.totalAmount}</span>
                          </div>
                          <div className="flex items-center gap-2 pt-2">
                            <Badge variant="outline" className="text-xs">
                              <CreditCard className="w-3 h-3 mr-1" />
                              {selectedSponsor.paymentMethod === 'paypal' ? 'PayPal' : 'Other'}
                            </Badge>
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                              {selectedSponsor.paymentStatus}
                            </Badge>
                          </div>
                          {selectedSponsor.paymentTransactionId && (
                            <div className="pt-2 border-t border-border">
                              <p className="text-xs text-muted-foreground mb-1">Transaction ID:</p>
                              <p className="text-xs font-mono text-foreground break-all">{selectedSponsor.paymentTransactionId}</p>
                            </div>
                          )}
                          {selectedSponsor.message && (
                            <div className="pt-2 border-t border-border">
                              <p className="text-xs text-muted-foreground mb-1">Message:</p>
                              <p className="text-sm text-foreground bg-muted p-2 rounded">{selectedSponsor.message}</p>
                            </div>
                          )}
                          {selectedSponsor.createdAt && (
                            <div className="pt-2 border-t border-border">
                              <p className="text-xs text-muted-foreground mb-1">Joined:</p>
                              <p className="text-xs text-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(selectedSponsor.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </ScrollArea>
                  </div>
                )}

                {/* Map Preview */}
                {!selectedLetter && !selectedSponsor && (
                  <div className="bg-card border border-border rounded-xl p-5 shadow-soft">
                    <h3 className="font-display text-foreground mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Delivery Map
                    </h3>
                    <div className="aspect-video bg-gradient-soft rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Interactive map coming soon</p>
                        <p className="text-xs text-muted-foreground mt-1">{letters.length} delivery points</p>
                      </div>
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
                )}
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
