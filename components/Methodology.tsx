
import React from 'react';

const Methodology: React.FC = () => {
  const deliverables = [
    {
      title: "System Architecture",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      content: "The system utilizes a Multi-Modal Fusion Architecture. It ingests longitudinal text (History), structured numeric data (Symptoms), and high-resolution imaging (Vision). The Neural Inference engine reconciles discrepancies between organic findings and functional symptoms."
    },
    {
      title: "Feature Engineering",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      content: "Features include: Rome IV Pain Frequency, Bristol Stool Morphology, Visceral Hypersensitivity Markers, Stress-Motility Correlation, and Imaging Morphology. Novel biomarkers like Acoustic BPM and VOC signatures provide objective proxies for gut dysbiosis."
    },
    {
      title: "Model Choice: Neural Pro-Image",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      content: "We utilize the Gemini 3 Pro engine as a high-fidelity reasoning core. It mimics a Gradient Boosting ensemble by weighting 'Neural Nodes' (Imaging vs. History) dynamically, allowing for explainable AI through detailed Logic Chains."
    }
  ];

  return (
    <div className="mt-32 space-y-16 border-t border-slate-200 pt-20">
      <div className="text-center">
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Clinical Methodology & Logic</h2>
        <p className="text-slate-500 mt-2 font-medium">Inside the Neural Gastro-Inference Engine</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {deliverables.map((d, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              {d.icon}
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">{d.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">{d.content}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-10 text-white">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <h3 className="text-xl font-black uppercase tracking-widest text-blue-400">Sample Patient Logic Flow</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-slate-500">STEP 01:</span>
                <span className="text-slate-300">Ingest Imaging: "Normal mucosa on endoscopy"</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-slate-500">STEP 02:</span>
                <span className="text-slate-300">Correlate History: "Pain improves after bowel movement"</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-slate-500">STEP 03:</span>
                <span className="text-slate-300">Weight Logic: "Functional pattern > Organic disease"</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-blue-400 font-bold">RESULT:</span>
                <span className="text-white">"High probability of IBS-D phenotype"</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-64 h-48 bg-slate-800 rounded-3xl border border-slate-700 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <path d="M10 50 Q 25 25, 40 50 T 70 50" fill="none" stroke="white" strokeWidth="1" className="animate-pulse" />
              </svg>
            </div>
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">Neural Weights Matrix</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Methodology;
