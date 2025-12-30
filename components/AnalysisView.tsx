
import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface Props {
  result: AnalysisResult;
  onReset: () => void;
}

const AnalysisView: React.FC<Props> = ({ result, onReset }) => {
  const [activeTab, setActiveTab] = useState<'clinical' | 'patient'>('patient');

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];
  const weightData = [
    { name: 'Radiology', value: result.neuralWeights.radiologicalPattern },
    { name: 'Endoscopy', value: result.neuralWeights.endoscopicFindings },
    { name: 'History', value: result.neuralWeights.historicalContext },
    { name: 'Symptoms', value: result.neuralWeights.clinicalMarkers },
  ];

  const PatientReport = () => (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32">
      
      {/* Chapter 1: The Big Reveal */}
      <section className="relative">
        <div className="bg-gradient-to-br from-indigo-600 via-emerald-500 to-teal-500 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden min-h-[400px] flex items-center">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <svg className="w-64 h-64 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-16 relative z-10 w-full">
            <div className="relative">
              <div className="w-56 h-56 bg-white/20 backdrop-blur-2xl rounded-full flex flex-col items-center justify-center border-8 border-white/30 shadow-inner">
                <span className="text-7xl font-black tracking-tighter">{result.likelihoodScore}%</span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] mt-2 opacity-80">Match Rate</span>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white text-emerald-600 px-4 py-2 rounded-2xl font-black text-xs shadow-xl animate-bounce">
                Insight Found!
              </div>
            </div>
            <div className="flex-1 text-center md:text-left space-y-6">
              <span className="inline-block px-4 py-1.5 bg-black/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Chapter 1: The Overview</span>
              <h2 className="text-5xl font-black tracking-tighter leading-[1.1]">Your Gut Has A <br/>Unique Story to Tell.</h2>
              <p className="text-white/90 text-xl font-medium leading-relaxed max-w-xl">
                We've combined all your scan results, your daily feelings, and your history. 
                Your pattern is <span className="bg-white/20 px-3 py-1 rounded-lg font-black">{result.likelihoodScore}% similar</span> 
                to what we see in functional IBS cases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: The Science of Your Score (Ingredients) */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Chapter 2: The Breakdown</span>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">What makes up your {result.likelihoodScore}%?</h3>
          <p className="text-slate-500 font-medium">Think of these as the "ingredients" our AI found in your data.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: "📅", label: "Your History", val: result.neuralWeights.historicalContext, color: "bg-blue-50 text-blue-600", desc: "How long you've felt this way and the depth of your symptoms." },
            { icon: "🏥", label: "Clear Scans", val: result.neuralWeights.radiologicalPattern, color: "bg-purple-50 text-purple-600", desc: "The 'normal' results in your pictures actually point towards IBS." },
            { icon: "🧪", label: "Body Markers", val: result.neuralWeights.clinicalMarkers, color: "bg-emerald-50 text-emerald-600", desc: "Signs found in your breath, blood, or motility sound checks." },
            { icon: "🧘", label: "Daily Feelings", val: result.neuralWeights.endoscopicFindings, color: "bg-amber-50 text-amber-600", desc: "The correlation between your stress levels and gut reactions." }
          ].map((item, i) => (
            <div key={i} className="group bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-2 flex flex-col items-center text-center">
              <div className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">{item.label}</span>
              <div className="text-4xl font-black text-slate-900 mb-4">{item.val}%</div>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200 text-center">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
             Sum of all factors = {result.likelihoodScore}% Match Rate. This ensures a transparent and mathematically honest report.
           </p>
        </div>
      </section>

      {/* Chapter 3: The AI Logic Trail */}
      <section className="bg-slate-900 rounded-[3.5rem] p-12 text-white overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Chapter 3: The Logic Trail</span>
            <h3 className="text-4xl font-black tracking-tight">How our AI thought about you.</h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              We don't just give you a number. We follow a "trail of evidence" to see if your body matches the IBS pattern. Here is the logic we followed:
            </p>
            <div className="space-y-6">
              {result.logicChain.map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center font-black text-sm z-10 transition-transform group-hover:scale-125">
                      {i + 1}
                    </div>
                    {i < result.logicChain.length - 1 && <div className="w-1 h-full bg-slate-800 -mt-2"></div>}
                  </div>
                  <div className="pb-8">
                    <p className="text-lg font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-white/5 rounded-[3rem] border border-white/10 flex flex-col items-center justify-center p-12 text-center space-y-6">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-12 h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" /></svg>
              </div>
              <h4 className="text-xl font-black">Interpretation</h4>
              <p className="text-slate-400 text-sm leading-relaxed italic">
                "{result.interpretation}"
              </p>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Chapter 4: Your Roadmap */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Chapter 4: The Path Forward</span>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">What should you do now?</h3>
          <p className="text-slate-500 font-medium">Practical, friendly steps to help you feel better.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-blue-600 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-700"></div>
            <h4 className="text-2xl font-black mb-6 flex items-center">
              <span className="mr-4 text-3xl">👨‍⚕️</span> Clinical Recommendation
            </h4>
            <p className="text-xl text-blue-50 leading-relaxed font-medium mb-10">
              {result.recommendation}
            </p>
            <div className="flex gap-4">
               <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-50 transition-all active:scale-95">Download Doctor's PDF</button>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl flex flex-col justify-between">
            <div className="space-y-8">
              <h4 className="text-2xl font-black text-slate-900">Lifestyle Adjustments</h4>
              <div className="space-y-6">
                {[
                  { icon: "🥗", title: "Smart Eating", desc: "Try small, regular meals. Avoid things that make you feel gassy or bloated." },
                  { icon: "🧘", title: "Stress Check", desc: "Your gut reacts to your mind. Meditation or deep breathing can literally calm your stomach." },
                  { icon: "📝", title: "Keep a Journal", desc: "Note down when you feel the most pain. Is it after specific foods? Or long work days?" }
                ].map((tip, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-3xl">{tip.icon}</div>
                    <div className="space-y-1">
                      <p className="text-sm font-black text-slate-900 uppercase tracking-widest">{tip.title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={onReset} className="mt-12 w-full py-6 rounded-2xl bg-slate-900 text-white font-black text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group">
               <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
               GO BACK TO HOME
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const ClinicalReport = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* High-Level Fusion Card */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-3xl flex flex-col md:flex-row items-center gap-16 relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-64 h-64 rounded-full border-[16px] border-white/5 flex flex-col items-center justify-center">
            <span className="text-7xl font-black">{result.likelihoodScore}%</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mt-2">Pattern Alignment</span>
          </div>
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="128" cy="128" r="120" fill="none" stroke="#2563eb" strokeWidth="16" strokeDasharray={`${result.likelihoodScore * 7.53}, 753`} strokeLinecap="round" />
          </svg>
        </div>

        <div className="flex-1 space-y-6 relative z-10 text-center md:text-left">
          <div className="bg-blue-500/10 backdrop-blur-md px-4 py-2 rounded-full border border-blue-400/20 inline-block">
             <span className="text-[10px] font-black uppercase text-blue-300">Confidence Index: {result.confidenceScore}%</span>
          </div>
          <h2 className="text-4xl font-black leading-tight tracking-tighter">Multimodal Longitudinal <br/>Intelligence Synthesis</h2>
          <p className="text-slate-400 text-lg leading-relaxed">{result.interpretation}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Historical Insight Panel */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100">
           <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-widest">Logic Decomposition</h3>
           <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 mb-8">
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {result.historicalInsight}
              </p>
           </div>
           <div className="space-y-4">
              {result.logicChain.map((step, i) => (
                <div key={i} className="flex items-start gap-4 p-3 border-l-2 border-blue-500/20 pl-6">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">{i+1}</span>
                  <p className="text-xs text-slate-500 font-medium">{step}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Imaging & Weight Distribution */}
        <div className="space-y-10">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100">
            <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-widest">Contribution Breakdown</h3>
            <div className="h-48 flex items-center">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={weightData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                      {weightData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 space-y-3">
                {weightData.map((item, i) => (
                  <div key={i} className="flex items-center text-[10px] font-black uppercase text-slate-400">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[i] }}></div>
                    <span className="flex-1 truncate">{item.name}</span>
                    <span className="text-slate-900 ml-2">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100">
            <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-widest">Biological findings</h3>
            <div className="space-y-3">
              {result.imagingFindings.map((finding, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-900">{finding.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${
                    finding.severity === 'abnormal' ? 'bg-red-100 text-red-600' : 
                    finding.severity === 'notable' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {finding.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 rounded-[3rem] p-12 text-white shadow-2xl flex flex-col items-center text-center gap-8">
        <h3 className="text-3xl font-black uppercase tracking-widest">Expert Directive</h3>
        <p className="text-xl text-blue-50 leading-relaxed font-medium max-w-3xl">
          {result.recommendation}
        </p>
        <div className="flex gap-4">
           <button onClick={onReset} className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-blue-50 transition-colors">Return to Diagnostic Intake</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12 pb-20 relative">
      
      {/* Top Navigation / Reset Bar */}
      <div className="flex items-center justify-between bg-white/60 backdrop-blur-xl p-4 rounded-3xl border border-slate-200 sticky top-24 z-40 shadow-sm">
        <button onClick={onReset} className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to start
        </button>
        
        <div className="bg-slate-200 p-1 rounded-full flex items-center">
          <button
            onClick={() => setActiveTab('patient')}
            className={`px-8 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'patient' ? 'bg-white text-emerald-600 shadow-sm scale-105' : 'text-slate-500'
            }`}
          >
            👤 Your Story
          </button>
          <button
            onClick={() => setActiveTab('clinical')}
            className={`px-8 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'clinical' ? 'bg-slate-900 text-white shadow-sm scale-105' : 'text-slate-500'
            }`}
          >
            🩺 Medical Data
          </button>
        </div>

        <div className="hidden md:block">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Report ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
        </div>
      </div>

      {activeTab === 'patient' ? <PatientReport /> : <ClinicalReport />}
    </div>
  );
};

export default AnalysisView;
