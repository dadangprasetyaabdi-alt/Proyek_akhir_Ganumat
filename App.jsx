import React, { useState, useEffect } from 'react';
import menyapa from './assets/menyapa.png';
import menunjuk from './assets/Menunjuk.png';
import mendapatkanIde from './assets/mendapatkan ide.png';
import apresiasi from './assets/apresiasi.png';
import selamat from './assets/selamat.png';
import {
  Sparkles,
  Trophy,
  BookOpen,
  Star,
  RefreshCw,
  Eye,
  EyeOff,
  Lock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Compass,
  Maximize2,
  Move,
  ShieldAlert,
  Award,
  FlipHorizontal,
  Layers,
  Grid,
  ChevronRight,
  User,
  LogOut,
  HelpCircle,
  Check,
  RotateCcw,
  ZoomIn,
  Info,
  X,
  ChevronLeft,
  Brain,
  Target,
  Flame,
  Smile,
  Play,
  Lightbulb,
  FileText,
  CheckSquare,
  Smartphone,
  MapPin,
  Camera,
  Compass as CompassIcon,
  HelpCircle as QuestionIcon
} from 'lucide-react';

// ==========================================
// 1. MASKOT BURUNG HANTU ("SI OWI") SVG
// ==========================================
const OwlMascot = ({
  expression = 'happy',
  pose,
  size = 80,
  className = ""
}) => {
  const mascotImages = {
    menyapa,
    menunjuk,
    ide: mendapatkanIde,
    apresiasi,
    selamat,
  };

  // Menjaga kompatibilitas dengan pemanggilan komponen versi lama.
  const selectedPose = pose || (
    expression === 'winking' ? 'ide' :
    expression === 'cheering' ? 'selamat' :
    'menyapa'
  );

  const imageSrc = mascotImages[selectedPose] || menyapa;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size, flexShrink: 0 }}
    >
      <img
        src={imageSrc}
        alt={`Si Owi - ${selectedPose}`}
        className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 hover:scale-110"
        draggable="false"
      />
    </div>
  );
};

