import { worlds } from "@/data";
import { useGameStore } from "@/store/game-store";

export function CertificateView() {
  const settings = useGameStore((s) => s.settings);
  const certificateDate = useGameStore((s) => s.certificateDate);
  const goMap = useGameStore((s) => s.goMap);
  const course = settings.courseName.trim() || "este grupo";
  const date = certificateDate
    ? new Date(certificateDate + "T12:00:00").toLocaleDateString("es-CL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : new Date().toLocaleDateString("es-CL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  return (
    <section className="min-h-dvh bg-cream px-4 py-8 text-ink">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex flex-wrap gap-3 print:hidden">
          <button
            type="button"
            onClick={goMap}
            className="min-h-12 rounded-xl bg-indigo px-5 font-bold text-cream"
          >
            Mapa
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-12 rounded-xl bg-coral px-5 font-bold text-paper"
          >
            Imprimir
          </button>
        </div>
        <article
          id="certificate-print"
          className="rounded-xl bg-paper p-8 text-center shadow-lg md:p-12"
          style={{ boxShadow: "inset 0 0 0 8px #2b2155, inset 0 0 0 12px #e6b84c" }}
        >
          <img
            src="/assets/brand/MIRARIM-horizontal-color.svg"
            alt="MIRARIM"
            className="mx-auto h-10"
          />
          <p className="mt-6 text-sm font-bold tracking-[0.3em] text-coral">CERTIFICADO</p>
          <h1 className="mt-3 text-3xl font-extrabold text-indigo md:text-4xl">
            Expertos en empatía
          </h1>
          <p className="mt-6 text-lg">Este certificado reconoce que</p>
          <p className="mt-2 text-2xl font-extrabold text-coral md:text-3xl">{course}</p>
          <p className="mt-4 text-lg">ha completado el viaje</p>
          <p className="mt-1 text-xl font-extrabold text-indigo">
            El viaje de los corazones
          </p>
          <div className="mx-auto mt-8 grid max-w-xl grid-cols-4 gap-3">
            {worlds.map((w) => (
              <figure key={w.id} className="space-y-2">
                <img
                  src={w.badgeSrc}
                  alt={w.badgeName}
                  className="mx-auto size-20 rounded-full object-cover"
                />
                <figcaption className="text-xs font-semibold text-muted">{w.badgeName}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-8 text-muted">Mundos completados: 4 / 4</p>
          <p className="text-muted">{date}</p>
        </article>
      </div>
    </section>
  );
}
