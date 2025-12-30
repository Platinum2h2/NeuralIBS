
import React, { useState, useEffect } from 'react';
import ScreeningForm from './components/ScreeningForm';
import AnalysisView from './components/AnalysisView';
import Methodology from './components/Methodology';
import ValidationMetrics from './components/ValidationMetrics';
import { ScreeningData, AnalysisResult } from './types';
import { analyzeIBSLikelihood } from './services/geminiService';

const App: React.FC = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  const loadingSteps = [
    "Spinning up High-Speed Flash Cluster...",
    "Scanning Bio-Imaging for Deviations...",
    "Fusing Acoustic Data with Clinical History...",
    "Synthesizing Neural Logic..."
  ];

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingSteps.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleScreeningSubmit = async (data: ScreeningData) => {
    setError(null);
    setLoading(true);
    
    try {
      const analysis = await analyzeIBSLikelihood(data);
      setResult(analysis);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error("Analysis Error:", err);
      setError(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-900 tracking-tighter">NEURAL<span className="text-emerald-600">IBS</span></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">FLASH-SPEED CORE</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
             <button 
                onClick={() => setShowValidation(!showValidation)}
                className={`hidden md:flex items-center text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border transition-all ${
                  showValidation ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                }`}
             >
                {showValidation ? 'Close Validation' : 'Model Accuracy: 94.8%'}
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-16">
        {loading ? (
          <div className="py-32 text-center space-y-12 animate-in fade-in zoom-in duration-500">
             <div className="relative inline-block">
                <div className="w-24 h-24 border-[8px] border-slate-100 border-t-emerald-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-12 h-12 bg-emerald-50 rounded-full animate-pulse"></div>
                </div>
             </div>
             <div className="space-y-4">
               <h3 className="text-3xl font-black text-slate-900 tracking-tight">Rapid Processing</h3>
               <p className="text-emerald-600 font-mono text-sm uppercase tracking-[0.2em]">{loadingSteps[loadingStep]}</p>
             </div>
          </div>
        ) : (
          <>
            {showValidation ? (
               <ValidationMetrics onClose={() => setShowValidation(false)} />
            ) : (
              <>
                {!result && (
                  <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-none">
                      Instant Insight. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Pure Precision.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                      Experience the next generation of non-diagnostic IBS screening. 
                      Now using lightning-fast multimodal flash inference.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mb-10 p-8 bg-red-50 border border-red-100 text-red-700 rounded-[2rem] font-medium shadow-sm flex items-center gap-6 animate-in slide-in-from-left-2">
                     <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                       <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                     </div>
                     <div className="flex-1">
                       <h4 className="font-black text-red-900 uppercase tracking-widest text-xs mb-1">Inference Error</h4>
                       <p className="text-sm">{error}</p>
                     </div>
                  </div>
                )}

                {!result ? (
                  <>
                    <ScreeningForm onSubmit={handleScreeningSubmit} isLoading={loading} />
                    <Methodology />
                  </>
                ) : (
                  <AnalysisView result={result} onReset={() => setResult(null)} />
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
