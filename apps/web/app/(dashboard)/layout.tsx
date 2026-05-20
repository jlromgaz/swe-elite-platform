import NavLinks from './layout/NavLinks';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 bg-slate-900 text-slate-100 z-50 flex items-center px-6 gap-6">
        <span className="font-bold text-sm tracking-wide">SWE Elite</span>
        <NavLinks />
      </header>
      <div className="pt-14">{children}</div>
    </>
  );
}
