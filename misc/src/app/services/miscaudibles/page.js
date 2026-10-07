export const metadata = {
  title: 'Misc Audible | Miscarchive',
  description:
    'Misc Audible is a Kerala-based audible production house for podcasts, audiobooks, and sound design.',
  keywords: 'Misc Audible, Podcast Production, Audiobook Production, Sound Design',
};

export default function page() {
  return (
    <main style={{ minHeight: "100vh", background: "#0d0d0f" }}>
      <iframe
        src="/misc01.html"
        title="Misc Audible"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          width: "100vw",
          height: "100vh",
          border: 0,
          display: "block",
          background: "#0d0d0f",
        }}
      />
    </main>
  );
}
