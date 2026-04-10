import React, { useState, useEffect, useRef, useCallback } from 'react';

// ---------------------------------------------------------
// HELPER FUNCTIONS FOR MOCK DATA GENERATION
// ---------------------------------------------------------
const randomIP = () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
const randomLatency = () => Math.floor(Math.random() * 50) + 10;
const randomBandwidth = () => Math.floor(Math.random() * 130) + 20;
const randomDevice = () => {
  const devices = ['mobile', 'laptop', 'smart-tv', 'iot-fridge', 'gaming-console', 'desktop-pc'];
  return devices[Math.floor(Math.random() * devices.length)];
};
const randomStatus = () => Math.random() > 0.3 ? 'active' : 'idle';
const randomRegion = () => {
  const regions = ['EU-West', 'Asia-South', 'US-East', 'US-West', 'EU-Central', 'AP-Northeast'];
  return regions[Math.floor(Math.random() * regions.length)];
};

// ---------------------------------------------------------
// 1. REUSABLE TYPEWRITER PANEL
// ---------------------------------------------------------
const TypewriterPanel = ({ lines, isTerminal = false, onCommandSubmit }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  // Run the typing sequence
  useEffect(() => {
    if (!lines || lines.length === 0) return;
    
    // Reset state when new lines prop arrives (like changing tabs)
    setDisplayedLines([]);
    setCurrentIndex(0);
  }, [lines]);

  useEffect(() => {
    if (!lines || lines.length === 0 || currentIndex >= lines.length) return;

    const delay = Math.floor(Math.random() * 200) + 300; // 300-500ms delay between lines
    const timer = setTimeout(() => {
      setDisplayedLines(prev => [...prev, lines[currentIndex]]);
      setCurrentIndex(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, lines]);

  // Keep scroll at bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onCommandSubmit && inputVal.trim()) {
      onCommandSubmit(inputVal.trim());
      setInputVal('');
    }
  };

  return (
    <div className="w-full h-full min-h-[250px] max-h-[350px] transition-all overflow-hidden border border-[#00f3ff]/30 bg-black/80 backdrop-blur-md rounded-lg font-mono text-sm shadow-[0_0_20px_rgba(0,243,255,0.15)] flex flex-col p-5">
      
      {/* Chrome Header */}
      <div className="flex items-center gap-2 mb-4 border-b border-[#00f3ff]/20 pb-3 shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
        <span className="text-[#00f3ff]/70 text-xs ml-2 uppercase tracking-[0.2em]">Network_Terminal // v2.4</span>
      </div>

      {/* Output Stream */}
      <div ref={containerRef} className="flex-1 overflow-y-auto space-y-2 mb-2 scrollbar-none w-full text-left">
        {displayedLines.map((l, i) => (
          <div key={i} className={`
            ${l.startsWith('>>> ACCESS') ? 'text-green-400 font-bold' : ''}
            ${l.startsWith('>>> ERROR') ? 'text-red-400 font-bold' : ''}
            ${l.startsWith('$') ? 'text-white/90' : 'text-[#00f3ff]/90'}
          `}>{l}</div>
        ))}
        {/* Blinking cursor if sequence still running or if waiting for input */}
        {(currentIndex < (lines?.length || 0) || isTerminal) && (
          <div className="text-[#00f3ff] animate-pulse inline-block">_</div>
        )}
      </div>

      {/* Terminal Input (Only rendered in TERMINAL mode) */}
      {isTerminal && (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 text-[#00f3ff] shrink-0 pt-2 border-t border-[#00f3ff]/20 mt-auto">
          <span className="font-bold">$</span>
          <input 
            type="text" 
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[#00f3ff] font-bold"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      )}
    </div>
  );
};

// ---------------------------------------------------------
// 2. ANIMATED NETWORK CANVAS BACKGROUND
// ---------------------------------------------------------
const NetworkCanvas = ({ activeModule }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    const numParticles = 60;
    
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initParticles(rect.width, rect.height);
    };

    const initParticles = (w, h) => {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      let connectionDistance = 100;
      let speedMultiplier = 1;
      let nodeColor = 'rgba(0, 243, 255, 0.5)';
      let lineColor = 'rgba(0, 243, 255, ';

      if (activeModule === 'LAN') {
        connectionDistance = 70;
        speedMultiplier = 3.5;
        nodeColor = 'rgba(16, 185, 129, 0.8)';
        lineColor = 'rgba(16, 185, 129, ';
      } else if (activeModule === 'HUB') {
        connectionDistance = 180;
        nodeColor = 'rgba(168, 85, 247, 0.6)';
        lineColor = 'rgba(168, 85, 247, ';
      }

      particles.forEach(p => {
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        if (p.x < 0 || p.x > rect.width) p.vx *= -1;
        if (p.y < 0 || p.y > rect.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = 1 - (dist / connectionDistance);
            ctx.strokeStyle = `${lineColor}${alpha * 0.6})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeModule]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen" />;
};

// ---------------------------------------------------------
// 3. MAIN COMMAND CENTER MODAL
// ---------------------------------------------------------
const CommandCenterModal = ({ isOpen, onClose, initialMode = 'TERMINAL' }) => {
  const [activeModule, setActiveModule] = useState(initialMode);
  
  // Terminal state
  const [terminalLines, setTerminalLines] = useState([
    "> SYSTEM READY. AWAITING COMMAND. (Try: 'help', 'scan')",
  ]);
  
  // Display lines for typewriter
  const [currentSequence, setCurrentSequence] = useState([]);
  
  // We use this to force re-render sequences if clicking the same tab twice
  const [sequenceId, setSequenceId] = useState(0);

  // Sync prop to state when opened
  useEffect(() => {
    if (isOpen) {
      handleTabClick(initialMode);
    }
  }, [isOpen, initialMode]);

  const generateHubSequence = () => {
    const numRegions = Math.floor(Math.random() * 3) + 2; // 2 to 4 regions
    const seq = [
      "> initializing global scan...",
      "> detecting node..."
    ];
    for (let i = 0; i < numRegions; i++) {
      seq.push(`> node linked: ${randomRegion()}`);
    }
    seq.push("> route optimized");
    seq.push("> network stable");
    return seq;
  };

  const generateLanSequence = () => {
    const numDevices = Math.floor(Math.random() * 4) + 2; // 2 to 5 devices
    const seq = [
      "> scanning local network...",
      "> gateway: 192.168.0.1"
    ];
    for (let i = 0; i < numDevices; i++) {
      seq.push(`> device found: ${randomDevice()} (${randomStatus()})`);
    }
    seq.push(`> bandwidth: ${randomBandwidth()} Mbps`);
    seq.push(`> latency: ${randomLatency()}ms`);
    return seq;
  };

  const handleTabClick = (moduleName) => {
    setActiveModule(moduleName);
    setSequenceId(prev => prev + 1); // trigger re-render
    
    if (moduleName === 'HUB') {
      setCurrentSequence(generateHubSequence());
    } else if (moduleName === 'LAN') {
      setCurrentSequence(generateLanSequence());
    } else if (moduleName === 'TERMINAL') {
      // Don't reset terminal lines on tab switch to keep history realistic
      setCurrentSequence(terminalLines);
    }
  };

  const handleTerminalCommand = (input) => {
    const cmd = input.toLowerCase();
    const output = [...terminalLines, `$ ${input}`];

    if (cmd === 'help') {
      output.push(">>> COMMANDS: help, scan, status, clear");
    } else if (cmd === 'scan') {
      output.push(">>> scanning...");
      output.push(`>>> devices: ${Math.floor(Math.random() * 5) + 1}`);
      output.push(`>>> latency: ${randomLatency()}ms`);
      output.push(">>> status: secure");
    } else if (cmd === 'status') {
      output.push(">>> SYSTEM ONLINE. NO BREACHES DETECTED.");
    } else if (cmd === 'clear') {
      setTerminalLines(["> SYSTEM READY. AWAITING COMMAND. (Try: 'help', 'scan')"]);
      setCurrentSequence(["> SYSTEM READY. AWAITING COMMAND. (Try: 'help', 'scan')"]);
      return;
    } else {
      output.push(`>>> COMMAND NOT RECOGNIZED: ${cmd}`);
    }

    setTerminalLines(output);
    setCurrentSequence(output);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm transition-opacity">
      {/* Click outside bounds to close */}
      <div className="absolute inset-0 z-0" onClick={onClose}></div>
      
      <div className="relative z-10 w-full max-w-4xl bg-[#030612] text-slate-300 font-['Inter'] overflow-hidden border border-[#00f3ff]/30 rounded-2xl shadow-[0_0_50px_rgba(0,150,255,0.15)] flex flex-col h-[70vh] min-h-[500px]">
        
        {/* Animated Background */}
        <NetworkCanvas activeModule={activeModule} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#030612]/70 to-[#030612]/95 pointer-events-none z-0 border rounded-2xl"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-[#00f3ff] hover:text-white bg-[#00f3ff]/10 hover:bg-[#00f3ff]/30 p-2 rounded-full transition-all border border-[#00f3ff]/30 backdrop-blur-md"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="relative z-10 p-6 sm:p-10 flex flex-col h-full pointer-events-auto">
          
          {/* Header Concept */}
          <div className="text-3xl font-bold text-white font-headline flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#00f3ff]/10 rounded-xl border-2 border-[#00f3ff]/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.2)]">
              <span className="material-symbols-outlined text-[#00f3ff] text-2xl relative">
                <span className="absolute inset-0 material-symbols-outlined animate-ping opacity-30">radar</span>
                radar
              </span>
            </div>
            <div className="flex flex-col">
              <span className="tracking-widest uppercase">Command Center</span>
              <span className="text-[#00f3ff]/60 font-mono text-[10px] tracking-[0.3em] uppercase leading-none">Diagnostic HUD v2.5</span>
            </div>
          </div>

          {/* Interactive Navigation Hub */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-0 bg-[#0b1221]/80 p-2.5 rounded-[2rem] border border-[#00f3ff]/20 backdrop-blur-md relative shadow-2xl mb-8 shrink-0">
            <button 
              onClick={() => handleTabClick('HUB')}
              className={`w-full sm:w-auto px-8 py-3 rounded-3xl transition-all duration-300 uppercase tracking-[0.15em] font-bold text-sm border-2 flex items-center justify-center gap-2 relative z-10
                ${activeModule === 'HUB' 
                  ? 'bg-purple-500/20 text-white border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.4)]' 
                  : 'text-slate-300 border-transparent hover:text-white hover:bg-purple-500/10 hover:border-purple-500/30'}`}
            >
              <span className="material-symbols-outlined text-lg opacity-70">hub</span>
              Global Hub
            </button>
            <div className="hidden sm:block w-px h-8 bg-[#00f3ff]/20 mx-2"></div>
            
            <button 
              onClick={() => handleTabClick('LAN')}
              className={`w-full sm:w-auto px-8 py-3 rounded-3xl transition-all duration-300 uppercase tracking-[0.15em] font-bold text-sm border-2 flex items-center justify-center gap-2 relative z-10
                ${activeModule === 'LAN' 
                  ? 'bg-emerald-500/20 text-white border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                  : 'text-slate-300 border-transparent hover:text-white hover:bg-emerald-500/10 hover:border-emerald-500/30'}`}
            >
              <span className="material-symbols-outlined text-lg opacity-70">lan</span>
              Local LAN
            </button>
            <div className="hidden sm:block w-px h-8 bg-[#00f3ff]/20 mx-2"></div>

            <button 
              onClick={() => handleTabClick('TERMINAL')}
              className={`w-full sm:w-auto px-8 py-3 rounded-3xl transition-all duration-300 uppercase tracking-[0.15em] font-bold text-sm border-2 flex items-center justify-center gap-2 relative z-10
                ${activeModule === 'TERMINAL' 
                  ? 'bg-[#00f3ff]/20 text-white border-[#00f3ff]/60 shadow-[0_0_20px_rgba(0,243,255,0.4)]' 
                  : 'text-slate-300 border-transparent hover:text-white hover:bg-[#00f3ff]/10 hover:border-[#00f3ff]/30'}`}
            >
              <span className="material-symbols-outlined text-lg opacity-70">terminal</span>
              CLI Interface
            </button>
          </div>

          {/* Module Output Render */}
          <div className="w-full flex-1 max-w-3xl mx-auto flex flex-col justify-end pb-8">
            <TypewriterPanel 
              key={`${activeModule}-${sequenceId}`} 
              lines={currentSequence} 
              isTerminal={activeModule === 'TERMINAL'} 
              onCommandSubmit={handleTerminalCommand}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default CommandCenterModal;
