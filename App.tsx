
import React, { useState, useEffect } from 'react';
import { Trophy, Users, LayoutDashboard, Settings, ChevronRight, Menu, Loader2 } from 'lucide-react';
import { Round, PlayerStanding, TournamentConfig, ViewType } from './types';
import { splitPgnGames, parseSingleGame, calculateStandings } from './utils/pgnParser';
import RoundsView from './components/RoundsView';
import StandingsView from './components/StandingsView';
import SetupWizard from './components/SetupWizard';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('setup');
  const [rounds, setRounds] = useState<Round[]>([]);
  const [config, setConfig] = useState<TournamentConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loadTournamentData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch Configuration
        const configRes = await fetch(`${import.meta.env.BASE_URL}config/tournament-config.json`);
        if (!configRes.ok) throw new Error('Failed to load tournament-config.json');
        const configData = await configRes.json();
        setConfig(configData);

        // 2. Fetch Manifest
        const manifestRes = await fetch(`${import.meta.env.BASE_URL}data/manifest.json`);
        if (!manifestRes.ok) throw new Error('Failed to load data/manifest.json');
        const manifest = await manifestRes.json();

        // 3. Fetch each PGN round
        const loadedRounds: Round[] = [];
        for (const filename of manifest.rounds) {
          const roundRes = await fetch(`${import.meta.env.BASE_URL}data/${filename}`);
          if (roundRes.ok) {
            const content = await roundRes.text();
            const roundMatch = filename.match(/round(\d+)/i);
            const roundNumber = roundMatch ? parseInt(roundMatch[1]) : loadedRounds.length + 1;
            
            const gameBlocks = splitPgnGames(content);
            const parsedGames = gameBlocks.map(block => parseSingleGame(block, roundNumber));
            
            loadedRounds.push({
              number: roundNumber,
              games: parsedGames
            });
          }
        }
        
        setRounds(loadedRounds.sort((a, b) => a.number - b.number));
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTournamentData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading Tournament Dashboard...</p>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-200 max-w-md">
          <h2 className="text-xl font-bold mb-2">Initialization Error</h2>
          <p className="mb-4">{error || 'Could not find configuration files.'}</p>
          <p className="text-sm opacity-75">Ensure <b>config/tournament-config.json</b> and <b>data/manifest.json</b> exist in your project root.</p>
        </div>
      </div>
    );
  }

  const standings = calculateStandings(rounds.flatMap(r => r.games));

  const NavItem = ({ icon: Icon, label, id }: { icon: any, label: string, id: ViewType }) => (
    <button
      onClick={() => { setView(id); setIsSidebarOpen(false); }}
      className={`flex items-center w-full p-4 transition-colors ${
        view === id 
          ? 'text-white border-l-4' 
          : 'text-white hover:bg-white hover:bg-opacity-10'
      }`}
      style={view === id ? { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderLeftColor: '#fff' } : {}}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span className="font-medium">{label}</span>
      {view === id && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 shadow-xl transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      style={{ backgroundColor: config.primaryColor }}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="flex items-center space-x-3 mb-6">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: config.primaryColor }}
              >
                <Trophy className="w-6 h-6" />
              </div>
              <h1 className="text-lg font-bold text-white leading-tight">{config.name}</h1>
            </div>
            
            {config.logoUrl && (
              <div className="flex justify-center mb-4 bg-white/5 p-3 rounded-lg">
                <img src={config.logoUrl} alt="Sponsor" className="h-10 object-contain rounded" />
              </div>
            )}
          </div>

          <nav className="flex-1 mt-4">
            <NavItem icon={Settings} label="Tournament Info" id="setup" />
            <NavItem icon={LayoutDashboard} label="Tournament Rounds" id="rounds" />
            <NavItem icon={Users} label="Current Standings" id="standings" />
            
          </nav>

          <div className="p-4 m-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <p className="text-xs mb-1 uppercase tracking-wider font-semibold" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Organized by</p>
            <p className="text-sm font-medium truncate text-white">{config.sponsorName || "Anonymous"}</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white border-b lg:hidden">
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6" style={{ color: config.primaryColor }} />
            <span className="font-bold text-lg truncate">{config.name}</span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {view === 'setup' && (
              <SetupWizard 
                config={config} 
                hasData={rounds.length > 0}
              />
            )}
            {view === 'rounds' && (
              <RoundsView 
                rounds={rounds} 
                primaryColor={config.primaryColor}
                secondaryColor={config.secondaryColor}
              />
            )}
            {view === 'standings' && (
              <StandingsView 
                standings={standings} 
                primaryColor={config.primaryColor} 
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
