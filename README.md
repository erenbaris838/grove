# Grove 🌱

**Odak saati / Focus timer** — Kronometre ya da Pomodoro ile çalış; her saatlik odaklanman bir ağaç büyütür ve gün boyunca küçük bir orman toplarsın.

## Özellikler

- Kronometre (tur kaydı, en hızlı / en yavaş tur, kopyalama)
- Pomodoro (odak, kısa mola, uzun mola; ayarlanabilir süreler, ses, bildirim, otomatik başlatma)
- Her 60 dakikalık çalışmada büyüyen ağaç (meşe, kiraz, çam, portakal, zeytin, akçaağaç)
- Bugünkü orman ve son 7 günün özeti
- 6 tema (Gündüz, Gece, Orman, Okyanus, Lavanta, Gün Batımı), Türkçe / İngilizce
- Telefona ve bilgisayara uygulama olarak yüklenebilir (PWA), çevrimdışı çalışır
- Klavye kısayolları: `Boşluk` başlat/durdur · `L` tur · `R` sıfırla · `1`/`2` sekme · `T` açık/koyu · `F` tam ekran

## Gizlilik

Grove hiçbir kişisel veri toplamaz. Tüm veriler yalnızca tarayıcının yerel depolamasında (localStorage) tutulur.

## Çalıştırma

Kurulum gerekmez. `index.html` dosyasını açman yeterli. Uygulama olarak yükleme ve çevrimdışı çalışma için bir web sunucusu üzerinden açılmalıdır, örneğin:

```bash
python3 -m http.server 8000
# sonra http://localhost:8000
```

### GitHub Pages ile yayınlama

Depo ayarlarında **Settings → Pages → Branch: main / (root)** seçip kaydet. Uygulama birkaç dakika içinde `https://<kullanıcı-adı>.github.io/<depo-adı>/` adresinde açılır.

## Dosyalar

| Dosya | Açıklama |
|---|---|
| `index.html` | Uygulamanın tamamı (HTML, CSS, JS) |
| `manifest.webmanifest` | PWA bilgileri |
| `sw.js` | Çevrimdışı çalışma için service worker |
| `icons/` | Uygulama ikonları |
| `fonts/` | Azeret Mono ve Instrument Sans yazı tipleri (SIL Open Font License) |

Sürüm 1.1.0
