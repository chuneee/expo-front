import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export function LandingFooter() {
  return (
    <footer className="bg-black border-t border-white/5 py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <ImageWithFallback
                src="/img/logo.jpeg"
                alt="EXPO"
                className="h-12 sm:h-14 w-auto rounded-md object-contain border border-white/10 bg-black/30 px-2"
              />
            </div>
            <p className="text-white/55 max-w-md text-sm leading-relaxed">
              Expo Mis XV y Mi Boda: un evento organizado por nuestro equipo para conectar a familias con proveedores de confianza.
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider text-white/50 mb-4">Contacto</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>hola@expo.com</li>
              <li>+52 (000) 0000-0000</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider text-white/50 mb-4">Redes</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-white/70 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="block text-white/70 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="block text-white/70 hover:text-white transition-colors">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-xs text-white/45">© {new Date().getFullYear()} EXPO. Todos los derechos reservados.</div>
          <div className="flex gap-6 text-xs text-white/45">
            <a href="#" className="hover:text-white transition-colors">
              Aviso de Privacidad
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terminos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
