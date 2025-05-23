export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center text-center text-white bg-[#252422] p-4">
      <p className="text-sm sm:text-base">
        © {new Date().getFullYear()} — Ikbal Gundogdu
      </p>
    </footer>
  );
}
