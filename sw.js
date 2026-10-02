const CACHE = "questionari-a699c38937";
const FILES = ["./", "index.html", "compila.html", "Guida-app-questionari.pdf", "manifest.webmanifest", "icona-192.png", "moduli/Modulo_ACL-RSI.pdf", "moduli/Modulo_BPFS-provvisorio.pdf", "moduli/Modulo_CPAQ.pdf", "moduli/Modulo_CSI-I.pdf", "moduli/Modulo_DASH-I.pdf", "moduli/Modulo_HAGOS-I.pdf", "moduli/Modulo_IKDC-2000_valutazione-soggettiva.pdf", "moduli/Modulo_KOOS-I.pdf", "moduli/Modulo_LEFS-I.pdf", "moduli/Modulo_MSK-HQ-provvisorio.pdf", "moduli/Modulo_NDI-I.pdf", "moduli/Modulo_ODI-I.pdf", "moduli/Modulo_OSPRO-YF_10-item.pdf", "moduli/Modulo_OSPRO-YF_17-item.pdf", "moduli/Modulo_OSPRO-YF_7-item.pdf", "moduli/Modulo_PCS-I.pdf", "moduli/Modulo_PSEQ-I.pdf", "moduli/Modulo_QUID_Questionario-Italiano-Dolore.pdf", "moduli/Modulo_QuickDASH-I.pdf", "moduli/Modulo_RMDQ-I.pdf", "moduli/Modulo_SF-36.pdf", "moduli/Modulo_SPADI-provvisorio.pdf", "moduli/Modulo_STarT-Back-IT.pdf", "moduli/Modulo_TSK-I.pdf", "moduli/Modulo_VISA-A-I.pdf", "moduli/Modulo_WOMAC.pdf", "moduli/Modulo_\u00d6MPQ-10_short-form.pdf", "moduli/Modulo_\u00d6MPQ-21.pdf"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); } return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match("./"))));
});