// ==========================================
// 2. MAIN APP COMPONENT & GLOBAL STATE
// ==========================================
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('MathMaster');

  const [userXP, setUserXP] = useState(0);
  const [completedModules, setCompletedModules] = useState([]);

  const [activeClass, setActiveClass] = useState('Kelas 9');
  const [activeTopic, setActiveTopic] = useState('transformasi');
  const [selectedModule, setSelectedModule] = useState(null); // null | 'translasi' | 'refleksi' | 'rotasi' | 'kekongruenan' | 'dilatasi' | 'kuis'
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!usernameInput.trim()) {
      showToast('⚠️ Silakan masukkan nama pengguna Anda!');
      return;
    }
    const cleanName = usernameInput.trim().replace(/^@/, '');
    setUsername(cleanName);
    setIsLoggedIn(true);
    showToast(`🎉 Selamat datang kembali, ${cleanName}! Siap belajar matematika?`);
  };

  const markModuleCompleted = (modId, xpReward = 20) => {
    if (!completedModules.includes(modId)) {
      setCompletedModules((prev) => [...prev, modId]);
      setUserXP((prev) => prev + xpReward);
      showToast(`🌟 Modul ${modId.toUpperCase()} Selesai! +${xpReward} XP diperoleh!`);
    }
  };

  const starsUnlocked = Math.min(4, Math.floor(userXP / 25));

  // ==========================================
  // PAGE 1: ALUR LOGIN SCREEN
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-sky-200 relative z-10 transition-all">
          
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-6 text-center text-white relative overflow-hidden">
            <div className="flex justify-center mb-2">
              <OwlMascot expression="happy" size={90} />
            </div>

            <h1 className="text-3xl font-black tracking-wider text-yellow-300 drop-shadow-md">
              GANUMAT
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 mt-1 font-medium">
              Platform Pembelajaran Matematika Interaktif SMP
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-700/50 text-sky-100 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
              <span>Belajar Matematika Seru & Gamified</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5 bg-white">
            <div className="text-center mb-2">
              <h2 className="text-xl font-bold text-slate-800">Masuk ke Akun Kamu</h2>
              <p className="text-xs text-slate-500">Mulai petualangan matematikamu sekarang!</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 tracking-wide flex items-center gap-1.5">
                <User className="w-4 h-4 text-sky-500" /> Nama Pengguna / Username
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Budi_MathKing"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-sky-50/50 border-2 border-sky-100 text-slate-800 text-sm font-semibold focus:outline-none focus:border-sky-500 focus:bg-white transition-all placeholder-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 tracking-wide flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-sky-500" /> Kata Sandi / Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Masukkan kata sandi"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 rounded-2xl bg-sky-50/50 border-2 border-sky-100 text-slate-800 text-sm font-semibold focus:outline-none focus:border-sky-500 focus:bg-white transition-all placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-extrabold text-base shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <span>MASUK SEKARANG</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 text-center">
              <button
                type="button"
                onClick={() => setAdminModalOpen(true)}
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 hover:underline transition-colors"
              >
                Lupa Kata Sandi?
              </button>
              <button
                type="button"
                onClick={() => setAdminModalOpen(true)}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline transition-colors"
              >
                Belum punya akun? Daftar sekarang!
              </button>
            </div>
          </form>
        </div>

        {adminModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border-4 border-sky-300">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-amber-300">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-800 mb-2">Akses Kelola Akun</h3>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200 mb-5 text-left font-medium">
                Pendaftaran akun baru dan riset kata sandi dikelola oleh pengajar. Silakan hubungi <strong>Administrator / Guru Pengampu</strong> untuk mendapatkan akses akun Anda.
              </p>
              <button
                onClick={() => setAdminModalOpen(false)}
                className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all"
              >
                Mengerti
              </button>
            </div>
          </div>
        )}

        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-full shadow-2xl border border-sky-400 flex items-center gap-2 z-50 animate-bounce">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // PAGE 2: MAIN DASHBOARD OR FULL-SCREEN MODULE VIEW
  // ==========================================
  if (selectedModule) {
    return (
      <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
        {/* Full-screen Module Top Header */}
        <header className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white sticky top-0 z-40 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => setSelectedModule(null)}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Kembali ke Dashboard Utama</span>
            </button>

            <div className="text-center hidden md:block">
              <h2 className="text-lg font-black text-yellow-300">
                {selectedModule === 'translasi' && 'Modul 1: Translasi (Pergeseran)'}
                {selectedModule === 'refleksi' && 'Modul 2: Refleksi (Pencerminan)'}
                {selectedModule === 'rotasi' && 'Modul 3: Rotasi (Perputaran)'}
                {selectedModule === 'kekongruenan' && 'Modul 4: Kekongruenan'}
                {selectedModule === 'dilatasi' && 'Modul 5: Dilatasi (Pembesaran/Pengecilan)'}
                {selectedModule === 'kuis' && 'Modul 6: Evaluasi Utama 25 Soal Berjenjang'}
              </h2>
              <p className="text-xs text-sky-100">Matematika SMP Kelas 9 - Pembelajaran Kontekstual Utuh</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-yellow-400 text-slate-900 px-3 py-1.5 rounded-full">
                @{username}
              </span>
            </div>
          </div>
        </header>

        {/* Full-screen Main Content Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
          {selectedModule === 'translasi' && (
            <FullScreenModuleContainer
              topicTitle="Translasi (Pergeseran)"
              onCompleteModule={() => markModuleCompleted('translasi', 20)}
              theoryContent={<TranslasiTheory />}
              simulationContent={<TranslasiSimulation />}
              exampleContent={<TranslasiExample />}
              summaryQuizContent={<TranslasiSummaryQuiz onComplete={() => markModuleCompleted('translasi', 20)} />}
            />
          )}

          {selectedModule === 'refleksi' && (
            <FullScreenModuleContainer
              topicTitle="Refleksi (Pencerminan)"
              onCompleteModule={() => markModuleCompleted('refleksi', 20)}
              theoryContent={<RefleksiTheory />}
              simulationContent={<RefleksiSimulation />}
              exampleContent={<RefleksiExample />}
              summaryQuizContent={<RefleksiSummaryQuiz onComplete={() => markModuleCompleted('refleksi', 20)} />}
            />
          )}

          {selectedModule === 'rotasi' && (
            <FullScreenModuleContainer
              topicTitle="Rotasi (Perputaran)"
              onCompleteModule={() => markModuleCompleted('rotasi', 20)}
              theoryContent={<RotasiTheory />}
              simulationContent={<RotasiSimulation />}
              exampleContent={<RotasiExample />}
              summaryQuizContent={<RotasiSummaryQuiz onComplete={() => markModuleCompleted('rotasi', 20)} />}
            />
          )}

          {selectedModule === 'kekongruenan' && (
            <FullScreenModuleContainer
              topicTitle="Kekongruenan Bangun Datar"
              onCompleteModule={() => markModuleCompleted('kekongruenan', 20)}
              theoryContent={<KekongruenanTheory />}
              simulationContent={<KekongruenanSimulation />}
              exampleContent={<KekongruenanExample />}
              summaryQuizContent={<KekongruenanSummaryQuiz onComplete={() => markModuleCompleted('kekongruenan', 20)} />}
            />
          )}

          {selectedModule === 'dilatasi' && (
            <FullScreenModuleContainer
              topicTitle="Dilatasi (Pembesaran / Pengecilan)"
              onCompleteModule={() => markModuleCompleted('dilatasi', 20)}
              theoryContent={<DilatasiTheory />}
              simulationContent={<DilatasiSimulation />}
              exampleContent={<DilatasiExample />}
              summaryQuizContent={<DilatasiSummaryQuiz onComplete={() => markModuleCompleted('dilatasi', 20)} />}
            />
          )}

          {selectedModule === 'kuis' && (
            <Quiz25Module onCompleteQuiz={() => markModuleCompleted('kuis', 50)} />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col pb-12">
      
      {/* Top Header & Navigasi */}
      <header className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-2xl shadow-md">
              <OwlMascot expression="happy" size={38} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-wider text-yellow-300 drop-shadow">GANUMAT</span>
                <span className="bg-yellow-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-md uppercase">SMP</span>
              </div>
              <p className="text-[10px] text-sky-100 font-medium">Platform Pembelajaran Matematika Kontekstual</p>
            </div>
          </div>

          <div className="flex items-center bg-sky-800/40 p-1.5 rounded-2xl backdrop-blur-sm border border-sky-400/30">
            {['Kelas 7', 'Kelas 8', 'Kelas 9'].map((cls) => {
              const isActive = activeClass === cls;
              return (
                <button
                  key={cls}
                  onClick={() => {
                    if (cls === 'Kelas 7' || cls === 'Kelas 8') {
                      showToast('Maaf, materi untuk kelas ini belum tersedia untuk sekarang.');
                    } else {
                      setActiveClass(cls);
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    isActive
                      ? 'bg-yellow-400 text-slate-900 shadow-lg scale-105 border border-yellow-200'
                      : 'text-sky-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cls}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-sky-900/50 px-3 py-1.5 rounded-2xl border border-sky-400/40">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 p-0.5 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-extrabold text-white">@{username}</div>
                <div className="text-[10px] text-yellow-300 font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-yellow-400" /> {userXP} XP
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsLoggedIn(false);
                showToast('Kamu telah keluar dari akun.');
              }}
              className="p-2 bg-sky-700/60 hover:bg-red-500 rounded-xl text-white transition-colors"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex-1 w-full space-y-6">
        
        {/* Header Banner & Tracker Kemajuan */}
        <div className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border-2 border-sky-300">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-lg">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-yellow-300 text-xs font-extrabold backdrop-blur-md">
                <Trophy className="w-3.5 h-3.5" /> Modul Matematika Berbasis Kehidupan Nyata
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Ayo Semangat Belajarnya, <span className="text-yellow-300">@{username}</span>! 🚀
              </h2>
              <p className="text-xs sm:text-sm text-sky-100 font-medium leading-relaxed">
                Pelajari materi bertahap: Cerita Apersepsi Kehidupan ➔ Grafik Interaktif ➔ Pembahasan ➔ Evaluasi 25 Soal!
              </p>
            </div>

            <div className="w-full md:w-80 bg-slate-900/40 p-4 rounded-2xl backdrop-blur-md border border-white/20 space-y-2.5">
              <div className="flex justify-between items-center text-xs font-black">
                <span className="text-sky-200">KEMAJUAN BELAJAR</span>
                <span className="text-yellow-300">{userXP} / 100 XP</span>
              </div>

              <div className="w-full bg-slate-800/80 rounded-full h-3.5 p-0.5 border border-sky-300/30 relative">
                <div
                  className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 h-full rounded-full transition-all duration-700 shadow-md"
                  style={{ width: `${Math.min(100, (userXP / 150) * 100)}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-bold text-sky-100 pt-1">
                <span className={userXP >= 0 ? 'text-yellow-300 font-extrabold' : ''}>Pemula</span>
                <span className={userXP >= 40 ? 'text-yellow-300 font-extrabold' : ''}>Pembelajar</span>
                <span className={userXP >= 80 ? 'text-yellow-300 font-extrabold' : ''}>Jagoan</span>
                <span className={completedModules.includes('kuis') ? 'text-yellow-300 font-black text-xs animate-bounce bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full shadow' : 'opacity-60'}>
                  👑 LEGENDA
                </span>
              </div>

              <div className="flex justify-center items-center gap-2 pt-1 border-t border-white/10">
                {[1, 2, 3, 4].map((starIdx) => {
                  const isUnlocked = starsUnlocked >= starIdx;
                  return (
                    <div
                      key={starIdx}
                      className={`p-1.5 rounded-full transition-transform ${
                        isUnlocked
                          ? 'bg-amber-400 text-slate-900 scale-110 shadow-lg shadow-yellow-400/50'
                          : 'bg-white/10 text-white/30'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${isUnlocked ? 'fill-slate-900' : ''}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar & Area Konten Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          <div className="lg:col-span-1 bg-white rounded-3xl p-5 shadow-lg border-2 border-sky-100 space-y-4">
            <div className="flex items-center gap-2 text-slate-800 font-black text-sm pb-3 border-b border-slate-100">
              <BookOpen className="w-4 h-4 text-sky-500" />
              <span>DAFTAR TOPIK KELAS 9</span>
            </div>

            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {[
                { id: 'transformasi', title: '1. Transformasi Geometri', active: true, count: '5 Modul Full + 25 Soal' },
                { id: 'persamaan', title: '2. Persamaan Kuadrat', active: false, count: 'Segera Hadir' },
                { id: 'kesebangunan', title: '3. Kesebangunan', active: false, count: 'Segera Hadir' },
                { id: 'bangun_ruang', title: '4. Bangun Ruang Sisi Lengkung', active: false, count: 'Segera Hadir' },
              ].map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => {
                    if (!topic.active) {
                      showToast('Materi ini akan segera hadir!');
                    } else {
                      setActiveTopic(topic.id);
                    }
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all border flex items-center justify-between ${
                    topic.active
                      ? 'bg-sky-500 text-white border-sky-500 shadow-md font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-sky-50'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold leading-snug">{topic.title}</div>
                    <div className={`text-[10px] ${topic.active ? 'text-sky-100' : 'text-slate-400'}`}>
                      {topic.count}
                    </div>
                  </div>
                  {topic.active ? (
                    <ChevronRight className="w-4 h-4 text-yellow-300" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              ))}
            </div>

            <div className="bg-sky-50 rounded-2xl p-3 border border-sky-100 flex items-center gap-3">
              <OwlMascot pose="ide" size={75} />
              <p className="text-[11px] text-sky-900 font-medium leading-tight">
                <strong>Tips Owi:</strong> Klik salah satu materi untuk membukanya secara Full Screen!
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <span>Transformasi Geometri</span>
                  <span className="text-xs bg-sky-100 text-sky-700 font-bold px-2.5 py-0.5 rounded-full">
                    5 Modul + 25 Evaluasi
                  </span>
                </h3>
                <p className="text-xs text-slate-500">Pilih sub-materi di bawah ini untuk belajar dengan tampilan layar penuh!</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <ModuleCard
                title="1. Translasi (Pergeseran)"
                desc="Apersepsi Joystick Game & Bidak Catur ➔ Simulasi Vektor ➔ Contoh Soal ➔ Cek Pemahaman"
                icon={<Move className="w-6 h-6 text-sky-500" />}
                isDone={completedModules.includes('translasi')}
                onClick={() => setSelectedModule('translasi')}
              />

              <ModuleCard
                title="2. Refleksi (Pencerminan)"
                desc="Apersepsi Bercermin & Selfie HP ➔ Grafik Cermin ➔ Langkah Pembahasan ➔ Cek Pemahaman"
                icon={<FlipHorizontal className="w-6 h-6 text-indigo-500" />}
                isDone={completedModules.includes('refleksi')}
                onClick={() => setSelectedModule('refleksi')}
              />

              <ModuleCard
                title="3. Rotasi (Perputaran)"
                desc="Apersepsi Wahana Bianglala & Jarum Jam ➔ Trajektori Putar ➔ Contoh Soal ➔ Cek Pemahaman"
                icon={<RefreshCw className="w-6 h-6 text-amber-500" />}
                isDone={completedModules.includes('rotasi')}
                onClick={() => setSelectedModule('rotasi')}
              />

              <ModuleCard
                title="4. Kekongruenan"
                desc="Apersepsi Cetakan Kue & Ubin Lantai ➔ Simulasi Tumpuk ➔ Pembuktian ➔ Cek Pemahaman"
                icon={<Layers className="w-6 h-6 text-emerald-500" />}
                isDone={completedModules.includes('kekongruenan')}
                onClick={() => setSelectedModule('kekongruenan')}
              />

              <ModuleCard
                title="5. Dilatasi (Pembesaran/Pengecilan)"
                desc="Apersepsi Zoom Foto HP & Proyektor Bioskop ➔ Simulasi Skala k ➔ Pembahasan ➔ Cek Pemahaman"
                icon={<Maximize2 className="w-6 h-6 text-rose-500" />}
                isDone={completedModules.includes('dilatasi')}
                onClick={() => setSelectedModule('dilatasi')}
              />

              {/* Special Kuis Card */}
              <div
                onClick={() => setSelectedModule('kuis')}
                className="bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 rounded-3xl p-5 text-slate-900 shadow-xl border-2 border-yellow-200 hover:scale-[1.03] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-slate-900 text-yellow-400 rounded-2xl shadow-md">
                      <Trophy className="w-6 h-6 animate-bounce" />
                    </div>
                    {completedModules.includes('kuis') ? (
                      <span className="bg-slate-900 text-yellow-300 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> LATIHAN SELESAI
                      </span>
                    ) : (
                      <span className="bg-slate-900/20 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                        25 SOAL BERJENJANG
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-black text-slate-900 pt-1">
                    6. Latihan Soal Evaluasi Utama (25 Soal)
                  </h4>
                  <p className="text-xs text-slate-800 font-medium leading-relaxed">
                    Uji kemampuanmu dari tingkat Mudah, Sedang, hingga HOTS secara komprehensif!
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 underline">MULAI EVALUASI</span>
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-yellow-400 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-2xl border-2 border-yellow-400 flex items-center gap-2.5 z-50 animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

// ==========================================
// FULL-SCREEN MODULE CONTAINER
// ==========================================
function FullScreenModuleContainer({
  topicTitle,
  theoryContent,
  simulationContent,
  exampleContent,
  summaryQuizContent,
  onCompleteModule
}) {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, label: '1. Apersepsi & Konsep', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 2, label: '2. Simulasi Grafik Interaktif', icon: <Grid className="w-4 h-4" /> },
    { id: 3, label: '3. Contoh Soal Pembahasan', icon: <FileText className="w-4 h-4" /> },
    { id: 4, label: '4. Ringkasan & Cek Pemahaman', icon: <CheckSquare className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Step Stepper Header Navigation Bar */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2.5 border ${
                  isActive
                    ? 'bg-sky-500 text-white border-sky-500 shadow-md scale-102'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-sky-50'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${isActive ? 'bg-white/20' : 'bg-slate-200/60'}`}>
                  {step.icon}
                </div>
                <span className="truncate">{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Full-Screen Display Area */}
      <div className="min-h-[500px]">
        {currentStep === 1 && theoryContent}
        {currentStep === 2 && simulationContent}
        {currentStep === 3 && exampleContent}
        {currentStep === 4 && summaryQuizContent}
      </div>

      {/* Bottom Step Control Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 bg-white p-4 rounded-3xl shadow-sm">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            currentStep === 1
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
          }`}
        >
          <ChevronLeft className="w-5 h-5" /> Tahap Sebelumnya
        </button>

        <div className="text-xs sm:text-sm font-black text-slate-500 hidden sm:block">
          Tahap {currentStep} dari 4 ({topicTitle})
        </div>

        {currentStep < 4 ? (
          <button
            onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
            className="px-7 py-3 bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Lanjut ke Tahap {currentStep + 1}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <span className="text-xs sm:text-sm font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200">
            <CheckCircle2 className="w-5 h-5" /> Kerjakan Mini Quiz di atas untuk Klaim XP!
          </span>
        )}
      </div>
    </div>
  );
}

// ==========================================
// CARD SUB-MATERI COMPONENT
// ==========================================
function ModuleCard({ title, desc, icon, isDone, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl p-5 shadow-lg border-2 border-sky-100 hover:border-sky-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="p-3 bg-sky-50 rounded-2xl group-hover:bg-sky-500 group-hover:text-white transition-colors">
            {icon}
          </div>
          {isDone ? (
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> SELESAI
            </span>
          ) : (
            <span className="bg-sky-100 text-sky-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              Full Screen Mode
            </span>
          )}
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-black text-slate-800 group-hover:text-sky-600 transition-colors">
            {title}
          </h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
            {desc}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-3">
        <span className="text-xs font-bold text-sky-600 group-hover:underline">Buka Modul Full Screen</span>
        <ChevronRight className="w-4 h-4 text-sky-500 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

// ==========================================
// MODUL 1: TRANSLASI (PERGESERAN)
// ==========================================
function TranslasiTheory() {
  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
      {/* Cerita Apersepsi Kehidupan Nyata */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-3xl border border-sky-200 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-500 text-white rounded-2xl">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Apersepsi Kehidupan Nyata</span>
            <h3 className="text-lg font-black text-slate-800">Joystick Game Mobile & Pergeseran Bidak Catur</h3>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Pernahkah kamu bermain game di HP seperti <strong>Mobile Legends</strong> atau <strong>Minecraft</strong>? Saat kamu menggerakkan analog joystick ke kiri 3 langkah dan ke depan 4 langkah, karakter dalam game akan berpindah tempat. Bentuk dan ukuran karaktermu tidak berubah sama sekali, hanya posisinya yang bergeser.
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Sama halnya saat bermain catur: ketika kamu menggeser benteng sejauh 3 kotak ke kanan dan 2 kotak ke depan. Perubahan posisi benda tanpa mengubah bentuk dan ukurannya inilah yang dinamakan <strong>Translasi (Pergeseran)</strong>.
        </p>
      </div>

      {/* Visualisasi Grafik Langsung di Tahap 1 */}
      <div className="bg-slate-50 p-5 rounded-3xl border-2 border-sky-200 space-y-3 flex flex-col items-center text-center">
        <span className="text-xs font-extrabold text-sky-700 bg-sky-100 px-3 py-1 rounded-full flex items-center gap-1.5">
          <Grid className="w-4 h-4" /> Visual Diagram Konsep Translasi
        </span>
        <svg viewBox="0 0 300 180" className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-inner">
          <line x1="20" y1="90" x2="280" y2="90" stroke="#94a3b8" strokeWidth="2" />
          <line x1="150" y1="10" x2="150" y2="170" stroke="#94a3b8" strokeWidth="2" />
          {/* Posisi Asal A(2, 1) */}
          <circle cx="190" cy="70" r="7" fill="#3b82f6" />
          <text x="195" y="65" fontSize="11" fontWeight="bold" fill="#1e3a8a">A(2, 1)</text>
          
          {/* Arrow pergeseran (a=3, b=2) */}
          <path d="M 190 70 L 250 70 L 250 30" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
          <polygon points="250,25 245,35 255,35" fill="#f59e0b" />
          
          {/* Posisi Bayangan A'(5, 3) */}
          <circle cx="250" cy="30" r="8" fill="#10b981" />
          <text x="210" y="22" fontSize="12" fontWeight="black" fill="#065f46">A'(5, 3)</text>
          
          <text x="190" y="88" fontSize="9" fill="#d97706" fontStyle="italic">+3 Kanan</text>
          <text x="255" y="55" fontSize="9" fill="#d97706" fontStyle="italic">+2 Atas</text>
        </svg>
        <p className="text-xs text-slate-500 font-medium">Pergeseran titik dari A(2,1) sejauh 3 langkah ke kanan (+3) dan 2 langkah ke atas (+2) menghasilkan bayangan A'(5,3).</p>
      </div>

      {/* Penjelasan Konsep Matematis Tanpa LaTeX */}
      <div className="space-y-4 pt-2">
        <h4 className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2">
          <OwlMascot pose="menunjuk" size={65} />
          <span>Konsep Dasar Translasi pada Koordinat Cartesius</span>
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          Jika suatu titik awal <strong>A dengan koordinat (x, y)</strong> digeser oleh vektor translasi <strong>T = (a, b)</strong>, maka titik tersebut akan berpindah ke posisi baru <strong>A' dengan koordinat (x + a, y + b)</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-sky-50 p-5 rounded-2xl border border-sky-200 space-y-2">
            <h5 className="text-sm font-black text-sky-800 flex items-center gap-2">
              <Move className="w-4 h-4 text-sky-600" /> Komponen Horizontal (a)
            </h5>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Mengontrol pergeseran ke kanan atau ke kiri sepanjang Sumbu X:
              <br />• Nilai a positif (+a): Bergeser ke arah <strong>KANAN</strong>
              <br />• Nilai a negatif (-a): Bergeser ke arah <strong>KIRI</strong>
            </p>
          </div>

          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-2">
            <h5 className="text-sm font-black text-amber-800 flex items-center gap-2">
              <Move className="w-4 h-4 text-amber-600" /> Komponen Vertikal (b)
            </h5>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Mengontrol pergeseran ke atas atau ke bawah sepanjang Sumbu Y:
              <br />• Nilai b positif (+b): Bergeser ke arah <strong>ATAS</strong>
              <br />• Nilai b negatif (-b): Bergeser ke arah <strong>BAWAH</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TranslasiSimulation() {
  const [shiftA, setShiftA] = useState(3);
  const [shiftB, setShiftB] = useState(2);

  const originX = 1;
  const originY = 1;
  const newX = originX + shiftA;
  const newY = originY + shiftB;

  const toSvgX = (x) => 170 + x * 22;
  const toSvgY = (y) => 170 - y * 22;

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
      <h4 className="text-base sm:text-lg font-black text-slate-800">Tahap 2: Simulasi & Grafik Interaktif Translasi</h4>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-700">
              <span>Pergeseran Horizontal Sumbu X (Nilai a):</span>
              <span className="text-sky-600 font-black">
                {shiftA > 0 ? `+${shiftA} (Bergeser ke KANAN)` : shiftA < 0 ? `${shiftA} (Bergeser ke KIRI)` : '0 (Tetap)'}
              </span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              value={shiftA}
              onChange={(e) => setShiftA(parseInt(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer h-3 bg-slate-200 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-700">
              <span>Pergeseran Vertikal Sumbu Y (Nilai b):</span>
              <span className="text-sky-600 font-black">
                {shiftB > 0 ? `+${shiftB} (Bergeser ke ATAS)` : shiftB < 0 ? `${shiftB} (Bergeser ke BAWAH)` : '0 (Tetap)'}
              </span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              value={shiftB}
              onChange={(e) => setShiftB(parseInt(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer h-3 bg-slate-200 rounded-lg"
            />
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-2xl text-sm font-mono space-y-3 border border-slate-700 shadow-md">
            <div className="text-yellow-400 font-bold text-xs uppercase tracking-wider">Perhitungan Posisi Bayangan:</div>
            <div>Posisi Awal: A({originX}, {originY})</div>
            <div>Vektor Translasi: T = ({shiftA}, {shiftB})</div>
            <div className="text-sky-300 font-bold">
              Bayangan A' = ({originX} + {shiftA}, {originY} + {shiftB})
            </div>
            <div className="text-emerald-400 font-black text-base pt-2 border-t border-slate-800">
              ➔ Koordinat Akhir A' = ({newX}, {newY})
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <svg viewBox="0 0 340 340" className="w-full max-w-[340px] bg-slate-50 border-2 border-slate-200 rounded-3xl shadow-inner">
            {[-6, -4, -2, 0, 2, 4, 6].map((val) => (
              <g key={val}>
                <line x1={toSvgX(val)} y1="0" x2={toSvgX(val)} y2="340" stroke="#e2e8f0" strokeWidth="1" />
                <line x1="0" y1={toSvgY(val)} x2="340" y2={toSvgY(val)} stroke="#e2e8f0" strokeWidth="1" />
              </g>
            ))}
            <line x1="170" y1="0" x2="170" y2="340" stroke="#64748b" strokeWidth="2.5" />
            <line x1="0" y1="170" x2="340" y2="170" stroke="#64748b" strokeWidth="2.5" />

            <line
              x1={toSvgX(originX)}
              y1={toSvgY(originY)}
              x2={toSvgX(newX)}
              y2={toSvgY(newY)}
              stroke="#f59e0b"
              strokeWidth="3"
              strokeDasharray="5 5"
            />
            <circle cx={toSvgX(originX)} cy={toSvgY(originY)} r="8" fill="#3b82f6" />
            <text x={toSvgX(originX) + 10} y={toSvgY(originY) - 8} fontSize="12" fontWeight="bold" fill="#1e3a8a">
              A({originX},{originY})
            </text>

            <circle cx={toSvgX(newX)} cy={toSvgY(newY)} r="9" fill="#10b981" />
            <text x={toSvgX(newX) + 10} y={toSvgY(newY) - 8} fontSize="13" fontWeight="extrabold" fill="#065f46">
              A'({newX},{newY})
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function TranslasiExample() {
  return (
    <div className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
      <h4 className="text-base sm:text-lg font-black text-slate-800">Tahap 3: Contoh Soal & Pembahasan Langkah demi Langkah</h4>
      
      <div className="bg-sky-50 p-5 rounded-2xl border border-sky-200 space-y-2">
        <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">Soal Kasus Komputer:</span>
        <p className="text-sm sm:text-base font-black text-slate-800">
          Sebuah ikon aplikasi pada layar komputer berada di posisi awal titik B(-3, 4). Pemakai komputer menggeser ikon tersebut menggunakan mouse sejauh 5 piksel ke kanan dan 2 piksel ke bawah. Tentukan posisi baru ikon tersebut B'!
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm space-y-1">
          <span className="font-extrabold text-sky-600">Langkah 1: Identifikasi Koordinat Awal dan Vektor Translasi</span>
          <p className="text-slate-700">Koordinat asal B: x = -3, y = 4.</p>
          <p className="text-slate-700">Pergeseran ke kanan 5 piksel artinya a = +5. Pergeseran ke bawah 2 piksel artinya b = -2.</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm space-y-1">
          <span className="font-extrabold text-sky-600">Langkah 2: Gunakan Penjumlahan Translasi</span>
          <p className="text-slate-700 font-mono">B'(x', y') = (-3 + 5, 4 + (-2))</p>
        </div>
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs sm:text-sm space-y-1">
          <span className="font-extrabold text-emerald-700">Langkah 3: Dapatkan Hasil Bayangan Akhir</span>
          <p className="text-emerald-900 font-mono font-extrabold text-base">➔ Posisi baru ikon B' adalah (2, 2)</p>
        </div>
      </div>
    </div>
  );
}

function TranslasiSummaryQuiz({ onComplete }) {
  const [selectedAns, setSelectedAns] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleCheck = () => {
    if (selectedAns === 'C') {
      setIsCorrect(true);
      onComplete();
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
      <h4 className="text-base sm:text-lg font-black text-slate-800">Tahap 4: Ringkasan Rumus & Cek Pemahaman Cepat</h4>
      
      <div className="bg-slate-900 text-white p-5 rounded-2xl text-sm space-y-2 border border-slate-700">
        <div className="text-yellow-400 font-extrabold text-xs uppercase tracking-wider">📌 Ringkasan Rumus Translasi:</div>
        <p className="font-mono text-base">Titik P(x, y) ditranslasikan oleh T(a, b) menjadi P'(x + a, y + b)</p>
      </div>

      <div className="p-5 bg-sky-50 rounded-2xl border border-sky-200 space-y-4">
        <div className="text-sm font-extrabold text-slate-800">Mini Quiz Cek Pemahaman:</div>
        <p className="text-xs sm:text-sm text-slate-700">
          Titik C(2, 3) digeser oleh vektor translasi T = (4, 1). Hasil bayangan titik C' adalah...
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          {['A. C\'(2, 4)', 'B. C\'(5, 5)', 'C. C\'(6, 4)', 'D. C\'(6, 3)'].map((opt, i) => {
            const letter = ['A', 'B', 'C', 'D'][i];
            return (
              <button
                key={letter}
                onClick={() => {
                  setSelectedAns(letter);
                  setIsCorrect(null);
                }}
                className={`p-3.5 rounded-2xl border text-left font-bold transition-all ${
                  selectedAns === letter ? 'bg-sky-500 text-white border-sky-500 shadow-md' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleCheck}
          disabled={!selectedAns}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all"
        >
          Periksa Jawaban
        </button>

        {isCorrect === true && (
          <div className="p-4 bg-emerald-100 text-emerald-900 text-sm font-bold rounded-2xl flex items-center justify-between border border-emerald-300">
            <span>🎉 Benar! C'(2+4, 3+1) = C'(6, 4). Modul Selesai & +20 XP Diperoleh!</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
        )}
        {isCorrect === false && (
          <div className="p-4 bg-rose-100 text-rose-900 text-sm font-bold rounded-2xl flex items-center gap-2 border border-rose-300">
            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>Maaf, jawaban kamu kurang tepat! Silakan hitung penjumlahan koordinat (2+4, 3+1) kembali.</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// MODUL 2: REFLEKSI (PENCERMINAN)
// ==========================================
function RefleksiTheory() {
  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-3xl border border-indigo-200 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500 text-white rounded-2xl">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Apersepsi Kehidupan Nyata</span>
            <h3 className="text-lg font-black text-slate-800">Kaca Cermin Datar & Foto Selfie Kamera Depan HP</h3>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Pernahkah kamu heran melihat tulisan pada bajumu saat mengambil foto selfie dengan kamera depan HP? Tulisan di bajumu tampak terbalik secara horizontal!
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Begitu pula saat kamu berdiri di depan kaca cermin datar di kamar. Jarak kamu ke permukaan cermin sama persis dengan jarak bayanganmu di dalam cermin. Tinggi dan bentuk tubuhmu tidak berubah, hanya posisinya yang saling berhadapan. Inilah prinsip utama <strong>Refleksi (Pencerminan)</strong>.
        </p>
      </div>

      {/* Visualiasi Grafik Langsung di Tahap 1 Refleksi */}
      <div className="bg-slate-50 p-5 rounded-3xl border-2 border-indigo-200 space-y-3 flex flex-col items-center text-center">
        <span className="text-xs font-extrabold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full flex items-center gap-1.5">
          <FlipHorizontal className="w-4 h-4" /> Visual Diagram Pencerminan (Cermin Sumbu Y)
        </span>
        <svg viewBox="0 0 300 160" className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-inner">
          <line x1="20" y1="80" x2="280" y2="80" stroke="#94a3b8" strokeWidth="2" />
          {/* Cermin Sumbu Y */}
          <line x1="150" y1="10" x2="150" y2="150" stroke="#ec4899" strokeWidth="4" />
          <text x="155" y="25" fontSize="10" fontWeight="bold" fill="#ec4899">Cermin Sumbu Y</text>
          
          {/* Objek Asal */}
          <polygon points="200,50 230,50 215,90" fill="#3b82f6" fillOpacity="0.6" stroke="#1d4ed8" strokeWidth="2" />
          <text x="205" y="45" fontSize="10" fontWeight="bold" fill="#1e3a8a">Objek Awal</text>
          
          {/* Bayangan Refleksi */}
          <polygon points="100,50 70,50 85,90" fill="#ec4899" fillOpacity="0.6" stroke="#db2777" strokeWidth="2" strokeDasharray="3 3" />
          <text x="65" y="45" fontSize="10" fontWeight="bold" fill="#9d174d">Bayangan A'</text>
          
          {/* Garis Jarak */}
          <line x1="150" y1="65" x2="215" y2="65" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="150" y1="65" x2="85" y2="65" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
        <p className="text-xs text-slate-500 font-medium">Jarak objek ke cermin sama dengan jarak bayangan ke cermin (Sumbu Y).</p>
      </div>

      <div className="space-y-4 pt-2">
        <h4 className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2">
          <OwlMascot pose="menunjuk" size={65} />
          <span>Sumbu-Sumbu Cermin Utama pada Koordinat Cartesius</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 space-y-2">
            <h5 className="font-black text-indigo-900">Pencerminan Terhadap Sumbu X</h5>
            <p className="text-slate-600">Posisi horizontal (x) tetap, nilai vertikal (y) berubah tanda positif/negatif.
            <br /><strong>Rumus: Titik (x, y) menjadi (x, -y)</strong></p>
          </div>
          <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 space-y-2">
            <h5 className="font-black text-indigo-900">Pencerminan Terhadap Sumbu Y</h5>
            <p className="text-slate-600">Posisi vertikal (y) tetap, nilai horizontal (x) berubah tanda positif/negatif.
            <br /><strong>Rumus: Titik (x, y) menjadi (-x, y)</strong></p>
          </div>
          <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 space-y-2">
            <h5 className="font-black text-indigo-900">Pencerminan Terhadap Garis y = x</h5>
            <p className="text-slate-600">Nilai koordinat x dan y saling bertukar posisi.
            <br /><strong>Rumus: Titik (x, y) menjadi (y, x)</strong></p>
          </div>
          <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 space-y-2">
            <h5 className="font-black text-indigo-900">Pencerminan Terhadap Garis y = -x</h5>
            <p className="text-slate-600">Nilai koordinat bertukar posisi dan berubah tanda.
            <br /><strong>Rumus: Titik (x, y) menjadi (-y, -x)</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RefleksiSimulation() {
  const [mirrorAxis, setMirrorAxis] = useState('sumbuX');
  const triangle = [{ x: 2, y: 1 }, { x: 5, y: 1 }, { x: 3, y: 4 }];

  const getMirroredPoint = (pt) => {
    switch (mirrorAxis) {
      case 'sumbuX': return { x: pt.x, y: -pt.y };
      case 'sumbuY': return { x: -pt.x, y: pt.y };
      case 'pusat': return { x: -pt.x, y: -pt.y };
      case 'yEqualsX': return { x: pt.y, y: pt.x };
      case 'yEqualsMinX': return { x: -pt.y, y: -pt.x };
      default: return pt;
    }
  };

  const mirroredTriangle = triangle.map(getMirroredPoint);
  const toSvgX = (x) => 170 + x * 22;
  const toSvgY = (y) => 170 - y * 22;

  const polyOrig = triangle.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ');
  const polyMirr = mirroredTriangle.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ');

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
      <h4 className="text-base sm:text-lg font-black text-slate-800">Tahap 2: Simulasi & Grafik Refleksi</h4>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-3">
          <label className="text-xs sm:text-sm font-bold text-slate-700">Pilih Cermin Refleksi:</label>
          {[
            { id: 'sumbuX', label: 'Cermin Sumbu X (Horizontal)', formula: '(x, y) ➔ (x, -y)' },
            { id: 'sumbuY', label: 'Cermin Sumbu Y (Vertikal)', formula: '(x, y) ➔ (-x, y)' },
            { id: 'pusat', label: 'Titik Pusat (0,0)', formula: '(x, y) ➔ (-x, -y)' },
            { id: 'yEqualsX', label: 'Garis y = x', formula: '(x, y) ➔ (y, x)' },
            { id: 'yEqualsMinX', label: 'Garis y = -x', formula: '(x, y) ➔ (-y, -x)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setMirrorAxis(item.id)}
              className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm flex items-center justify-between transition-all ${
                mirrorAxis === item.id
                  ? 'bg-indigo-600 text-white font-bold border-indigo-600 shadow-md'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50'
              }`}
            >
              <span>{item.label}</span>
              <span className="font-mono text-xs opacity-90">{item.formula}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <svg viewBox="0 0 340 340" className="w-full max-w-[340px] bg-slate-50 border-2 border-slate-200 rounded-3xl shadow-inner">
            {[-6, -4, -2, 0, 2, 4, 6].map((val) => (
              <g key={val}>
                <line x1={toSvgX(val)} y1="0" x2={toSvgX(val)} y2="340" stroke="#e2e8f0" strokeWidth="1" />
                <line x1="0" y1={toSvgY(val)} x2="340" y2={toSvgY(val)} stroke="#e2e8f0" strokeWidth="1" />
              </g>
            ))}
            <line x1="170" y1="0" x2="170" y2="340" stroke="#64748b" strokeWidth="2.5" />
            <line x1="0" y1="170" x2="340" y2="170" stroke="#64748b" strokeWidth="2.5" />

            {mirrorAxis === 'sumbuX' && <line x1="0" y1="170" x2="340" y2="170" stroke="#ec4899" strokeWidth="4" />}
            {mirrorAxis === 'sumbuY' && <line x1="170" y1="0" x2="170" y2="340" stroke="#ec4899" strokeWidth="4" />}

            <polygon points={polyOrig} fill="#3b82f6" fillOpacity="0.4" stroke="#2563eb" strokeWidth="2.5" />
            <polygon points={polyMirr} fill="#ec4899" fillOpacity="0.4" stroke="#db2777" strokeWidth="3" strokeDasharray="5 5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function RefleksiExample() {
  return (
    <div className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
      <h4 className="text-base sm:text-lg font-black text-slate-800">Tahap 3: Contoh Soal & Pembahasan Refleksi</h4>
      <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 text-xs sm:text-sm">
        <strong className="text-indigo-900 uppercase">Soal:</strong> Tentukan bayangan titik K(4, -3) jika dicerminkan terhadap Sumbu Y!
      </div>
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <strong>Gunakan Rumus Refleksi Sumbu Y:</strong> Titik (x, y) ➔ (-x, y)
        </div>
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 font-extrabold text-base">
          ➔ K'( -4, -3 )
        </div>
      </div>
    </div>
  );
}

function RefleksiSummaryQuiz({ onComplete }) {
  const [selectedAns, setSelectedAns] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
      <h4 className="text-base sm:text-lg font-black text-slate-800">Tahap 4: Ringkasan & Cek Pemahaman Refleksi</h4>
      <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-200 space-y-4 text-xs sm:text-sm">
        <p className="font-extrabold text-slate-800">Pencerminan titik P(5, 2) terhadap Sumbu X menghasilkan bayangan P'...</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {['A. P\'(-5, 2)', 'B. P\'(5, -2)', 'C. P\'(-5, -2)', 'D. P\'(2, 5)'].map((opt, i) => {
            const letter = ['A', 'B', 'C', 'D'][i];
            return (
              <button
                key={letter}
                onClick={() => {
                  setSelectedAns(letter);
                  setIsCorrect(null);
                }}
                className={`p-3.5 rounded-2xl border text-left font-bold ${
                  selectedAns === letter ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => {
            if (selectedAns === 'B') {
              setIsCorrect(true);
              onComplete();
            } else {
              setIsCorrect(false);
            }
          }}
          disabled={!selectedAns}
          className="w-full py-3 bg-emerald-500 text-white font-bold rounded-2xl shadow-md"
        >
          Periksa Jawaban
        </button>
        {isCorrect === true && (
          <div className="p-4 bg-emerald-100 text-emerald-900 font-bold rounded-2xl flex items-center justify-between border border-emerald-300">
            <span>🎉 Benar! Pencerminan terhadap Sumbu X merubah tanda nilai y: P'(5, -2). +20 XP!</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
        )}
        {isCorrect === false && (
          <div className="p-4 bg-rose-100 text-rose-900 font-bold rounded-2xl flex items-center gap-2 border border-rose-300">
            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>Maaf, jawaban kamu kurang tepat! Mengapa? Karena cermin Sumbu X hanya mengubah tanda y dari positif menjadi negatif.</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// MODUL 3: ROTASI (PERPUTARAN)
// ==========================================
function RotasiTheory() {
  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-3xl border border-amber-200 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500 text-white rounded-2xl">
            <CompassIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Apersepsi Kehidupan Nyata</span>
            <h3 className="text-lg font-black text-slate-800">Bianglala Pasar Malam & Perputaran Jarum Jam</h3>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Pernahkah kamu naik wahana <strong>Bianglala (Ferris Wheel)</strong> di pasar malam? Saat wahana berputar, tempat dudukmu akan bergerak mengelilingi poros pusat bianglala.
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Begitu juga dengan jarum jam dinding di kelasmu yang berputar terus-menerus. Pergerakan berputar mengelilingi satu titik pusat dengan sudut tertentu disebut <strong>Rotasi (Perputaran)</strong>.
        </p>
      </div>

      {/* Visualiasi Grafik Langsung di Tahap 1 Rotasi */}
      <div className="bg-slate-50 p-5 rounded-3xl border-2 border-amber-200 space-y-3 flex flex-col items-center text-center">
        <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-full flex items-center gap-1.5">
          <RefreshCw className="w-4 h-4" /> Visual Diagram Rotasi 90 Derajat (Berlawanan Jarum Jam)
        </span>
        <svg viewBox="0 0 300 170" className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-inner">
          <line x1="20" y1="120" x2="280" y2="120" stroke="#94a3b8" strokeWidth="2" />
          <line x1="150" y1="20" x2="150" y2="160" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="150" cy="120" r="5" fill="#0f172a" />
          <text x="130" y="135" fontSize="10" fontWeight="bold" fill="#0f172a">Pusat O(0,0)</text>
          
          {/* Titik awal P(3, 1) */}
          <line x1="150" y1="120" x2="220" y2="100" stroke="#3b82f6" strokeWidth="2" />
          <circle cx="220" cy="100" r="7" fill="#3b82f6" />
          <text x="225" y="95" fontSize="10" fontWeight="bold" fill="#1e3a8a">P(3, 1)</text>
          
          {/* Arc perputaran 90 deg */}
          <path d="M 220 100 A 70 70 0 0 0 130 50" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="3 3" />
          <polygon points="130,45 125,55 135,55" fill="#f59e0b" />
          
          {/* Titik bayangan P'(-1, 3) */}
          <line x1="150" y1="120" x2="130" y2="50" stroke="#10b981" strokeWidth="2" />
          <circle cx="130" cy="50" r="8" fill="#10b981" />
          <text x="75" y="45" fontSize="11" fontWeight="black" fill="#065f46">P'(-1, 3)</text>
        </svg>
        <p className="text-xs text-slate-500 font-medium">Rotasi 90° berlawanan arah jarum jam mengubah koordinat (x, y) menjadi (-y, x).</p>
      </div>

      <div className="space-y-4 pt-2">
        <h4 className="text-base sm:text-lg font-black text-slate-800">Aturan Arah Sudut Putar:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-2">
            <h5 className="font-black text-amber-900">Arah Berlawanan Jarum Jam (Sudut Positif +)</h5>
            <p className="text-slate-600">Diputar mengarah ke kiri atas. Rotasi 90° berlawanan jarum jam merubah titik (x, y) menjadi (-y, x).</p>
          </div>
          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-2">
            <h5 className="font-black text-amber-900">Arah Searah Jarum Jam (Sudut Negatif -)</h5>
            <p className="text-slate-600">Diputar mengarah ke kanan bawah. Rotasi 90° searah jarum jam merubah titik (x, y) menjadi (y, -x).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RotasiSimulation() {
  const [angle, setAngle] = useState(90);
  const [direction, setDirection] = useState('ccw');
  const px = 3;
  const py = 2;

  const getRotatedCoordinates = () => {
    let effAngle = angle % 360;
    if (direction === 'cw') effAngle = (360 - effAngle) % 360;
    if (effAngle === 90) return { x: -py, y: px };
    if (effAngle === 180) return { x: -px, y: -py };
    if (effAngle === 270) return { x: py, y: -px };
    return { x: px, y: py };
  };

  const rotatedP = getRotatedCoordinates();
  const toSvgX = (x) => 170 + x * 22;
  const toSvgY = (y) => 170 - y * 22;

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
      <h4 className="text-base sm:text-lg font-black text-slate-800">Tahap 2: Simulasi Trajektori Rotasi</h4>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-xs sm:text-sm">
          <label className="font-bold text-slate-700">Besar Sudut Putar:</label>
          <div className="flex gap-3">
            {[90, 180, 270].map((deg) => (
              <button
                key={deg}
                onClick={() => setAngle(deg)}
                className={`flex-1 py-3 rounded-2xl font-black border transition-all ${
                  angle === deg ? 'bg-amber-500 text-slate-900 shadow-md' : 'bg-slate-50 text-slate-700'
                }`}
              >
                {deg} Derajat
              </button>
            ))}
          </div>

          <label className="font-bold text-slate-700 block pt-2">Arah Putaran:</label>
          <div className="flex gap-3">
            <button
              onClick={() => setDirection('ccw')}
              className={`flex-1 py-3 rounded-2xl font-black border transition-all ${
                direction === 'ccw' ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-50 text-slate-700'
              }`}
            >
              Berlawanan Jarum Jam (+)
            </button>
            <button
              onClick={() => setDirection('cw')}
              className={`flex-1 py-3 rounded-2xl font-black border transition-all ${
                direction === 'cw' ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-50 text-slate-700'
              }`}
            >
              Searah Jarum Jam (-)
            </button>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-2xl font-mono text-sm space-y-2 border border-slate-700">
            <div>Posisi Awal P: ({px}, {py})</div>
            <div className="text-yellow-400 font-bold">➔ Hasil Rotasi P': ({rotatedP.x}, {rotatedP.y})</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <svg viewBox="0 0 340 340" className="w-full max-w-[340px] bg-slate-50 border-2 border-slate-200 rounded-3xl shadow-inner">
            {[-6, -4, -2, 0, 2, 4, 6].map((val) => (
              <g key={val}>
                <line x1={toSvgX(val)} y1="0" x2={toSvgX(val)} y2="340" stroke="#e2e8f0" strokeWidth="1" />
                <line x1="0" y1={toSvgY(val)} x2="340" y2={toSvgY(val)} stroke="#e2e8f0" strokeWidth="1" />
              </g>
            ))}
            <line x1="170" y1="0" x2="170" y2="340" stroke="#64748b" strokeWidth="2.5" />
            <line x1="0" y1="170" x2="340" y2="170" stroke="#64748b" strokeWidth="2.5" />
            <circle cx="170" cy="170" r={Math.sqrt(px*px + py*py) * 22} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <circle cx={toSvgX(px)} cy={toSvgY(py)} r="8" fill="#3b82f6" />
            <circle cx={toSvgX(rotatedP.x)} cy={toSvgY(rotatedP.y)} r="9" fill="#10b981" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function RotasiExample() {
  return (
    <div className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-xs sm:text-sm">
      <h4 className="text-base sm:text-lg font-black text-slate-800">Tahap 3: Contoh Soal Rotasi</h4>
      <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        Titik M(3, 5) diputar sebesar 90 derajat berlawanan arah jarum jam terhadap titik pusat (0,0). Tentukan bayangan M'!
      </div>
      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 font-extrabold text-base">
        ➔ Menggunakan rumus (x, y) menjadi (-y, x), diperoleh M'(-5, 3).
      </div>
    </div>
  );
}

function RotasiSummaryQuiz({ onComplete }) {
  const [selectedAns, setSelectedAns] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-xs sm:text-sm">
      <h4 className="text-base sm:text-lg font-black text-slate-800">Tahap 4: Quiz Rotasi</h4>
      <p className="font-extrabold text-slate-800">Titik A(2, 4) dirotasikan sebesar 180 derajat terhadap titik pusat (0,0). Bayangan A' adalah...</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {['A. A\'(-2, -4)', 'B. A\'(4, 2)', 'C. A\'(-4, -2)', 'D. A\'(2, -4)'].map((opt, i) => {
          const letter = ['A', 'B', 'C', 'D'][i];
          return (
            <button
              key={letter}
              onClick={() => {
                setSelectedAns(letter);
                setIsCorrect(null);
              }}
              className={`p-3.5 rounded-2xl border font-bold ${selectedAns === letter ? 'bg-amber-500 text-slate-900' : 'bg-slate-50'}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => {
          if (selectedAns === 'A') {
            setIsCorrect(true);
            onComplete();
          } else setIsCorrect(false);
        }}
        disabled={!selectedAns}
        className="w-full py-3 bg-emerald-500 text-white font-bold rounded-2xl shadow-md"
      >
        Periksa Jawaban
      </button>
      {isCorrect === true && <div className="p-4 bg-emerald-100 text-emerald-900 font-bold rounded-2xl border border-emerald-300">🎉 Benar! Rotasi 180 derajat merubah tanda kedua koordinat menjadi (-x, -y): A'(-2, -4). +20 XP!</div>}
      {isCorrect === false && <div className="p-4 bg-rose-100 text-rose-900 font-bold rounded-2xl flex items-center gap-2 border border-rose-300"><XCircle className="w-5 h-5 text-rose-600 shrink-0" /><span>Maaf, jawaban kamu kurang tepat! Ingat, rotasi 180° mengubah titik (x, y) menjadi (-x, -y).</span></div>}
    </div>
  );
}

// ==========================================
// MODUL 4: KEKONGRUENAN
// ==========================================
function KekongruenanTheory() {
  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-3xl border border-emerald-200 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500 text-white rounded-2xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Apersepsi Kehidupan Nyata</span>
            <h3 className="text-lg font-black text-slate-800">Cetakan Kue Pastel & Ubin Keramik Lantai</h3>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Pernahkah kamu melihat cetakan kue pastel atau ubin keramik yang dipasang di lantai rumahmu? Setiap ubin dibuat dari pabrik dengan bentuk dan ukuran yang 100% persis sama. Jika ubin satu ditumpuk di atas ubin lainnya, keduanya akan saling menutup dengan sempurna.
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Dua atau lebih bangun datar yang memiliki bentuk dan ukuran yang persis sama dinamakan <strong>Bangun Datar yang Kongruen</strong>.
        </p>
      </div>

      {/* Visualiasi Grafik Langsung di Tahap 1 Kekongruenan */}
      <div className="bg-slate-50 p-5 rounded-3xl border-2 border-emerald-200 space-y-3 flex flex-col items-center text-center">
        <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5">
          <Layers className="w-4 h-4" /> Visual Diagram Dua Segitiga Kongruen
        </span>
        <svg viewBox="0 0 300 140" className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-inner">
          {/* Segitiga 1 */}
          <polygon points="30,110 110,110 70,30" fill="#3b82f6" fillOpacity="0.5" stroke="#1d4ed8" strokeWidth="2.5" />
          <text x="60" y="80" fontSize="11" fontWeight="bold" fill="#1e3a8a">Δ ABC</text>
          
          <text x="140" y="75" fontSize="20" fontWeight="black" fill="#059669">≅</text>
          
          {/* Segitiga 2 */}
          <polygon points="180,110 260,110 220,30" fill="#10b981" fillOpacity="0.5" stroke="#047857" strokeWidth="2.5" />
          <text x="210" y="80" fontSize="11" fontWeight="bold" fill="#064e3b">Δ DEF</text>
        </svg>
        <p className="text-xs text-slate-500 font-medium">Panjang sisi dan besar sudut yang bersesuaian 100% persis sama.</p>
      </div>

      <div className="space-y-3 pt-2 text-xs sm:text-sm">
        <h4 className="font-black text-slate-800 text-base">Syarat Utama Kekongruenan Segitiga:</h4>
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li><strong>Sisi - Sisi - Sisi (S - S - S)</strong>: Ketiga pasang sisi yang bersesuaian sama panjang.</li>
          <li><strong>Sisi - Sudut - Sisi (S - Sd - S)</strong>: Dua sisi sama panjang dan sudut di antara kedua sisi tersebut sama besar.</li>
          <li><strong>Sudut - Sisi - Sudut (Sd - S - Sd)</strong>: Dua sudut sama besar dan sisi di antara kedua sudut tersebut sama panjang.</li>
        </ul>
      </div>
    </div>
  );
}

function KekongruenanSimulation() {
  const [overlapProgress, setOverlapProgress] = useState(0);
  const maxOffset = 140;
  const currentOffset = maxOffset * (1 - overlapProgress / 100);

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
      <h4 className="text-base sm:text-lg font-black text-slate-800">Tahap 2: Simulasi Mengimpitkan Dua Segitiga</h4>
      <p className="text-xs sm:text-sm text-slate-600">Geser slider untuk menumpuk kedua segitiga dan membuktikan kekongruenannya!</p>
      <input
        type="range"
        min="0"
        max="100"
        value={overlapProgress}
        onChange={(e) => setOverlapProgress(parseInt(e.target.value))}
        className="w-full accent-emerald-500 cursor-pointer h-3 bg-slate-200 rounded-lg"
      />
      <div className="h-56 bg-slate-50 rounded-3xl flex items-center justify-center relative overflow-hidden border-2 border-slate-200 shadow-inner">
        <svg className="absolute w-40 h-40 left-1/4 -translate-x-1/2" viewBox="0 0 100 100">
          <polygon points="10,90 90,90 50,10" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="3" />
        </svg>
        <svg
          className="absolute w-40 h-40 left-1/4 -translate-x-1/2 transition-all duration-75"
          style={{ transform: `translate(${currentOffset}px, 0)` }}
          viewBox="0 0 100 100"
        >
          <polygon points="10,90 90,90 50,10" fill={overlapProgress === 100 ? '#10b981' : '#f59e0b'} stroke="#d97706" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
}

function KekongruenanExample() {
  return (
    <div className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-xs sm:text-sm">
      <h4 className="text-base sm:text-lg font-black text-slate-800">Tahap 3: Pembuktian Kekongruenan</h4>
      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 leading-relaxed">
        Jika dua segitiga ABC dan DEF memiliki panjang AB = DE = 8 cm, BC = EF = 6 cm, dan AC = DF = 10 cm, maka segitiga ABC kongruen dengan segitiga DEF berdasarkan kriteria <strong>Sisi - Sisi - Sisi (S - S - S)</strong>.
      </div>
    </div>
  );
}

function KekongruenanSummaryQuiz({ onComplete }) {
  const [selectedAns, setSelectedAns] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const options = [
    { label: 'A', text: 'Sisi - Sisi - Sisi (S - S - S)' },
    { label: 'B', text: 'Sudut - Sudut - Sudut (Sd - Sd - Sd)' },
    { label: 'C', text: 'Sisi - Sudut - Sisi (S - Sd - S)' },
    { label: 'D', text: 'Sudut - Sisi - Sudut (Sd - S - Sd)' }
  ];

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-xs sm:text-sm">
      <h4 className="text-base sm:text-lg font-black text-slate-800">Tahap 4: Quiz Kekongruenan</h4>
      <p className="font-extrabold text-slate-800">Dua segitiga yang memiliki 3 pasang sisi yang bersesuaian sama panjang terbukti kongruen berdasarkan kriteria...</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => {
              setSelectedAns(opt.label);
              setIsCorrect(null);
            }}
            className={`p-4 rounded-2xl border text-left font-bold transition-all ${
              selectedAns === opt.label ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-50 text-slate-700 hover:bg-emerald-50'
            }`}
          >
            {opt.label}. {opt.text}
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          if (selectedAns === 'A') {
            setIsCorrect(true);
            onComplete();
          } else {
            setIsCorrect(false);
          }
        }}
        disabled={!selectedAns}
        className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all"
      >
        Periksa Jawaban
      </button>

      {isCorrect === true && (
        <div className="p-4 bg-emerald-100 text-emerald-900 font-bold rounded-2xl flex items-center justify-between border border-emerald-300">
          <span>🎉 Benar sekali! Kriteria 3 pasang sisi sama panjang dinamakan Sisi - Sisi - Sisi (S - S - S). +20 XP diperoleh!</span>
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        </div>
      )}
      {isCorrect === false && (
        <div className="p-4 bg-rose-100 text-rose-900 font-bold rounded-2xl flex items-center gap-2 border border-rose-300">
          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>Maaf, jawaban kamu kurang tepat! Jika ketiga panjang sisisinya sama, kriteria yang memenuhi adalah Sisi - Sisi - Sisi.</span>
        </div>
      )}
    </div>
  );
}

// ==========================================
// MODUL 5: DILATASI (SKALA)
// ==========================================
function DilatasiTheory() {
  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-3xl border border-rose-200 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-500 text-white rounded-2xl">
            <Maximize2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Apersepsi Kehidupan Nyata</span>
            <h3 className="text-lg font-black text-slate-800">Fitur Zoom-in Foto HP & Proyektor Bioskop</h3>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Saat kamu mencubit layar HP untuk memperbesar (Zoom-in) foto, ukuran gambar akan membesar tetapi proporsi bentuk gambar tetap sama.
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Begitu pula proyektor di bioskop yang memancarkan cahaya dari pita film kecil hingga menjadi gambar raksasa di layar bioskop. Perubahan ukuran (membesar atau mengecil) tanpa merubah bentuk dasar objek disebut <strong>Dilatasi (Perkalian Skala k)</strong>.
        </p>
      </div>

      {/* Visualisasi Grafik Langsung di Tahap 1 Dilatasi */}
      <div className="bg-slate-50 p-5 rounded-3xl border-2 border-rose-200 space-y-3 flex flex-col items-center text-center">
        <span className="text-xs font-extrabold text-rose-800 bg-rose-100 px-3 py-1 rounded-full flex items-center gap-1.5">
          <Maximize2 className="w-4 h-4" /> Visual Diagram Dilatasi Skala k = 2
        </span>
        <svg viewBox="0 0 300 160" className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-inner">
          <circle cx="40" cy="120" r="4" fill="#0f172a" />
          <text x="25" y="140" fontSize="10" fontWeight="bold" fill="#0f172a">Pusat O(0,0)</text>
          
          {/* Ray Lines */}
          <line x1="40" y1="120" x2="260" y2="20" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="40" y1="120" x2="260" y2="120" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
          
          {/* Objek Asal */}
          <polygon points="100,120 130,120 130,80" fill="#3b82f6" fillOpacity="0.6" stroke="#1d4ed8" strokeWidth="2" />
          <text x="95" y="75" fontSize="10" fontWeight="bold" fill="#1e3a8a">Objek (k=1)</text>
          
          {/* Objek Hasil Pembesaran k=2 */}
          <polygon points="160,120 240,120 240,40" fill="#f43f5e" fillOpacity="0.4" stroke="#e11d48" strokeWidth="2.5" />
          <text x="190" y="35" fontSize="11" fontWeight="black" fill="#9f1239">Bayangan (k=2)</text>
        </svg>
        <p className="text-xs text-slate-500 font-medium">Faktor skala k = 2 melipatgandakan ukuran bangun 2 kali lebih besar dari titik pusat.</p>
      </div>
    </div>
  );
}

function DilatasiSimulation() {
  const [scaleK, setScaleK] = useState(1.5);
  const orig = [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 3 }];
  const scaled = orig.map((p) => ({ x: p.x * scaleK, y: p.y * scaleK }));

  const toSvgX = (x) => 170 + x * 22;
  const toSvgY = (y) => 170 - y * 22;

  const polyOrig = orig.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ');
  const polyScaled = scaled.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ');

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
      <h4 className="text-base sm:text-lg font-black text-slate-800">Tahap 2: Simulasi Faktor Skala k</h4>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="flex justify-between font-bold text-slate-700">
            <span>Faktor Skala k:</span>
            <span className="text-rose-600 font-black">{scaleK}x ({scaleK > 1 ? 'Pembesaran' : scaleK < 1 ? 'Pengecilan' : 'Tetap'})</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.25"
            value={scaleK}
            onChange={(e) => setScaleK(parseFloat(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer h-3 bg-slate-200 rounded-lg"
          />
        </div>
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 340 340" className="w-full max-w-[340px] bg-slate-50 border-2 border-slate-200 rounded-3xl shadow-inner">
            {[-6, -4, -2, 0, 2, 4, 6].map((val) => (
              <g key={val}>
                <line x1={toSvgX(val)} y1="0" x2={toSvgX(val)} y2="340" stroke="#e2e8f0" strokeWidth="1" />
                <line x1="0" y1={toSvgY(val)} x2="340" y2={toSvgY(val)} stroke="#e2e8f0" strokeWidth="1" />
              </g>
            ))}
            <line x1="170" y1="0" x2="170" y2="340" stroke="#64748b" strokeWidth="2.5" />
            <line x1="0" y1="170" x2="340" y2="170" stroke="#64748b" strokeWidth="2.5" />
            <polygon points={polyOrig} fill="#3b82f6" fillOpacity="0.4" stroke="#2563eb" strokeWidth="2" />
            <polygon points={polyScaled} fill="#f43f5e" fillOpacity="0.3" stroke="#e11d48" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function DilatasiExample() {
  return (
    <div className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-xs sm:text-sm">
      <h4 className="text-base sm:text-lg font-black text-slate-800">Tahap 3: Contoh Soal Dilatasi</h4>
      <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200">
        Titik A(3, 4) didilatasi terhadap titik pusat (0,0) dengan faktor skala k = 3. Tentukan koordinat titik bayangan A'!
      </div>
      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 font-extrabold text-base">
        ➔ Mengalikan koordinat dengan skala k = 3: A'(3 × 3, 4 × 3) = A'(9, 12).
      </div>
    </div>
  );
}

function DilatasiSummaryQuiz({ onComplete }) {
  const [selectedAns, setSelectedAns] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-xs sm:text-sm">
      <h4 className="text-base sm:text-lg font-black text-slate-800">Tahap 4: Quiz Dilatasi</h4>
      <p className="font-extrabold text-slate-800">Titik B(4, -2) didilatasi dengan faktor skala k = 2 dari pusat (0,0). Koordinat bayangan B' adalah...</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {['A. B\'(8, -4)', 'B. B\'(6, 0)', 'C. B\'(8, 4)', 'D. B\'(4, -4)'].map((opt, i) => {
          const letter = ['A', 'B', 'C', 'D'][i];
          return (
            <button
              key={letter}
              onClick={() => {
                setSelectedAns(letter);
                setIsCorrect(null);
              }}
              className={`p-3.5 rounded-2xl border font-bold ${selectedAns === letter ? 'bg-rose-500 text-white' : 'bg-slate-50'}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => {
          if (selectedAns === 'A') {
            setIsCorrect(true);
            onComplete();
          } else setIsCorrect(false);
        }}
        disabled={!selectedAns}
        className="w-full py-3 bg-emerald-500 text-white font-bold rounded-2xl shadow-md"
      >
        Periksa Jawaban
      </button>
      {isCorrect === true && <div className="p-4 bg-emerald-100 text-emerald-900 font-bold rounded-2xl border border-emerald-300">🎉 Benar! B'(4 × 2, -2 × 2) = B'(8, -4). +20 XP diperoleh!</div>}
      {isCorrect === false && <div className="p-4 bg-rose-100 text-rose-900 font-bold rounded-2xl flex items-center gap-2 border border-rose-300"><XCircle className="w-5 h-5 text-rose-600 shrink-0" /><span>Maaf, jawaban kamu kurang tepat! Ingat, perkalian skala k = 2 mengalikan nilai x dan y dengan angka 2.</span></div>}
    </div>
  );
}

// ==========================================
// KUIS EVALUASI UTAMA 25 SOAL BERJENJANG (MUDAH, SEDANG, HOTS)
// ==========================================
function Quiz25Module({ onCompleteQuiz }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // BANK 25 SOAL BERJENJANG (MUDAH: 1-8, SEDANG: 9-17, HOTS: 18-25)
  const questions = [
    // --- TINGKAT MUDAH (SOAL 1-8) ---
    {
      id: 1,
      level: "Mudah",
      question: "Titik A(2, 5) ditranslasikan oleh T = (3, 2). Berapakah koordinat titik bayangan A'?",
      options: [
        { label: "A", text: "A'(5, 7)" },
        { label: "B", text: "A'(6, 10)" },
        { label: "C", text: "A'(-1, 3)" },
        { label: "D", text: "A'(5, 3)" }
      ],
      correct: "A",
      explanation: "Translasi tinggal dijumlahkan: A'(2+3, 5+2) = A'(5, 7)."
    },
    {
      id: 2,
      level: "Mudah",
      question: "Bayangan titik B(4, -3) jika dicerminkan terhadap Sumbu X adalah...",
      options: [
        { label: "A", text: "B'(-4, -3)" },
        { label: "B", text: "B'(4, 3)" },
        { label: "C", text: "B'(-4, 3)" },
        { label: "D", text: "B'(3, -4)" }
      ],
      correct: "B",
      explanation: "Pencerminan terhadap Sumbu X mengubah tanda koordinat y: (x, y) menjadi (x, -y). Maka B'(4, 3)."
    },
    {
      id: 3,
      level: "Mudah",
      question: "Hasil pencerminan titik C(-2, 6) terhadap Sumbu Y adalah...",
      options: [
        { label: "A", text: "C'(2, 6)" },
        { label: "B", text: "C'(-2, -6)" },
        { label: "C", text: "C'(2, -6)" },
        { label: "D", text: "C'(6, -2)" }
      ],
      correct: "A",
      explanation: "Pencerminan terhadap Sumbu Y mengubah tanda koordinat x: (x, y) menjadi (-x, y). Maka C'(2, 6)."
    },
    {
      id: 4,
      level: "Mudah",
      question: "Titik D(3, 1) dirotasikan sebesar 90 derajat berlawanan arah jarum jam terhadap titik pusat (0,0). Koordinat D' adalah...",
      options: [
        { label: "A", text: "D'(-1, 3)" },
        { label: "B", text: "D'(1, -3)" },
        { label: "C", text: "D'(-3, -1)" },
        { label: "D", text: "D'(3, -1)" }
      ],
      correct: "A",
      explanation: "Rotasi 90 derajat berlawanan arah jarum jam: (x, y) menjadi (-y, x). Maka D'(-1, 3)."
    },
    {
      id: 5,
      level: "Mudah",
      question: "Titik E(4, 2) didilatasi dengan faktor skala k = 3 dari pusat (0,0). Koordinat E' adalah...",
      options: [
        { label: "A", text: "E'(12, 6)" },
        { label: "B", text: "E'(7, 5)" },
        { label: "C", text: "E'(12, 2)" },
        { label: "D", text: "E'(4, 6)" }
      ],
      correct: "A",
      explanation: "Dilatasi mengalikan tiap koordinat dengan k: E'(4 × 3, 2 × 3) = E'(12, 6)."
    },
    {
      id: 6,
      level: "Mudah",
      question: "Perubahan posisi objek tanpa mengubah bentuk dan ukurannya disebut...",
      options: [
        { label: "A", text: "Translasi" },
        { label: "B", text: "Dilatasi" },
        { label: "C", text: "Kromosom" },
        { label: "D", text: "Persamaan Kuadrat" }
      ],
      correct: "A",
      explanation: "Translasi adalah pergeseran posisi tanpa merubah ukuran dan bentuk."
    },
    {
      id: 7,
      level: "Mudah",
      question: "Dua bangun datar dikatakan kongruen jika memenuhi syarat berikut, KECUALI...",
      options: [
        { label: "A", text: "Sisi yang bersesuaian sama panjang" },
        { label: "B", text: "Sudut yang bersesuaian sama besar" },
        { label: "C", text: "Bentuk dan ukurannya sama persis" },
        { label: "D", text: "Ukurannya berbeda tetapi bentuknya sama" }
      ],
      correct: "D",
      explanation: "Jika ukurannya berbeda meski bentuknya sama, itu dinamakan SEBANGUN, bukan KONGRUEN."
    },
    {
      id: 8,
      level: "Mudah",
      question: "Titik F(-5, -2) jika digeser oleh T = (-1, 4) akan berada di koordinat F'...",
      options: [
        { label: "A", text: "F'(-6, 2)" },
        { label: "B", text: "F'(-4, 2)" },
        { label: "C", text: "F'(-6, -6)" },
        { label: "D", text: "F'(5, 8)" }
      ],
      correct: "A",
      explanation: "F'(-5 + (-1), -2 + 4) = F'(-6, 2)."
    },

    // --- TINGKAT SEDANG (SOAL 9-17) ---
    {
      id: 9,
      level: "Sedang",
      question: "Titik G(1, 4) dicerminkan terhadap garis y = x. Berapakah koordinat bayangan G'?",
      options: [
        { label: "A", text: "G'(4, 1)" },
        { label: "B", text: "G'(-1, -4)" },
        { label: "C", text: "G'(-4, -1)" },
        { label: "D", text: "G'(1, -4)" }
      ],
      correct: "A",
      explanation: "Pencerminan terhadap garis y = x menukar posisi koordinat: (x, y) menjadi (y, x). Maka G'(4, 1)."
    },
    {
      id: 10,
      level: "Sedang",
      question: "Titik H(3, -2) dicerminkan terhadap garis y = -x. Hasil bayangannya H' adalah...",
      options: [
        { label: "A", text: "H'(2, -3)" },
        { label: "B", text: "H'(-2, 3)" },
        { label: "C", text: "H'(-3, 2)" },
        { label: "D", text: "H'(3, 2)" }
      ],
      correct: "A",
      explanation: "Pencerminan terhadap garis y = -x: (x, y) menjadi (-y, -x). Maka H'(-(-2), -3) = H'(2, -3)."
    },
    {
      id: 11,
      level: "Sedang",
      question: "Titik I(-4, 3) dirotasikan sebesar 180 derajat terhadap titik pusat (0,0). Koordinat I' adalah...",
      options: [
        { label: "A", text: "I'(4, -3)" },
        { label: "B", text: "I'(-3, 4)" },
        { label: "C", text: "I'(3, -4)" },
        { label: "D", text: "I'(-4, -3)" }
      ],
      correct: "A",
      explanation: "Rotasi 180 derajat merubah tanda kedua koordinat: (x, y) menjadi (-x, -y). Maka I'(4, -3)."
    },
    {
      id: 12,
      level: "Sedang",
      question: "Jika titik J(6, -8) didilatasi dengan faktor skala k = 1/2 dari pusat (0,0), maka J' adalah...",
      options: [
        { label: "A", text: "J'(3, -4)" },
        { label: "B", text: "J'(12, -16)" },
        { label: "C", text: "J'(-3, 4)" },
        { label: "D", text: "J'(3, 4)" }
      ],
      correct: "A",
      explanation: "J'(6 × 1/2, -8 × 1/2) = J'(3, -4)."
    },
    {
      id: 13,
      level: "Sedang",
      question: "Titik K(2, 3) digeser oleh T1 = (1, 2) kemudian dilanjutkan dengan pergeseran T2 = (3, -1). Posisi akhir K'' adalah...",
      options: [
        { label: "A", text: "K''(6, 4)" },
        { label: "B", text: "K''(5, 4)" },
        { label: "C", text: "K''(6, 5)" },
        { label: "D", text: "K''(4, 4)" }
      ],
      correct: "A",
      explanation: "Translasi gabungan T = T1 + T2 = (1+3, 2-1) = (4, 1). K''(2+4, 3+1) = K''(6, 4)."
    },
    {
      id: 14,
      level: "Sedang",
      question: "Titik L(5, 1) dicerminkan terhadap Sumbu X, lalu dicerminkan lagi terhadap Sumbu Y. Bayangan akhir L'' adalah...",
      options: [
        { label: "A", text: "L''(-5, -1)" },
        { label: "B", text: "L''(5, -1)" },
        { label: "C", text: "L''(-5, 1)" },
        { label: "D", text: "L''(1, 5)" }
      ],
      correct: "A",
      explanation: "Cermin Sumbu X ➔ (5, -1). Dilanjutkan Cermin Sumbu Y ➔ (-5, -1)."
    },
    {
      id: 15,
      level: "Sedang",
      question: "Sebuah segitiga PQR memiliki koordinat P(1,1), Q(4,1), dan R(2,4). Jika segitiga ini digeser oleh T = (-2, 3), berapakah koordinat baru R'?",
      options: [
        { label: "A", text: "R'(0, 7)" },
        { label: "B", text: "R'(4, 7)" },
        { label: "C", text: "R'(-1, 4)" },
        { label: "D", text: "R'(0, 1)" }
      ],
      correct: "A",
      explanation: "Koordinat titik R(2, 4) digeser oleh (-2, 3) ➔ R'(2 - 2, 4 + 3) = R'(0, 7)."
    },
    {
      id: 16,
      level: "Sedang",
      question: "Dua buah segitiga memiliki dua pasangan sudut sama besar dan satu pasang sisi di antara kedua sudut tersebut sama panjang. Kriteria kekongruenan ini disebut...",
      options: [
        { label: "A", text: "Sudut - Sisi - Sudut (Sd - S - Sd)" },
        { label: "B", text: "Sisi - Sisi - Sisi (S - S - S)" },
        { label: "C", text: "Sisi - Sudut - Sisi (S - Sd - S)" },
        { label: "D", text: "Sudut - Sudut - Sudut" }
      ],
      correct: "A",
      explanation: "Kriteria dua sudut dan satu sisi di antaranya adalah Sudut - Sisi - Sudut."
    },
    {
      id: 17,
      level: "Sedang",
      question: "Titik M(-2, 4) didilatasi dengan faktor skala k = -2 dari titik pusat (0,0). Koordinat bayangan M' adalah...",
      options: [
        { label: "A", text: "M'(4, -8)" },
        { label: "B", text: "M'(-4, 8)" },
        { label: "C", text: "M'(4, 8)" },
        { label: "D", text: "M'(-2, -8)" }
      ],
      correct: "A",
      explanation: "M'(-2 × (-2), 4 × (-2)) = M'(4, -8)."
    },

    // --- TINGKAT HOTS / PROBLEM SOLVING (SOAL 18-25) ---
    {
      id: 18,
      level: "HOTS",
      question: "Pada peta denah sekolah, posisi awal perpustakaan berada di koordinat P(3, 4). Perpustakaan hendak direnovasi dan dipindahkan sejauh 4 unit ke kiri dan 5 unit ke bawah. Berapakah koordinat baru lokasi perpustakaan P'?",
      options: [
        { label: "A", text: "P'(-1, -1)" },
        { label: "B", text: "P'(7, 9)" },
        { label: "C", text: "P'(-1, 9)" },
        { label: "D", text: "P'(7, -1)" }
      ],
      correct: "A",
      explanation: "Ke kiri 4 unit ➔ a = -4. Ke bawah 5 unit ➔ b = -5. P'(3 - 4, 4 - 5) = P'(-1, -1)."
    },
    {
      id: 19,
      level: "HOTS",
      question: "Sebuah foto cetak berukuran 4 cm × 6 cm akan diperbesar (didilatasi) dengan faktor skala k = 3. Berapakah luas foto baru setelah diperbesar?",
      options: [
        { label: "A", text: "216 cm²" },
        { label: "B", text: "72 cm²" },
        { label: "C", text: "144 cm²" },
        { label: "D", text: "24 cm²" }
      ],
      correct: "A",
      explanation: "Ukuran baru: panjang = 4 × 3 = 12 cm, lebar = 6 × 3 = 18 cm. Luas baru = 12 × 18 = 216 cm²."
    },
    {
      id: 20,
      level: "HOTS",
      question: "Suatu titik N(a, b) dicerminkan terhadap Sumbu X menghasilkan bayangan N'(4, -7). Berapakah nilai awal dari a dan b?",
      options: [
        { label: "A", text: "a = 4 dan b = 7" },
        { label: "B", text: "a = -4 dan b = 7" },
        { label: "C", text: "a = 4 dan b = -7" },
        { label: "D", text: "a = -4 dan b = -7" }
      ],
      correct: "A",
      explanation: "Refleksi Sumbu X: (x, -y) = (4, -7) ➔ x = 4 dan y = 7."
    },
    {
      id: 21,
      level: "HOTS",
      question: "Titik R(2, 1) diputar 90 derajat berlawanan arah jarum jam terhadap titik pusat (0,0), lalu hasilnya dicerminkan terhadap Sumbu Y. Koordinat akhir R'' adalah...",
      options: [
        { label: "A", text: "R''(1, 2)" },
        { label: "B", text: "R''(-1, 2)" },
        { label: "C", text: "R''(1, -2)" },
        { label: "D", text: "R''(-2, 1)" }
      ],
      correct: "A",
      explanation: "Rotasi 90 deg CCW: R(2, 1) ➔ R'(-1, 2). Cermin Sumbu Y: (-x, y) ➔ R''(-(-1), 2) = R''(1, 2)."
    },
    {
      id: 22,
      level: "HOTS",
      question: "Bidak catur menteri berada di koordinat (1, 2). Bidak tersebut bergerak 3 langkah ke kanan dan 4 langkah ke atas, kemudian diputar 90 derajat searah jarum jam terhadap O(0,0). Koordinat akhir menteri adalah...",
      options: [
        { label: "A", text: "(6, -4)" },
        { label: "B", text: "(-6, 4)" },
        { label: "C", text: "(4, -6)" },
        { label: "D", text: "(-4, 6)" }
      ],
      correct: "A",
      explanation: "Langkah 1 (Translasi): (1+3, 2+4) = (4, 6). Langkah 2 (Rotasi 90 deg CW): (x, y) ➔ (y, -x) = (6, -4)."
    },
    {
      id: 23,
      level: "HOTS",
      question: "Dua buah segitiga siku-siku kongruen. Jika segitiga pertama memiliki sisi miring 13 cm dan alas 5 cm, berapakah luas segitiga kedua?",
      options: [
        { label: "A", text: "30 cm²" },
        { label: "B", text: "60 cm²" },
        { label: "C", text: "65 cm²" },
        { label: "D", text: "32.5 cm²" }
      ],
      correct: "A",
      explanation: "Tinggi segitiga = akar(13² - 5²) = akar(169 - 25) = 12 cm. Luas = (alas × tinggi)/2 = (5 × 12)/2 = 30 cm²."
    },
    {
      id: 24,
      level: "HOTS",
      question: "Titik S(x, y) ditranslasikan oleh T = (2, -3) menghasilkan S'(5, 1). Berapakah koordinat asal S(x, y)?",
      options: [
        { label: "A", text: "S(3, 4)" },
        { label: "B", text: "S(7, -2)" },
        { label: "C", text: "S(3, -2)" },
        { label: "D", text: "S(7, 4)" }
      ],
      correct: "A",
      explanation: "x + 2 = 5 ➔ x = 3. y - 3 = 1 ➔ y = 4. Maka koordinat asal S(3, 4)."
    },
    {
      id: 25,
      level: "HOTS",
      question: "Sebuah persegi panjang ABCD dengan titik A(0,0), B(4,0), C(4,2), D(0,2) didilatasi dengan faktor skala k = 2 dari titik pusat (0,0). Berapakah keliling bangun persegi panjang yang baru?",
      options: [
        { label: "A", text: "24 unit" },
        { label: "B", text: "12 unit" },
        { label: "C", text: "48 unit" },
        { label: "D", text: "16 unit" }
      ],
      correct: "A",
      explanation: "Panjang awal = 4, lebar awal = 2. Keliling awal = 2×(4+2) = 12. Karena didilatasi k = 2, Keliling baru = 12 × 2 = 24 unit."
    }
  ];

  const currentQ = questions[currentQIndex];

  const handleSelectOption = (lbl) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(lbl);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    setIsAnswerSubmitted(true);
    setUserAnswers((prev) => ({ ...prev, [currentQIndex]: selectedAnswer }));
    if (selectedAnswer === currentQ.correct) {
      setScore((prev) => prev + 4); // 25 soal x 4 poin = 100
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      onCompleteQuiz();
    }
  };

  if (quizFinished) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center space-y-6 shadow-xl border border-slate-200">
        <OwlMascot pose="selamat" size={150} className="mx-auto" />
        
        <div className="space-y-2">
          <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full uppercase">Hasil Evaluasi Pembelajaran</span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-800">SELAMAT! KUIS EVALUASI 25 SOAL SELESAI! 🎉</h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto">
            Kamu telah menyelesaikan seluruh 25 soal latihan berjenjang (Mudah, Sedang, HOTS).
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 max-w-sm mx-auto rounded-3xl p-6 text-slate-900 shadow-2xl space-y-3 border-4 border-yellow-200">
          <div className="text-xs font-bold uppercase tracking-wider">SKOR AKHIR EVALUASI KAMU</div>
          <div className="text-6xl font-black">{score} / 100</div>
          <div className="text-xs font-extrabold bg-slate-900 text-yellow-300 py-2 px-5 rounded-full inline-block mt-2">
            +50 BONUS XP DIPEROLEH!
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={() => {
              setQuizFinished(false);
              setCurrentQIndex(0);
              setScore(0);
              setSelectedAnswer(null);
              setIsAnswerSubmitted(false);
            }}
            className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all"
          >
            Ulangi Kuis Evaluasi 🔄
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Bar Soal & Grid Navigasi 25 Soal */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-amber-500" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-slate-800">Soal {currentQIndex + 1} dari 25</span>
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                  currentQ.level === 'Mudah' ? 'bg-emerald-100 text-emerald-800' :
                  currentQ.level === 'Sedang' ? 'bg-amber-100 text-amber-800' :
                  'bg-rose-100 text-rose-800'
                }`}>
                  Tingkat: {currentQ.level}
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs font-extrabold text-sky-600 bg-sky-50 px-4 py-2 rounded-full border border-sky-100">
            Skor Sementara: {score}
          </div>
        </div>

        {/* Quick Jump Grid 1-25 */}
        <div className="pt-2 border-t border-slate-100">
          <div className="text-[11px] font-bold text-slate-500 mb-2">Navigasi Soal (1–25):</div>
          <div className="flex flex-wrap gap-1.5">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentQIndex;
              const isAnswered = userAnswers[idx] !== undefined;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentQIndex(idx);
                    setSelectedAnswer(userAnswers[idx] || null);
                    setIsAnswerSubmitted(userAnswers[idx] !== undefined);
                  }}
                  className={`w-7 h-7 text-xs font-bold rounded-lg transition-all flex items-center justify-center ${
                    isCurrent
                      ? 'bg-sky-500 text-white ring-2 ring-sky-300 scale-110 font-black'
                      : isAnswered
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Area Pertanyaan & Pilihan Jawaban */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
        <h4 className="text-base sm:text-lg font-black text-slate-800 leading-relaxed">
          {currentQ.question}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentQ.options.map((opt) => {
            const isSelected = selectedAnswer === opt.label;
            const isCorrect = opt.label === currentQ.correct;

            let btnStyle = "bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50";
            if (isSelected) {
              btnStyle = "bg-sky-500 text-white border-sky-500 shadow-md font-bold";
            }
            if (isAnswerSubmitted) {
              if (isCorrect) {
                btnStyle = "bg-emerald-500 text-white border-emerald-500 font-bold shadow-md";
              } else if (isSelected && !isCorrect) {
                btnStyle = "bg-rose-500 text-white border-rose-500 font-bold";
              }
            }

            return (
              <button
                key={opt.label}
                onClick={() => handleSelectOption(opt.label)}
                className={`p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-slate-900/10 flex items-center justify-center font-bold text-xs">
                    {opt.label}
                  </span>
                  <span>{opt.text}</span>
                </div>
                {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-white" />}
              </button>
            );
          })}
        </div>

        {isAnswerSubmitted && (
          <div className="p-5 bg-sky-50 border-l-4 border-sky-500 rounded-r-2xl space-y-1 text-xs sm:text-sm text-sky-900 animate-fade-in">
            <div className="font-extrabold flex items-center gap-1.5 text-sky-700">
              <Brain className="w-4 h-4" /> Pembahasan Langkah demi Langkah:
            </div>
            <p className="font-medium leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Kontrol Navigasi Kuis */}
      <div className="flex justify-end gap-3 pt-2">
        {!isAnswerSubmitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer}
            className={`px-8 py-3.5 rounded-2xl font-extrabold text-sm shadow-md transition-all ${
              selectedAnswer
                ? 'bg-amber-400 hover:bg-amber-500 text-slate-900'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Kunci Jawaban
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="px-8 py-3.5 bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2"
          >
            <span>{currentQIndex < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}