/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Users, 
  ShieldCheck, 
  AlertCircle, 
  ChevronRight, 
  RefreshCw,
  GraduationCap,
  Briefcase,
  Wallet,
  UserCircle
} from 'lucide-react';
import { getCompatibility, PersonDetails, RecommendationResult } from './services/recommenderService';

const initialPerson = (gender: "Male" | "Female"): PersonDetails => ({
  name: '',
  gender,
  age: 25,
  education: 4,
  employment: 0,
  income: 1,
  clan: '',
  autonomy: 4,
  parentalInfluence: 2,
  clanApproval: 2,
});

export default function App() {
  const [personA, setPersonA] = useState<PersonDetails>(initialPerson("Male"));
  const [personB, setPersonB] = useState<PersonDetails>(initialPerson("Female"));
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const res = await getCompatibility(personA, personB);
      setResult(res);
    } catch (error) {
      console.error("Calculation failed", error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setPersonA(initialPerson("Male"));
    setPersonB(initialPerson("Female"));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 px-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Heart className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Somaliland Spouse Recommender</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Based on MSc Research - Hargeisa 2026</p>
            </div>
          </div>
          {result && (
            <button 
              onClick={reset}
              className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              New Assessment
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-10 px-4">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-bold mb-4">Marital Compatibility Assessment</h2>
                <p className="text-slate-600">
                  This system uses machine learning to estimate compatibility based on cultural, 
                  socio-economic, and family dynamics specific to the Somaliland context.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PersonForm 
                  title="Person A" 
                  details={personA} 
                  setDetails={setPersonA} 
                  accentColor="indigo"
                />
                <PersonForm 
                  title="Person B" 
                  details={personB} 
                  setDetails={setPersonB} 
                  accentColor="rose"
                />
              </div>

              <div className="flex justify-center pt-8">
                <button
                  onClick={handleCalculate}
                  disabled={loading || !personA.name || !personB.name}
                  className={`
                    px-12 py-4 rounded-full font-bold text-lg shadow-xl transition-all flex items-center gap-3
                    ${loading || !personA.name || !personB.name 
                      ? 'bg-slate-300 cursor-not-allowed' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95'}
                  `}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-6 h-6 animate-spin" />
                      Analyzing Factors...
                    </>
                  ) : (
                    <>
                      Calculate Compatibility
                      <ChevronRight className="w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto"
            >
              <ResultsDashboard result={result} personA={personA} personB={personB} onReset={reset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 px-4 border-t border-slate-200 mt-20 bg-white">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            <strong>Ethical Disclaimer:</strong> This system is a decision-support tool based on statistical patterns. 
            It is not an automated matchmaker and should not replace family discussion, religious consultation, 
            or individual judgment.
          </p>
          <p className="text-xs text-slate-400">© 2026 Somaliland Spouse Recommendation System</p>
        </div>
      </footer>
    </div>
  );
}

function PersonForm({ title, details, setDetails, accentColor }: { 
  title: string, 
  details: PersonDetails, 
  setDetails: (d: PersonDetails) => void,
  accentColor: string 
}) {
  const update = (field: keyof PersonDetails, value: any) => {
    setDetails({ ...details, [field]: value });
  };

  const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none";
  const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5";

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-8">
        <div className={`p-2 rounded-lg bg-${accentColor}-100 text-${accentColor}-600`}>
          <UserCircle className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className={labelClass}>Full Name</label>
          <input 
            type="text" 
            value={details.name} 
            onChange={(e) => update('name', e.target.value)}
            placeholder="Enter name"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Age</label>
            <input 
              type="number" 
              value={details.age} 
              onChange={(e) => update('age', parseInt(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Gender</label>
            <select 
              value={details.gender} 
              onChange={(e) => update('gender', e.target.value)}
              className={inputClass}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Education Level</label>
          <select 
            value={details.education} 
            onChange={(e) => update('education', parseInt(e.target.value))}
            className={inputClass}
          >
            <option value={0}>No Formal Schooling</option>
            <option value={1}>Primary School</option>
            <option value={2}>Secondary School</option>
            <option value={3}>Diploma</option>
            <option value={4}>University Degree</option>
            <option value={5}>Postgraduate Degree</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Employment</label>
            <select 
              value={details.employment} 
              onChange={(e) => update('employment', parseInt(e.target.value))}
              className={inputClass}
            >
              <option value={0}>Employed</option>
              <option value={1}>Self-Employed</option>
              <option value={2}>Unemployed</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Income</label>
            <select 
              value={details.income} 
              onChange={(e) => update('income', parseInt(e.target.value))}
              className={inputClass}
            >
              <option value={0}>Low</option>
              <option value={1}>Middle</option>
              <option value={2}>High</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Clan Family</label>
          <input 
            type="text" 
            value={details.clan} 
            onChange={(e) => update('clan', e.target.value)}
            placeholder="e.g. Isaaq, Darod, etc."
            className={inputClass}
          />
        </div>

        <hr className="border-slate-100" />

        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            Cultural Factors (1-5)
          </h4>
          
          <SliderField 
            label="Spouse Choice Autonomy" 
            value={details.autonomy} 
            onChange={(v) => update('autonomy', v)} 
            desc="1 = Arranged, 5 = Personal Choice"
          />
          <SliderField 
            label="Parental Influence" 
            value={details.parentalInfluence} 
            onChange={(v) => update('parentalInfluence', v)} 
            desc="1 = Low, 5 = High Interference"
          />
          <SliderField 
            label="Clan Approval Requirement" 
            value={details.clanApproval} 
            onChange={(v) => update('clanApproval', v)} 
            desc="1 = Not Essential, 5 = Essential"
          />
        </div>
      </div>
    </div>
  );
}

function SliderField({ label, value, onChange, desc }: { label: string, value: number, onChange: (v: number) => void, desc: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-xs font-semibold text-slate-600">{label}</label>
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{value}</span>
      </div>
      <input 
        type="range" 
        min="1" 
        max="5" 
        value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
      <p className="text-[10px] text-slate-400 mt-1">{desc}</p>
    </div>
  );
}

function ResultsDashboard({ result, personA, personB, onReset }: { 
  result: RecommendationResult, 
  personA: PersonDetails, 
  personB: PersonDetails,
  onReset: () => void 
}) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getBgColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-50 border-emerald-100';
    if (score >= 70) return 'bg-blue-50 border-blue-100';
    if (score >= 50) return 'bg-amber-50 border-amber-100';
    return 'bg-rose-50 border-rose-100';
  };

  return (
    <div className="space-y-8">
      <div className={`rounded-3xl p-10 border-2 text-center ${getBgColor(result.score)}`}>
        <h3 className="text-xl font-bold text-slate-600 mb-2 uppercase tracking-widest">Compatibility Score</h3>
        <div className={`text-8xl font-black mb-4 ${getScoreColor(result.score)}`}>
          {Math.round(result.score)}%
        </div>
        <div className={`text-2xl font-bold ${getScoreColor(result.score)} mb-6`}>
          {result.category}
        </div>
        <p className="text-slate-700 max-w-2xl mx-auto leading-relaxed italic">
          "{result.explanation}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-emerald-600">
            <ShieldCheck className="w-5 h-5" />
            Key Strengths
          </h4>
          <ul className="space-y-4">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-600">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-sm leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-rose-600">
            <AlertCircle className="w-5 h-5" />
            Potential Concerns
          </h4>
          <ul className="space-y-4">
            {result.concerns.map((c, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-600">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span className="text-sm leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-indigo-900 rounded-2xl p-8 text-white">
        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Couple Profile Summary
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <ProfileStat icon={<GraduationCap />} label="Min. Education" value={getEduLabel(Math.min(personA.education, personB.education))} />
          <ProfileStat icon={<Briefcase />} label="Max. Vulnerability" value={getEmpLabel(Math.max(personA.employment, personB.employment))} />
          <ProfileStat icon={<Wallet />} label="Income Capacity" value={getIncLabel(Math.max(personA.income, personB.income))} />
          <ProfileStat icon={<Users />} label="Clan Alignment" value={personA.clan === personB.clan ? "Same Clan" : "Different Clans"} />
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-slate-200 text-slate-700 rounded-full font-bold hover:bg-slate-300 transition-all"
        >
          Start New Assessment
        </button>
      </div>
    </div>
  );
}

function ProfileStat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-indigo-300">
        {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

const getEduLabel = (v: number) => ["None", "Primary", "Secondary", "Diploma", "University", "Postgrad"][v];
const getEmpLabel = (v: number) => ["Employed", "Self-Employed", "Unemployed"][v];
const getIncLabel = (v: number) => ["Low", "Middle", "High"][v];
