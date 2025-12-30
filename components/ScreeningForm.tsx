
import React, { useState, useRef } from 'react';
import { ScreeningData, BristolType, ImagingNode } from '../types';
import BristolSelector from './BristolSelector';

const SAMPLE_SCENARIOS = {
  "Inflammatory Mimicry": {
    age: '35-44',
    sex: 'male',
    painFrequency: 7,
    painDurationMonths: 3,
    bloatingSeverity: 8,
    stoolType: 7 as BristolType,
    stressLevel: 2,
    dietQuality: 'General/Mixed',
    acousticFrequency: 45,
    breathVocSignature: 'Hydrogen Sulfide (Sulfuric)',
    pastDiagnoses: 'High suspicion for Crohn\'s Disease. Elevated Calprotectin (1200+). Nocturnal bowel movements. Family history of IBD.',
    previousProcedures: ['Colonoscopy', 'Calprotectin Lab'],
    medications: 'Iron supplements',
    imagingNodes: [
      { type: 'lab_report', data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', mimeType: 'image/png' }
    ]
  },
  "Cyclic Adhesion Pattern": {
    age: '25-34',
    sex: 'female',
    painFrequency: 6,
    painDurationMonths: 48,
    bloatingSeverity: 9,
    stoolType: 4 as BristolType,
    stressLevel: 4,
    dietQuality: 'Low FODMAP (Strict)',
    acousticFrequency: 12,
    breathVocSignature: 'Standard',
    pastDiagnoses: 'Stage IV Endometriosis. Pain is strictly catamenial (cyclic). MRI showed bowel adhesions.',
    previousProcedures: ['Laparoscopy', 'MRI Pelvis'],
    medications: 'Ibuprofen 800mg',
    imagingNodes: [
      { type: 'radiology', data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', mimeType: 'image/png' }
    ]
  },
  "Methanogenic Dysbiosis": {
    age: '18-24',
    sex: 'female',
    painFrequency: 3,
    painDurationMonths: 12,
    bloatingSeverity: 10,
    stoolType: 5 as BristolType,
    stressLevel: 6,
    dietQuality: 'High fiber',
    acousticFrequency: 30,
    breathVocSignature: 'Methane Dominant (Musty/Earthy)',
    pastDiagnoses: 'Positive Breath Test for IMO (Intestinal Methanogen Overgrowth). Profound bloating regardless of motility.',
    previousProcedures: ['Breath Test'],
    medications: 'Rifaximin',
    imagingNodes: [
      { type: 'morphology', data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', mimeType: 'image/png' }
    ]
  },
  "Enteric Nervous Tension": {
    age: '45-54',
    sex: 'female',
    painFrequency: 4,
    painDurationMonths: 24,
    bloatingSeverity: 6,
    stoolType: 2 as BristolType,
    stressLevel: 7,
    dietQuality: 'General/Mixed',
    acousticFrequency: 8,
    breathVocSignature: 'Neutral / Baseline',
    pastDiagnoses: 'Moderate IBS suspicion. Symptoms flare during work stress. Normal blood work. Negative for Celiac.',
    previousProcedures: ['Celiac Panel'],
    medications: 'Occasional fiber',
    imagingNodes: [
      { type: 'endoscopy', data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', mimeType: 'image/png' }
    ]
  },
  "Neuro-Motility Signature": {
    age: '25-34',
    sex: 'male',
    painFrequency: 5,
    painDurationMonths: 36,
    bloatingSeverity: 5,
    stoolType: 6 as BristolType,
    stressLevel: 9,
    dietQuality: 'General/Mixed',
    acousticFrequency: 25,
    breathVocSignature: 'Neutral / Baseline',
    pastDiagnoses: 'Rome IV Diagnostic match. Normal Colonoscopy. Visceral hypersensitivity. Pain relieved by defecation.',
    previousProcedures: ['Colonoscopy'],
    medications: 'Bentyl',
    imagingNodes: [
      { type: 'endoscopy', data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', mimeType: 'image/png' }
    ]
  },
  "Cellular Post-Viral Shift": {
    age: '18-24',
    sex: 'female',
    painFrequency: 6,
    painDurationMonths: 9,
    bloatingSeverity: 8,
    stoolType: 6 as BristolType,
    stressLevel: 8,
    dietQuality: 'Low FODMAP',
    acousticFrequency: 35,
    breathVocSignature: 'Hydrogen Dominant (Sweet/Fruity)',
    pastDiagnoses: 'Post-Infectious IBS. Clear Gastroenteritis onset. All scans and biopsy markers are perfect (Normal Architecture).',
    previousProcedures: ['Gastric Emptying', 'Endoscopy'],
    medications: 'Probiotics',
    imagingNodes: [
      { type: 'lab_report', data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', mimeType: 'image/png' },
      { type: 'endoscopy', data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', mimeType: 'image/png' }
    ]
  },
  "Primary Visceral Loop": {
    age: '35-44',
    sex: 'female',
    painFrequency: 7,
    painDurationMonths: 120,
    bloatingSeverity: 9,
    stoolType: 1 as BristolType,
    stressLevel: 10,
    dietQuality: 'General/Mixed',
    acousticFrequency: 2,
    breathVocSignature: 'Neutral / Baseline',
    pastDiagnoses: 'Severe Chronic IBS Pattern. 10 years of consistent functional symptoms. 3x Clean Colonoscopies with ZERO inflammation. Negative for all organic disease.',
    previousProcedures: ['Colonoscopy', 'Endoscopy', 'CT Scan', 'Abdominal Ultrasound'],
    medications: 'Linzess, Prozac',
    imagingNodes: [
      { type: 'radiology', data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', mimeType: 'image/png' },
      { type: 'endoscopy', data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', mimeType: 'image/png' }
    ]
  }
};

interface Props {
  onSubmit: (data: ScreeningData) => void;
  isLoading: boolean;
}

const ScreeningForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ScreeningData>({
    age: '25-34',
    sex: 'female',
    painFrequency: 2,
    painDurationMonths: 6,
    bloatingSeverity: 5,
    stoolType: 4,
    stressLevel: 5,
    dietQuality: 'General/Mixed',
    imagingNodes: [],
    acousticFrequency: 12,
    breathVocSignature: 'Neutral / Baseline',
    pastDiagnoses: '',
    previousProcedures: [],
    medications: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingType, setUploadingType] = useState<ImagingNode['type'] | null>(null);

  const injectScenario = (key: keyof typeof SAMPLE_SCENARIOS) => {
    setFormData(prev => ({ ...prev, ...SAMPLE_SCENARIOS[key] }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: ImagingNode['type']) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setFormData(prev => ({
          ...prev,
          imagingNodes: [
            ...prev.imagingNodes.filter(n => n.type !== type),
            { data: base64String, mimeType: file.type, type }
          ]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcedureToggle = (proc: string) => {
    setFormData(prev => ({
      ...prev,
      previousProcedures: prev.previousProcedures.includes(proc)
        ? prev.previousProcedures.filter(p => p !== proc)
        : [...prev.previousProcedures, proc]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  return (
    <div className="space-y-12">
      <div className="bg-slate-900 border border-slate-700 rounded-[2rem] p-8 flex flex-col items-center justify-between gap-8 animate-in fade-in slide-in-from-top-4 shadow-2xl">
        <div className="text-center">
          <h4 className="text-sm font-black text-emerald-400 uppercase tracking-[0.3em] flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
            Biometric Archetype Injector
          </h4>
          <p className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-widest">Select Clinical Phenotype</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 w-full">
          {(Object.keys(SAMPLE_SCENARIOS) as Array<keyof typeof SAMPLE_SCENARIOS>).map(key => (
            <button 
              key={key}
              type="button"
              onClick={() => injectScenario(key)}
              className="px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-[10px] font-black uppercase text-slate-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-all shadow-sm active:scale-95 flex flex-col items-center gap-1 min-w-[160px]"
            >
              <span>{key}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-12 pb-20">
        <section className="bg-slate-900 rounded-[2.5rem] p-10 border border-slate-800 shadow-2xl relative">
          <h3 className="text-2xl font-black text-white mb-8 flex items-center relative z-10">
            <span className="w-10 h-10 bg-blue-600 rounded-xl mr-4 flex items-center justify-center text-sm shadow-lg shadow-blue-500/20">01</span>
            Clinical Diagnostic Repository
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 relative z-10">
            {(['radiology', 'endoscopy', 'morphology', 'lab_report'] as const).map((type) => {
              const node = formData.imagingNodes.find(n => n.type === type);
              return (
                <div key={type} onClick={() => { setUploadingType(type); fileInputRef.current?.click(); }} className={`relative aspect-square rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${node ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 bg-slate-800/30 hover:border-slate-500'}`}>
                  {node ? (
                    <div className="absolute inset-0 p-2">
                      <img src={`data:${node.mimeType};base64,${node.data}`} className="w-full h-full object-cover rounded-2xl opacity-40 grayscale" alt={type} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest">{type.replace('_', ' ')}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{type.replace('_', ' ')}</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="space-y-6 relative z-10">
            <textarea name="pastDiagnoses" value={formData.pastDiagnoses} onChange={handleChange} placeholder="Detailed Clinical History..." className="w-full p-6 bg-slate-800/50 border border-slate-700 rounded-[2rem] text-white text-sm outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] placeholder:text-slate-600" />
            <div className="flex flex-wrap gap-3">
              {['Colonoscopy', 'Endoscopy', 'CT Scan', 'Abdominal Ultrasound', 'Breath Test', 'Gastric Emptying', 'Anorectal Manometry', 'Calprotectin Lab'].map(proc => (
                <button key={proc} type="button" onClick={() => handleProcedureToggle(proc)} className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase transition-all border ${formData.previousProcedures.includes(proc) ? 'bg-blue-600 border-blue-600 text-white shadow-xl' : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500'}`}>{proc}</button>
              ))}
            </div>
          </div>
          <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => uploadingType && handleImageUpload(e, uploadingType)} />
        </section>

        <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden relative">
          <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center">
            <span className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl mr-4 flex items-center justify-center text-sm">02</span>
            Acoustic & VOC Array
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <input type="range" name="acousticFrequency" min="0" max="60" value={formData.acousticFrequency} onChange={handleChange} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                <span>Quiet</span>
                <span className="text-indigo-600">{formData.acousticFrequency} BPM</span>
                <span>Hyper</span>
              </div>
              <select name="breathVocSignature" value={formData.breathVocSignature} onChange={handleChange} className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700">
                <option>Neutral / Baseline</option>
                <option>Hydrogen Dominant (Sweet/Fruity)</option>
                <option>Methane Dominant (Musty/Earthy)</option>
                <option>Hydrogen Sulfide (Sulfuric)</option>
              </select>
            </div>
            <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 text-xs text-indigo-700 leading-relaxed">Correlates bowel sound frequency with VOC signatures for functional detection.</div>
          </div>
        </section>

        <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl">
          <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center">
            <span className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl mr-4 flex items-center justify-center text-sm">03</span>
            Current Symptom Phenotype
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <input type="number" name="painFrequency" min="0" max="7" value={formData.painFrequency} onChange={handleChange} className="w-full p-5 bg-slate-50 border border-slate-200 rounded-[1.5rem] font-bold" placeholder="Pain Days/Week" />
            <input type="text" name="medications" value={formData.medications} onChange={handleChange} placeholder="Active Meds..." className="w-full p-5 bg-slate-50 border border-slate-200 rounded-[1.5rem] font-bold" />
          </div>
          <BristolSelector value={formData.stoolType} onChange={(val) => setFormData(prev => ({...prev, stoolType: val}))} />
        </section>

        <div className="sticky bottom-10 flex justify-center z-50">
          <button type="submit" disabled={isLoading} className={`px-20 py-7 rounded-full bg-slate-900 text-white font-black shadow-2xl transition-all flex items-center group overflow-hidden relative ${isLoading ? 'opacity-70' : 'hover:scale-105 active:scale-95'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10">{isLoading ? 'Synthesizing...' : 'RUN NEURAL CLINICAL FUSION'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScreeningForm;
