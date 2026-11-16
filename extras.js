/* Grove extras: settings panel, theme scenery, 2048 break game, "back at your desk?" reminder,
   "are you there?" presence checks (fair-play) and the opt-in weekly leaderboard. */
(function () {
  'use strict';
  var A = window.GroveApp;
  if (!A) return;
  var S = A.S;

  // ---------------------------------------------------------------- strings
  var X = {
    en: { secTimer: 'Pomodoro', secBreak: 'Breaks', secFocus: 'Focus helpers', secLook: 'Look', optGame: 'Open the 2048 game when a break starts', optReturn: 'Remind me to start the timer when I’m back', optPresence: 'Ask “Are you there?” during long sessions', optIdle: 'Notice when I step away from the computer', optScene: 'Background pictures for themes', idleDenied: 'Permission wasn’t given. You can allow it in your browser settings.',
      game: 'Break game', gameGoal: 'Goal: reach 32', gameScore: 'Score', gameBest: 'Best', gameNew: 'New game', gameWin: 'Congratulations, you reached 32! 🎉 Now really take your break: stand up, stretch and drink some water.', gameKeep: 'Keep playing', gameOver: 'No more moves. Start a new game!', gameHint: 'Arrow keys or swipe', breakLeft: 'Break: {t} left', startBreak: 'Start break', breakOver: 'Break’s over! Are you there?', startFocus: 'Start focusing', playBtn: '🎮 Break game',
      backQ: 'Back at your desk? 🌱', backText: 'Don’t forget to start the timer.', startNow: 'Start', notNow: 'Not now', backNotif: 'Looks like you’re back. Start your focus timer?',
      hereQ: 'Are you there? 👋', hereText: 'Answer within {s} so your time keeps counting.', here: 'I’m here', pausedAway: 'We didn’t hear from you, so the timer was stopped at {time}.', hereNotif: 'Are you there? Tap to keep your focus time counting.',
      rank: 'Leaderboard', rankWeek: 'This week', rankJoin: 'Join', rankNick: 'Nickname', rankNickBad: 'Use 2–20 letters, numbers, spaces, dots or dashes.', rankInfo: 'Fair play: only focus time while Grove is open counts, and “Are you there?” checks must be answered. The server rejects more time than has really passed.', rankLeave: 'Leave the leaderboard', rankYou: 'you', rankEmpty: 'No one here yet. Be the first!', rankSoon: 'The leaderboard is opening soon.', rankErr: 'Couldn’t connect. Please try again later.', rankJoined: 'You joined this week’s leaderboard.', rankPrivacy: 'Joining shares your nickname and this week’s focus time. Nothing else.', rankLeft: 'You left the leaderboard.', rankRefresh: 'Refresh',
      sceneAbout: 'About this picture', sceneBy: 'Grove illustration',
      scenes: { gunduz: ['Green hills', 'Spring meadows under a soft, open sky.'], gece: ['Mountain night', 'A quiet ridge beneath the moon and stars.'], orman: ['Misty forest', 'Pine woods in the first light of morning.'], okyanus: ['Open sea', 'Calm waves and distant islands at midday.'], lavanta: ['Lavender fields', 'Purple rows stretching to the hills.'], gunbatimi: ['Desert sunset', 'Dunes glowing as the sun goes down.'] } },
    tr: { secTimer: 'Pomodoro', secBreak: 'Molalar', secFocus: 'Odak yardımcıları', secLook: 'Görünüm', optGame: 'Mola başlayınca 2048 oyununu aç', optReturn: 'Döndüğümde süreyi başlatmayı hatırlat', optPresence: 'Uzun oturumlarda “Burada mısın?” diye sor', optIdle: 'Bilgisayardan uzaklaştığımı fark et', optScene: 'Temalarda arka plan resmi', idleDenied: 'İzin verilmedi. Tarayıcı ayarlarından açabilirsin.',
      game: 'Mola oyunu', gameGoal: 'Hedef: 32’ye ulaş', gameScore: 'Puan', gameBest: 'En iyi', gameNew: 'Yeni oyun', gameWin: 'Tebrikler, 32’ye ulaştın! 🎉 Şimdi gerçekten molaya çıkabilirsin: kalk, biraz esne, su iç.', gameKeep: 'Oynamaya devam', gameOver: 'Hamle kalmadı. Yeni oyuna başla!', gameHint: 'Ok tuşları ya da kaydır', breakLeft: 'Mola: {t} kaldı', startBreak: 'Molayı başlat', breakOver: 'Mola bitti! Burada mısın?', startFocus: 'Odaklanmaya başla', playBtn: '🎮 Mola oyunu',
      backQ: 'Döndün mü? 🌱', backText: 'Süreyi başlatmayı unutma.', startNow: 'Başlat', notNow: 'Şimdi değil', backNotif: 'Masaya döndün gibi görünüyor. Odak süresini başlatalım mı?',
      hereQ: 'Burada mısın? 👋', hereText: 'Sürenin saymaya devam etmesi için {s} içinde cevap ver.', here: 'Buradayım', pausedAway: 'Senden ses çıkmadı, bu yüzden süreyi {time}’de durdurduk.', hereNotif: 'Burada mısın? Süren saymaya devam etsin diye dokun.',
      rank: 'Sıralama', rankWeek: 'Bu hafta', rankJoin: 'Katıl', rankNick: 'Takma ad', rankNickBad: '2–20 harf, rakam, boşluk, nokta ya da tire kullan.', rankInfo: 'Adil oyun: sadece Grove açıkken geçen odak süresi sayılır ve “Burada mısın?” sorularına cevap vermek gerekir. Sunucu, gerçekte geçen süreden fazlasını kabul etmez.', rankLeave: 'Sıralamadan ayrıl', rankYou: 'sen', rankEmpty: 'Henüz kimse yok. İlk sen ol!', rankSoon: 'Sıralama çok yakında açılıyor.', rankErr: 'Bağlanılamadı. Biraz sonra tekrar dene.', rankJoined: 'Bu haftanın sıralamasına katıldın.', rankPrivacy: 'Katılınca sadece takma adın ve bu haftaki odak süren paylaşılır.', rankLeft: 'Sıralamadan ayrıldın.', rankRefresh: 'Yenile',
      sceneAbout: 'Bu resim hakkında', sceneBy: 'Grove illüstrasyonu',
      scenes: { gunduz: ['Yeşil tepeler', 'Açık bir gökyüzü altında bahar çayırları.'], gece: ['Dağda gece', 'Ay ve yıldızların altında sessiz bir sırt.'], orman: ['Sisli orman', 'Sabahın ilk ışığında çam ormanı.'], okyanus: ['Açık deniz', 'Öğle vakti sakin dalgalar ve uzak adalar.'], lavanta: ['Lavanta tarlaları', 'Tepelere uzanan mor sıralar.'], gunbatimi: ['Çölde gün batımı', 'Güneş batarken parlayan kum tepeleri.'] } },
    de: { secTimer: 'Pomodoro', secBreak: 'Pausen', secFocus: 'Fokus-Helfer', secLook: 'Aussehen', optGame: '2048 öffnen, wenn eine Pause beginnt', optReturn: 'Erinnern, den Timer zu starten, wenn ich zurück bin', optPresence: 'In langen Sitzungen „Bist du da?“ fragen', optIdle: 'Bemerken, wenn ich vom Computer weg bin', optScene: 'Hintergrundbilder für Designs', idleDenied: 'Keine Berechtigung erteilt. Du kannst sie in den Browsereinstellungen erlauben.',
      game: 'Pausenspiel', gameGoal: 'Ziel: 32 erreichen', gameScore: 'Punkte', gameBest: 'Bestwert', gameNew: 'Neues Spiel', gameWin: 'Glückwunsch, du hast 32 erreicht! 🎉 Jetzt mach wirklich Pause: aufstehen, strecken, etwas trinken.', gameKeep: 'Weiterspielen', gameOver: 'Keine Züge mehr. Starte ein neues Spiel!', gameHint: 'Pfeiltasten oder wischen', breakLeft: 'Pause: noch {t}', startBreak: 'Pause starten', breakOver: 'Pause vorbei! Bist du da?', startFocus: 'Fokus starten', playBtn: '🎮 Pausenspiel',
      backQ: 'Wieder am Platz? 🌱', backText: 'Vergiss nicht, den Timer zu starten.', startNow: 'Starten', notNow: 'Nicht jetzt', backNotif: 'Du scheinst zurück zu sein. Fokus-Timer starten?',
      hereQ: 'Bist du da? 👋', hereText: 'Antworte innerhalb von {s}, damit deine Zeit weiterläuft.', here: 'Ich bin da', pausedAway: 'Keine Antwort, daher wurde der Timer um {time} gestoppt.', hereNotif: 'Bist du da? Tippe, damit deine Fokuszeit weiterläuft.',
      rank: 'Rangliste', rankWeek: 'Diese Woche', rankJoin: 'Mitmachen', rankNick: 'Spitzname', rankNickBad: '2–20 Buchstaben, Zahlen, Leerzeichen, Punkte oder Bindestriche.', rankInfo: 'Fair Play: Es zählt nur Fokuszeit, während Grove offen ist, und „Bist du da?“-Fragen müssen beantwortet werden. Der Server lehnt mehr Zeit ab, als wirklich vergangen ist.', rankLeave: 'Rangliste verlassen', rankYou: 'du', rankEmpty: 'Noch niemand da. Sei die oder der Erste!', rankSoon: 'Die Rangliste startet bald.', rankErr: 'Keine Verbindung. Bitte später erneut versuchen.', rankJoined: 'Du bist der Rangliste dieser Woche beigetreten.', rankPrivacy: 'Beim Mitmachen werden nur dein Spitzname und deine Fokuszeit dieser Woche geteilt.', rankLeft: 'Du hast die Rangliste verlassen.', rankRefresh: 'Aktualisieren',
      sceneAbout: 'Über dieses Bild', sceneBy: 'Grove-Illustration',
      scenes: { gunduz: ['Grüne Hügel', 'Frühlingswiesen unter weitem Himmel.'], gece: ['Bergnacht', 'Ein stiller Grat unter Mond und Sternen.'], orman: ['Nebelwald', 'Kiefernwald im ersten Morgenlicht.'], okyanus: ['Offenes Meer', 'Ruhige Wellen und ferne Inseln am Mittag.'], lavanta: ['Lavendelfelder', 'Lila Reihen bis zu den Hügeln.'], gunbatimi: ['Wüstenabend', 'Dünen, die im Sonnenuntergang leuchten.'] } },
    es: { secTimer: 'Pomodoro', secBreak: 'Descansos', secFocus: 'Ayudas de enfoque', secLook: 'Apariencia', optGame: 'Abrir 2048 cuando empiece un descanso', optReturn: 'Recordarme iniciar el temporizador al volver', optPresence: 'Preguntar “¿Sigues ahí?” en sesiones largas', optIdle: 'Detectar cuando me alejo del ordenador', optScene: 'Imágenes de fondo en los temas', idleDenied: 'No se dio el permiso. Puedes permitirlo en los ajustes del navegador.',
      game: 'Juego de descanso', gameGoal: 'Meta: llegar a 32', gameScore: 'Puntos', gameBest: 'Récord', gameNew: 'Nuevo juego', gameWin: '¡Enhorabuena, llegaste a 32! 🎉 Ahora descansa de verdad: levántate, estírate y bebe agua.', gameKeep: 'Seguir jugando', gameOver: 'No quedan movimientos. ¡Empieza otro juego!', gameHint: 'Flechas o desliza', breakLeft: 'Descanso: quedan {t}', startBreak: 'Iniciar descanso', breakOver: '¡Se acabó el descanso! ¿Sigues ahí?', startFocus: 'Empezar a enfocarme', playBtn: '🎮 Juego de descanso',
      backQ: '¿Has vuelto? 🌱', backText: 'No olvides iniciar el temporizador.', startNow: 'Iniciar', notNow: 'Ahora no', backNotif: 'Parece que has vuelto. ¿Iniciamos el temporizador?',
      hereQ: '¿Sigues ahí? 👋', hereText: 'Responde en {s} para que tu tiempo siga contando.', here: 'Aquí estoy', pausedAway: 'No respondiste, así que el temporizador se detuvo a las {time}.', hereNotif: '¿Sigues ahí? Toca para que tu tiempo siga contando.',
      rank: 'Clasificación', rankWeek: 'Esta semana', rankJoin: 'Unirme', rankNick: 'Apodo', rankNickBad: 'Usa 2–20 letras, números, espacios, puntos o guiones.', rankInfo: 'Juego limpio: solo cuenta el tiempo con Grove abierto y hay que responder a “¿Sigues ahí?”. El servidor rechaza más tiempo del que realmente ha pasado.', rankLeave: 'Salir de la clasificación', rankYou: 'tú', rankEmpty: 'Aún no hay nadie. ¡Sé el primero!', rankSoon: 'La clasificación abrirá pronto.', rankErr: 'No se pudo conectar. Inténtalo más tarde.', rankJoined: 'Te uniste a la clasificación de esta semana.', rankPrivacy: 'Al unirte solo se comparten tu apodo y tu tiempo de enfoque de esta semana.', rankLeft: 'Saliste de la clasificación.', rankRefresh: 'Actualizar',
      sceneAbout: 'Sobre esta imagen', sceneBy: 'Ilustración de Grove',
      scenes: { gunduz: ['Colinas verdes', 'Prados de primavera bajo un cielo abierto.'], gece: ['Noche en la montaña', 'Una cresta tranquila bajo la luna y las estrellas.'], orman: ['Bosque con niebla', 'Pinar con la primera luz de la mañana.'], okyanus: ['Mar abierto', 'Olas tranquilas e islas lejanas al mediodía.'], lavanta: ['Campos de lavanda', 'Hileras moradas hasta las colinas.'], gunbatimi: ['Atardecer en el desierto', 'Dunas que brillan al ponerse el sol.'] } },
    fr: { secTimer: 'Pomodoro', secBreak: 'Pauses', secFocus: 'Aides à la concentration', secLook: 'Apparence', optGame: 'Ouvrir 2048 quand une pause commence', optReturn: 'Me rappeler de lancer le minuteur à mon retour', optPresence: 'Demander « Tu es là ? » pendant les longues sessions', optIdle: 'Détecter quand je m’éloigne de l’ordinateur', optScene: 'Images de fond pour les thèmes', idleDenied: 'Autorisation refusée. Tu peux l’autoriser dans les réglages du navigateur.',
      game: 'Jeu de pause', gameGoal: 'Objectif : atteindre 32', gameScore: 'Score', gameBest: 'Record', gameNew: 'Nouvelle partie', gameWin: 'Bravo, tu as atteint 32 ! 🎉 Maintenant, fais vraiment une pause : lève-toi, étire-toi, bois de l’eau.', gameKeep: 'Continuer', gameOver: 'Plus de coups possibles. Lance une nouvelle partie !', gameHint: 'Flèches ou glisser', breakLeft: 'Pause : encore {t}', startBreak: 'Lancer la pause', breakOver: 'Pause terminée ! Tu es là ?', startFocus: 'Me concentrer', playBtn: '🎮 Jeu de pause',
      backQ: 'De retour ? 🌱', backText: 'N’oublie pas de lancer le minuteur.', startNow: 'Lancer', notNow: 'Pas maintenant', backNotif: 'On dirait que tu es de retour. Lancer le minuteur ?',
      hereQ: 'Tu es là ? 👋', hereText: 'Réponds dans les {s} pour que ton temps continue de compter.', here: 'Je suis là', pausedAway: 'Pas de réponse, le minuteur a donc été arrêté à {time}.', hereNotif: 'Tu es là ? Touche pour que ton temps continue de compter.',
      rank: 'Classement', rankWeek: 'Cette semaine', rankJoin: 'Rejoindre', rankNick: 'Pseudo', rankNickBad: 'Utilise 2 à 20 lettres, chiffres, espaces, points ou tirets.', rankInfo: 'Fair-play : seul le temps passé avec Grove ouvert compte, et il faut répondre aux « Tu es là ? ». Le serveur refuse plus de temps qu’il ne s’en est réellement écoulé.', rankLeave: 'Quitter le classement', rankYou: 'toi', rankEmpty: 'Personne pour l’instant. Sois le premier !', rankSoon: 'Le classement ouvre bientôt.', rankErr: 'Connexion impossible. Réessaie plus tard.', rankJoined: 'Tu as rejoint le classement de la semaine.', rankPrivacy: 'En rejoignant, seuls ton pseudo et ton temps de concentration de la semaine sont partagés.', rankLeft: 'Tu as quitté le classement.', rankRefresh: 'Actualiser',
      sceneAbout: 'À propos de cette image', sceneBy: 'Illustration Grove',
      scenes: { gunduz: ['Collines vertes', 'Prairies de printemps sous un ciel dégagé.'], gece: ['Nuit en montagne', 'Une crête paisible sous la lune et les étoiles.'], orman: ['Forêt brumeuse', 'Pinède aux premières lueurs du matin.'], okyanus: ['Pleine mer', 'Vagues calmes et îles lointaines à midi.'], lavanta: ['Champs de lavande', 'Rangs violets jusqu’aux collines.'], gunbatimi: ['Coucher de soleil sur le désert', 'Des dunes qui brillent au soleil couchant.'] } },
    it: { secTimer: 'Pomodoro', secBreak: 'Pause', secFocus: 'Aiuti alla concentrazione', secLook: 'Aspetto', optGame: 'Apri 2048 quando inizia una pausa', optReturn: 'Ricordami di avviare il timer quando torno', optPresence: 'Chiedi “Ci sei?” nelle sessioni lunghe', optIdle: 'Accorgiti quando mi allontano dal computer', optScene: 'Immagini di sfondo per i temi', idleDenied: 'Permesso non concesso. Puoi abilitarlo nelle impostazioni del browser.',
      game: 'Gioco della pausa', gameGoal: 'Obiettivo: arrivare a 32', gameScore: 'Punti', gameBest: 'Record', gameNew: 'Nuova partita', gameWin: 'Complimenti, sei arrivato a 32! 🎉 Ora fai davvero pausa: alzati, stirati e bevi un po’ d’acqua.', gameKeep: 'Continua a giocare', gameOver: 'Nessuna mossa rimasta. Inizia una nuova partita!', gameHint: 'Frecce o scorri', breakLeft: 'Pausa: mancano {t}', startBreak: 'Avvia la pausa', breakOver: 'Pausa finita! Ci sei?', startFocus: 'Inizia a concentrarti', playBtn: '🎮 Gioco della pausa',
      backQ: 'Sei tornato? 🌱', backText: 'Non dimenticare di avviare il timer.', startNow: 'Avvia', notNow: 'Non ora', backNotif: 'Sembra che tu sia tornato. Avviamo il timer?',
      hereQ: 'Ci sei? 👋', hereText: 'Rispondi entro {s} perché il tempo continui a contare.', here: 'Ci sono', pausedAway: 'Nessuna risposta, quindi il timer è stato fermato alle {time}.', hereNotif: 'Ci sei? Tocca perché il tuo tempo continui a contare.',
      rank: 'Classifica', rankWeek: 'Questa settimana', rankJoin: 'Partecipa', rankNick: 'Soprannome', rankNickBad: 'Usa 2–20 lettere, numeri, spazi, punti o trattini.', rankInfo: 'Fair play: conta solo il tempo con Grove aperto e bisogna rispondere ai “Ci sei?”. Il server rifiuta più tempo di quello realmente trascorso.', rankLeave: 'Esci dalla classifica', rankYou: 'tu', rankEmpty: 'Ancora nessuno. Sii il primo!', rankSoon: 'La classifica apre presto.', rankErr: 'Connessione non riuscita. Riprova più tardi.', rankJoined: 'Sei entrato nella classifica di questa settimana.', rankPrivacy: 'Partecipando condividi solo il soprannome e il tempo di concentrazione della settimana.', rankLeft: 'Sei uscito dalla classifica.', rankRefresh: 'Aggiorna',
      sceneAbout: 'Informazioni sull’immagine', sceneBy: 'Illustrazione di Grove',
      scenes: { gunduz: ['Colline verdi', 'Prati primaverili sotto un cielo aperto.'], gece: ['Notte in montagna', 'Un crinale silenzioso sotto luna e stelle.'], orman: ['Bosco nella nebbia', 'Pineta alle prime luci del mattino.'], okyanus: ['Mare aperto', 'Onde calme e isole lontane a mezzogiorno.'], lavanta: ['Campi di lavanda', 'Filari viola fino alle colline.'], gunbatimi: ['Tramonto nel deserto', 'Dune che brillano al calar del sole.'] } },
    pt: { secTimer: 'Pomodoro', secBreak: 'Pausas', secFocus: 'Ajudas de foco', secLook: 'Aparência', optGame: 'Abrir o 2048 quando uma pausa começar', optReturn: 'Lembrar de iniciar o timer quando eu voltar', optPresence: 'Perguntar “Você está aí?” em sessões longas', optIdle: 'Perceber quando eu me afasto do computador', optScene: 'Imagens de fundo nos temas', idleDenied: 'A permissão não foi dada. Você pode permitir nas configurações do navegador.',
      game: 'Jogo da pausa', gameGoal: 'Meta: chegar a 32', gameScore: 'Pontos', gameBest: 'Recorde', gameNew: 'Novo jogo', gameWin: 'Parabéns, você chegou a 32! 🎉 Agora faça a pausa de verdade: levante, alongue-se e beba água.', gameKeep: 'Continuar jogando', gameOver: 'Sem jogadas. Comece um novo jogo!', gameHint: 'Setas ou deslize', breakLeft: 'Pausa: faltam {t}', startBreak: 'Iniciar pausa', breakOver: 'A pausa acabou! Você está aí?', startFocus: 'Começar a focar', playBtn: '🎮 Jogo da pausa',
      backQ: 'Voltou? 🌱', backText: 'Não esqueça de iniciar o timer.', startNow: 'Iniciar', notNow: 'Agora não', backNotif: 'Parece que você voltou. Vamos iniciar o timer?',
      hereQ: 'Você está aí? 👋', hereText: 'Responda em {s} para seu tempo continuar contando.', here: 'Estou aqui', pausedAway: 'Sem resposta, então o timer foi parado às {time}.', hereNotif: 'Você está aí? Toque para seu tempo continuar contando.',
      rank: 'Ranking', rankWeek: 'Esta semana', rankJoin: 'Participar', rankNick: 'Apelido', rankNickBad: 'Use 2–20 letras, números, espaços, pontos ou hífens.', rankInfo: 'Jogo limpo: só conta o tempo com o Grove aberto e é preciso responder aos “Você está aí?”. O servidor recusa mais tempo do que realmente passou.', rankLeave: 'Sair do ranking', rankYou: 'você', rankEmpty: 'Ninguém ainda. Seja o primeiro!', rankSoon: 'O ranking abre em breve.', rankErr: 'Não foi possível conectar. Tente mais tarde.', rankJoined: 'Você entrou no ranking desta semana.', rankPrivacy: 'Ao participar, só seu apelido e seu tempo de foco da semana são compartilhados.', rankLeft: 'Você saiu do ranking.', rankRefresh: 'Atualizar',
      sceneAbout: 'Sobre esta imagem', sceneBy: 'Ilustração do Grove',
      scenes: { gunduz: ['Colinas verdes', 'Campos de primavera sob um céu aberto.'], gece: ['Noite na montanha', 'Uma serra tranquila sob a lua e as estrelas.'], orman: ['Floresta na névoa', 'Pinheiral na primeira luz da manhã.'], okyanus: ['Mar aberto', 'Ondas calmas e ilhas distantes ao meio-dia.'], lavanta: ['Campos de lavanda', 'Fileiras roxas até as colinas.'], gunbatimi: ['Pôr do sol no deserto', 'Dunas brilhando ao entardecer.'] } },
    ru: { secTimer: 'Помодоро', secBreak: 'Перерывы', secFocus: 'Помощь в фокусе', secLook: 'Внешний вид', optGame: 'Открывать 2048, когда начинается перерыв', optReturn: 'Напоминать запустить таймер, когда я вернусь', optPresence: 'Спрашивать «Вы здесь?» в долгих сессиях', optIdle: 'Замечать, когда я отхожу от компьютера', optScene: 'Фоновые картинки для тем', idleDenied: 'Разрешение не выдано. Его можно включить в настройках браузера.',
      game: 'Игра на перерыв', gameGoal: 'Цель: дойти до 32', gameScore: 'Очки', gameBest: 'Рекорд', gameNew: 'Новая игра', gameWin: 'Поздравляем, вы дошли до 32! 🎉 Теперь отдохните по-настоящему: встаньте, потянитесь, выпейте воды.', gameKeep: 'Играть дальше', gameOver: 'Ходов больше нет. Начните новую игру!', gameHint: 'Стрелки или свайп', breakLeft: 'Перерыв: осталось {t}', startBreak: 'Начать перерыв', breakOver: 'Перерыв окончен! Вы здесь?', startFocus: 'Начать фокус', playBtn: '🎮 Игра на перерыв',
      backQ: 'Вернулись? 🌱', backText: 'Не забудьте запустить таймер.', startNow: 'Старт', notNow: 'Не сейчас', backNotif: 'Похоже, вы вернулись. Запустить таймер?',
      hereQ: 'Вы здесь? 👋', hereText: 'Ответьте в течение {s}, чтобы время продолжало считаться.', here: 'Я здесь', pausedAway: 'Ответа не было, поэтому таймер остановлен в {time}.', hereNotif: 'Вы здесь? Нажмите, чтобы время продолжало считаться.',
      rank: 'Рейтинг', rankWeek: 'Эта неделя', rankJoin: 'Участвовать', rankNick: 'Ник', rankNickBad: 'Используйте 2–20 букв, цифр, пробелов, точек или дефисов.', rankInfo: 'Честная игра: считается только время, когда Grove открыт, и нужно отвечать на «Вы здесь?». Сервер не примет больше времени, чем прошло на самом деле.', rankLeave: 'Выйти из рейтинга', rankYou: 'вы', rankEmpty: 'Пока никого. Будьте первым!', rankSoon: 'Рейтинг скоро откроется.', rankErr: 'Не удалось подключиться. Попробуйте позже.', rankJoined: 'Вы участвуете в рейтинге этой недели.', rankPrivacy: 'При участии публикуются только ваш ник и время фокуса за неделю.', rankLeft: 'Вы вышли из рейтинга.', rankRefresh: 'Обновить',
      sceneAbout: 'Об этой картинке', sceneBy: 'Иллюстрация Grove',
      scenes: { gunduz: ['Зелёные холмы', 'Весенние луга под ясным небом.'], gece: ['Ночь в горах', 'Тихий хребет под луной и звёздами.'], orman: ['Туманный лес', 'Сосновый бор в первых лучах утра.'], okyanus: ['Открытое море', 'Спокойные волны и далёкие острова в полдень.'], lavanta: ['Лавандовые поля', 'Фиолетовые ряды до самых холмов.'], gunbatimi: ['Закат в пустыне', 'Дюны, сияющие на закате.'] } },
    ja: { secTimer: 'ポモドーロ', secBreak: '休憩', secFocus: '集中サポート', secLook: '見た目', optGame: '休憩が始まったら2048を開く', optReturn: '戻ってきたらタイマー開始をお知らせ', optPresence: '長いセッション中に「いますか？」と確認', optIdle: 'パソコンから離れたことを検知', optScene: 'テーマの背景画像', idleDenied: '許可されませんでした。ブラウザの設定で許可できます。',
      game: '休憩ゲーム', gameGoal: '目標：32を作る', gameScore: 'スコア', gameBest: 'ベスト', gameNew: '新しいゲーム', gameWin: 'おめでとう、32に到達しました！🎉 さあ本当に休憩しましょう。立ち上がって伸びをして、水を飲みましょう。', gameKeep: '続ける', gameOver: 'もう動かせません。新しいゲームを始めましょう！', gameHint: '矢印キーまたはスワイプ', breakLeft: '休憩：残り{t}', startBreak: '休憩を始める', breakOver: '休憩終了！いますか？', startFocus: '集中を始める', playBtn: '🎮 休憩ゲーム',
      backQ: 'おかえりなさい 🌱', backText: 'タイマーを始めるのを忘れずに。', startNow: '開始', notNow: '今はしない', backNotif: '戻ってきたようです。集中タイマーを始めますか？',
      hereQ: 'いますか？👋', hereText: '{s}以内に応答すると時間が引き続きカウントされます。', here: 'います', pausedAway: '応答がなかったため、{time}でタイマーを止めました。', hereNotif: 'いますか？タップすると集中時間のカウントが続きます。',
      rank: 'ランキング', rankWeek: '今週', rankJoin: '参加する', rankNick: 'ニックネーム', rankNickBad: '2〜20文字の文字・数字・スペース・ピリオド・ハイフンを使ってください。', rankInfo: 'フェアプレー：Grove を開いている間の集中時間だけが数えられ、「いますか？」に答える必要があります。サーバーは実際に経過した以上の時間を受け付けません。', rankLeave: 'ランキングから抜ける', rankYou: 'あなた', rankEmpty: 'まだ誰もいません。一番乗りしましょう！', rankSoon: 'ランキングはまもなく公開されます。', rankErr: '接続できませんでした。後でもう一度お試しください。', rankJoined: '今週のランキングに参加しました。', rankPrivacy: '参加すると、ニックネームと今週の集中時間だけが共有されます。', rankLeft: 'ランキングから抜けました。', rankRefresh: '更新',
      sceneAbout: 'この画像について', sceneBy: 'Grove のイラスト',
      scenes: { gunduz: ['緑の丘', '広い空の下の春の草原。'], gece: ['山の夜', '月と星の下の静かな稜線。'], orman: ['霧の森', '朝の最初の光に包まれた松林。'], okyanus: ['大海原', '昼下がりの穏やかな波と遠くの島々。'], lavanta: ['ラベンダー畑', '丘まで続く紫の列。'], gunbatimi: ['砂漠の夕日', '夕日に輝く砂丘。'] } },
    zh: { secTimer: '番茄钟', secBreak: '休息', secFocus: '专注助手', secLook: '外观', optGame: '休息开始时打开 2048', optReturn: '回来时提醒我开始计时', optPresence: '长时间专注时询问“你还在吗？”', optIdle: '察觉我离开电脑', optScene: '主题背景图片', idleDenied: '未获得权限。你可以在浏览器设置中允许。',
      game: '休息小游戏', gameGoal: '目标：合成 32', gameScore: '得分', gameBest: '最高', gameNew: '新游戏', gameWin: '恭喜，你合成了 32！🎉 现在真的去休息吧：站起来，伸个懒腰，喝点水。', gameKeep: '继续玩', gameOver: '没有可走的步了，开始新游戏吧！', gameHint: '方向键或滑动', breakLeft: '休息：还剩 {t}', startBreak: '开始休息', breakOver: '休息结束！你还在吗？', startFocus: '开始专注', playBtn: '🎮 休息小游戏',
      backQ: '回来了吗？🌱', backText: '别忘了开始计时。', startNow: '开始', notNow: '暂不', backNotif: '你好像回来了。要开始专注计时吗？',
      hereQ: '你还在吗？👋', hereText: '请在 {s} 内回应，时间才会继续计算。', here: '我在', pausedAway: '没有收到回应，计时已在 {time} 停止。', hereNotif: '你还在吗？点按以继续计算专注时间。',
      rank: '排行榜', rankWeek: '本周', rankJoin: '加入', rankNick: '昵称', rankNickBad: '请使用 2–20 个字母、数字、空格、点或连字符。', rankInfo: '公平竞赛：只计算 Grove 打开时的专注时间，并且需要回应“你还在吗？”。服务器不会接受超过实际经过的时间。', rankLeave: '退出排行榜', rankYou: '你', rankEmpty: '还没有人，来做第一个吧！', rankSoon: '排行榜即将开放。', rankErr: '无法连接，请稍后再试。', rankJoined: '你已加入本周排行榜。', rankPrivacy: '加入后只会分享你的昵称和本周专注时间。', rankLeft: '你已退出排行榜。', rankRefresh: '刷新',
      sceneAbout: '关于这张图片', sceneBy: 'Grove 插画',
      scenes: { gunduz: ['绿色山丘', '开阔天空下的春日草地。'], gece: ['山中夜色', '月亮和星空下宁静的山脊。'], orman: ['雾中森林', '清晨第一缕阳光中的松林。'], okyanus: ['辽阔大海', '正午平静的海浪和远处的小岛。'], lavanta: ['薰衣草田', '一直延伸到山丘的紫色花垄。'], gunbatimi: ['沙漠日落', '夕阳下发光的沙丘。'] } }
  };
  var WN = { en: 'New in Grove: a 2048 break game, theme scenery and a settings panel 🌱', tr: 'Grove’da yeni: 2048 mola oyunu, tema manzaraları ve ayarlar paneli 🌱', de: 'Neu in Grove: 2048-Pausenspiel, Landschaften zu den Designs und Einstellungen 🌱', es: 'Novedades en Grove: juego 2048 para descansos, paisajes en los temas y panel de ajustes 🌱', fr: 'Nouveau dans Grove : jeu 2048 pour les pauses, paysages et panneau de réglages 🌱', it: 'Novità in Grove: gioco 2048 per le pause, paesaggi nei temi e pannello impostazioni 🌱', pt: 'Novidades no Grove: jogo 2048 nas pausas, paisagens nos temas e painel de configurações 🌱', ru: 'Новое в Grove: игра 2048 на перерыв, пейзажи для тем и панель настроек 🌱', ja: 'Grove の新機能：休憩用2048ゲーム、テーマの風景、設定パネル 🌱', zh: 'Grove 新功能：休息小游戏 2048、主题风景和设置面板 🌱' };
  Object.keys(WN).forEach(function (c) { X[c].whatsNew = WN[c]; });
  var LANGS = window.GROVE_LANGS || {};
  Object.keys(X).forEach(function (c) { if (LANGS[c]) Object.keys(X[c]).forEach(function (k) { LANGS[c][k] = X[c][k]; }); });
  var t = A.t, raw = A.raw;

  // ---------------------------------------------------------------- state
  var D = { game: true, ret: true, presence: true, idle: false, scene: true };
  S.x = S.x && typeof S.x === 'object' ? S.x : {};
  Object.keys(D).forEach(function (k) { if (typeof S.x[k] !== 'boolean') S.x[k] = D[k]; });
  if (!S.x.g || !Array.isArray(S.x.g.grid) || S.x.g.grid.length !== 16) S.x.g = null;
  if (!S.x.lb || typeof S.x.lb !== 'object') S.x.lb = {};

  function $(id) { return document.getElementById(id); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function anyRunning() { return S.sw.running || S.pomo.running; }
  function clock(ms) { return A.fmtClock(ms); }
  function hhmm(d) { return d.toLocaleTimeString(A.locale(), { hour: '2-digit', minute: '2-digit' }); }

  // ---------------------------------------------------------------- styles
  var css = '' +
    '.scene{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:0;transition:opacity .6s}' +
    '.scene.on{opacity:1}.scene svg{width:100%;height:100%;display:block}' +
    '.scene::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,color-mix(in srgb,var(--bg) 62%,transparent),transparent 42%),color-mix(in srgb,var(--bg) 14%,transparent)}' +
    'html.has-scene body{background:var(--bg)}html.has-scene .app{position:relative;z-index:1}' +
    'html.has-scene .keys span{background:color-mix(in srgb,var(--bg) 72%,transparent);padding:2px 8px;border-radius:8px}' +
    'html.has-scene .tabs{box-shadow:0 1px 0 rgb(0 0 0/.04)}html.has-scene .icon-btn{background:color-mix(in srgb,var(--bg) 70%,transparent)}' +
    '.scene-info{position:fixed;right:14px;bottom:12px;z-index:5;display:flex;flex-direction:column;align-items:flex-end;gap:6px;font-size:.78rem;max-width:280px}' +
    '.scene-info button{display:inline-flex;align-items:center;gap:6px;border:0;border-radius:999px;padding:6px 11px;background:color-mix(in srgb,var(--bg) 78%,transparent);color:var(--fg);font-weight:600;cursor:pointer;backdrop-filter:blur(6px)}' +
    '.scene-info .card{background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(8px);border:1px solid var(--line);border-radius:14px;padding:10px 12px;line-height:1.4;box-shadow:0 10px 30px -12px rgb(0 0 0/.4)}' +
    '.scene-info .card b{display:block;font-size:.88rem}.scene-info .card small{display:block;color:var(--muted);margin-top:4px}' +
    '.set-sec{margin-top:18px}.set-sec:first-of-type{margin-top:14px}.set-sec .menu-title{margin:0 0 8px}' +
    '.sw-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:9px 0;border-bottom:1px solid var(--line);font-size:.9rem;cursor:pointer}' +
    '.sw-row:last-child{border-bottom:0}.sw-row input{appearance:none;-webkit-appearance:none;flex:none;width:40px;height:23px;border-radius:999px;background:var(--line);position:relative;cursor:pointer;transition:background .2s;margin:0}' +
    '.sw-row input::after{content:"";position:absolute;top:3px;left:3px;width:17px;height:17px;border-radius:50%;background:#fff;transition:transform .2s;box-shadow:0 1px 2px rgb(0 0 0/.3)}' +
    '.sw-row input:checked{background:var(--go)}.sw-row input:checked::after{transform:translateX(17px)}' +
    '#setSheet .set-grid{padding:0}#setSheet .checks{display:none}' +
    '.g-head{display:flex;align-items:center;justify-content:space-between;gap:10px}.g-head h2{margin:0;font-size:1.3rem}' +
    '.g-sub{color:var(--muted);font-size:.85rem;margin-top:2px;min-height:1.2em}' +
    '.g-scores{display:flex;gap:8px}.g-scores div{background:var(--surface);border-radius:10px;padding:4px 10px;text-align:center;min-width:64px}' +
    '.g-scores span{display:block;font-size:.66rem;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.06em}.g-scores b{font-family:var(--font-digits);font-weight:600}' +
    '.g-board{position:relative;margin:14px auto 0;width:min(100%,340px);aspect-ratio:1;background:color-mix(in srgb,var(--line) 80%,var(--surface));border-radius:14px;padding:8px;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,1fr);gap:8px;touch-action:none;user-select:none}' +
    '.g-cell{border-radius:9px;background:color-mix(in srgb,var(--bg) 55%,var(--surface));display:grid;place-items:center;font-family:var(--font-digits);font-weight:700;font-size:clamp(1.1rem,6vw,1.7rem);color:var(--fg)}' +
    '.g-cell.v{color:#fff}.g-cell.new{animation:gpop .18s ease-out}.g-cell.mrg{animation:gbump .2s ease-out}' +
    '@keyframes gpop{from{transform:scale(.4);opacity:.3}to{transform:scale(1);opacity:1}}@keyframes gbump{50%{transform:scale(1.12)}}' +
    '.g-goal{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:12px;font-size:.85rem;font-weight:600}' +
    '.g-goal .bar{flex:1;height:6px;border-radius:3px;background:var(--surface);overflow:hidden}.g-goal .bar i{display:block;height:100%;background:var(--go);width:0;transition:width .3s}' +
    '.g-msg{margin-top:12px;padding:12px 14px;border-radius:14px;background:color-mix(in srgb,var(--go) 12%,var(--bg));border:1px solid color-mix(in srgb,var(--go) 35%,var(--line));font-size:.9rem;line-height:1.45}' +
    '.g-msg .row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}' +
    '.nudge{position:fixed;left:50%;top:calc(76px + env(safe-area-inset-top,0px));transform:translate(-50%,-12px);opacity:0;pointer-events:none;z-index:35;width:max-content;max-width:min(520px,calc(100% - 32px));background:var(--bg);color:var(--fg);border:1px solid var(--line);border-radius:16px;padding:12px 14px;box-shadow:0 18px 40px -14px rgb(0 0 0/.45);transition:opacity .25s,transform .25s;display:flex;align-items:center;gap:12px;flex-wrap:wrap}' +
    '.nudge.show{opacity:1;transform:translate(-50%,0);pointer-events:auto}.nudge p{margin:0;font-size:.9rem;line-height:1.35;flex:1 1 200px}.nudge p b{display:block}.nudge .row{display:flex;gap:6px}' +
    '.here-ring{font-family:var(--font-digits);font-weight:700;color:var(--stop)}' +
    '.rk-list{list-style:none;margin:14px 0 0;padding:0;max-height:min(46vh,380px);overflow:auto}' +
    '.rk-list li{display:grid;grid-template-columns:2.2em 1fr auto;gap:8px;align-items:center;padding:9px 6px;border-bottom:1px solid var(--line);font-size:.92rem}' +
    '.rk-list li.me{background:color-mix(in srgb,var(--go) 12%,transparent);border-radius:10px}.rk-list .n{font-family:var(--font-digits);color:var(--muted);text-align:right}' +
    '.rk-list .tm{font-family:var(--font-digits)}.rk-list li:nth-child(1) .n::before{content:"🥇"}.rk-list li:nth-child(2) .n::before{content:"🥈"}.rk-list li:nth-child(3) .n::before{content:"🥉"}' +
    '.rk-list li:nth-child(-n+3) .n{font-size:0}.rk-list li:nth-child(-n+3) .n::before{font-size:1.1rem}' +
    '.rk-form{display:flex;gap:8px;margin-top:12px}.rk-form input{flex:1;min-width:0;padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--fg);font:inherit}' +
    '.rk-note{color:var(--muted);font-size:.8rem;line-height:1.45;margin-top:10px}#rankBtn{grid-column:1/-1}' +
    '#gameBtn{margin-top:-4px}@media (max-width:520px){.scene-info{display:none}}';
  document.head.appendChild(el('style', null, css));

  // ---------------------------------------------------------------- helpers: sheets
  function sheet(id, label) {
    var ov = el('div', 'overlay'); ov.id = id; ov.hidden = true;
    var sh = el('div', 'sheet'); sh.setAttribute('role', 'dialog'); sh.setAttribute('aria-modal', 'true'); sh.setAttribute('aria-label', label || '');
    ov.appendChild(sh); document.body.appendChild(ov);
    ov.addEventListener('click', function (e) { if (e.target === ov) ov.hidden = true; });
    return sh;
  }
  window.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    ['setSheet', 'gameSheet', 'rankSheet'].forEach(function (id) { var o = $(id); if (o && !o.hidden && !(id === 'gameSheet' && game.locked)) { o.hidden = true; e.stopImmediatePropagation(); } });
  }, true);

  // ---------------------------------------------------------------- settings panel
  var setSh = sheet('setSheet');
  var gear = el('button', 'icon-btn', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"></path></svg>');
  gear.type = 'button'; gear.id = 'setBtn';
  var tools = document.querySelector('.tools'); tools.insertBefore(gear, $('themeWrap'));
  var oldDetails = $('settings'), setGrid = oldDetails.querySelector('.set-grid'), oldChecks = oldDetails.querySelector('.checks');
  function toggleRow(id, key, onChange) {
    var r = el('label', 'sw-row'); var s = el('span'); s.setAttribute('data-x', key); r.appendChild(s);
    var i = el('input'); i.type = 'checkbox'; i.id = id; r.appendChild(i);
    return { row: r, input: i, label: s, onChange: onChange };
  }
  var rows = {};
  function buildSettings() {
    setSh.innerHTML = '';
    var h = el('div', 'g-head'); var h2 = el('h2', null, ''); h2.className = 'plain'; h2.id = 'setTitle'; h.appendChild(h2);
    setSh.appendChild(h);
    function sec(titleKey) { var d = el('div', 'set-sec'); var p = el('p', 'menu-title'); p.setAttribute('data-x', titleKey); d.appendChild(p); setSh.appendChild(d); return d; }
    var s1 = sec('secTimer'); s1.appendChild(setGrid);
    // reuse the original checkboxes (their handlers live in the main app) as switch rows
    [['soundChk', 'optSound'], ['autoChk', 'optAuto'], ['notifyChk', 'optNotify']].forEach(function (p) {
      var inp = $(p[0]); if (!inp) return; var lab = inp.closest('label');
      var r = el('label', 'sw-row'); var s = el('span'); s.setAttribute('data-x', p[1]); r.appendChild(s); r.appendChild(inp);
      if (p[0] === 'notifyChk' && lab && lab.hidden) r.hidden = true;
      s1.appendChild(r);
    });
    var s2 = sec('secBreak');
    rows.game = toggleRow('xGame', 'optGame'); s2.appendChild(rows.game.row);
    var s3 = sec('secFocus');
    rows.ret = toggleRow('xRet', 'optReturn'); s3.appendChild(rows.ret.row);
    rows.presence = toggleRow('xPres', 'optPresence'); s3.appendChild(rows.presence.row);
    rows.idle = toggleRow('xIdle', 'optIdle'); s3.appendChild(rows.idle.row);
    if (!('IdleDetector' in window)) rows.idle.row.hidden = true;
    var s4 = sec('secLook');
    rows.scene = toggleRow('xScene', 'optScene'); s4.appendChild(rows.scene.row);
    var act = el('div', 'sheet-actions'); act.appendChild(el('span'));
    var c = el('button', 'btn-small'); c.type = 'button'; c.setAttribute('data-x', 'close'); c.addEventListener('click', function () { $('setSheet').hidden = true; });
    act.appendChild(c); setSh.appendChild(act);
    Object.keys(rows).forEach(function (k) {
      rows[k].input.checked = !!S.x[k];
      rows[k].input.addEventListener('change', function () {
        var v = this.checked;
        if (k === 'idle' && v) { enableIdle(true, this); return; }
        S.x[k] = v; A.save(); applyX(k);
      });
    });
    oldDetails.remove();
  }
  buildSettings();
  gear.addEventListener('click', function () { $('setSheet').hidden = false; });
  function applyX(k) {
    if (k === 'scene') renderScene();
    if (k === 'idle' && !S.x.idle) stopIdle();
    if (k === 'game') renderGameBtn();
  }

  // ---------------------------------------------------------------- i18n for our elements
  function applyText() {
    document.querySelectorAll('[data-x]').forEach(function (e) { e.textContent = t(e.getAttribute('data-x')); });
    $('setTitle').textContent = t('settings');
    gear.title = t('settings'); gear.setAttribute('aria-label', t('settings'));
    renderSceneInfo(); renderGameBtn(); if (!$('gameSheet').hidden) renderGame(); if (!$('rankSheet').hidden) renderRank();
    rankBtn.lastChild.textContent = t('rank');
  }

  // ---------------------------------------------------------------- scenery
  function rng(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  function pines(y, h, color, count, seed, W) {
    var r = rng(seed), d = '';
    for (var i = 0; i < count; i++) {
      var x = (i + r() * .8) * (W / count), hh = h * (.65 + r() * .55), w = hh * (.32 + r() * .1), base = y + r() * 18;
      for (var k = 0; k < 3; k++) {
        var top = base - hh + k * hh * .22, bw = w * (.55 + k * .25), bot = base - hh * (.45 - k * .2);
        d += 'M' + (x).toFixed(1) + ' ' + top.toFixed(1) + 'L' + (x + bw).toFixed(1) + ' ' + bot.toFixed(1) + 'L' + (x - bw).toFixed(1) + ' ' + bot.toFixed(1) + 'Z';
      }
    }
    return '<path fill="' + color + '" d="' + d + '"/><rect x="0" y="' + (y + 10) + '" width="' + W + '" height="400" fill="' + color + '"/>';
  }
  function ridge(y, amp, color, seed, W, steps) {
    var r = rng(seed), d = 'M0 ' + y, n = steps || 9;
    for (var i = 1; i <= n; i++) { var x = i * W / n, yy = y - r() * amp; d += 'Q' + (x - W / n / 2).toFixed(0) + ' ' + (yy - amp * .4).toFixed(0) + ' ' + x.toFixed(0) + ' ' + yy.toFixed(0); }
    return '<path fill="' + color + '" d="' + d + 'V900H0Z"/>';
  }
  function hills(y, amp, color, seed, W) {
    var r = rng(seed), d = 'M0 ' + y, n = 4;
    for (var i = 1; i <= n; i++) { var x = i * W / n; d += 'C' + (x - W / n * .7).toFixed(0) + ' ' + (y - amp * (0.4 + r())).toFixed(0) + ' ' + (x - W / n * .3).toFixed(0) + ' ' + (y - amp * (0.2 + r() * .6)).toFixed(0) + ' ' + x.toFixed(0) + ' ' + (y + (r() - .5) * amp * .5).toFixed(0); }
    return '<path fill="' + color + '" d="' + d + 'V900H0Z"/>';
  }
  function stars(n, seed, W, H) { var r = rng(seed), s = ''; for (var i = 0; i < n; i++) s += '<circle cx="' + (r() * W).toFixed(0) + '" cy="' + (r() * H).toFixed(0) + '" r="' + (r() * 1.4 + .4).toFixed(1) + '" fill="#fff" opacity="' + (r() * .6 + .3).toFixed(2) + '"/>'; return s; }
  function cloud(x, y, s, o) { return '<g fill="#fff" opacity="' + o + '"><ellipse cx="' + x + '" cy="' + y + '" rx="' + 70 * s + '" ry="' + 22 * s + '"/><ellipse cx="' + (x + 30 * s) + '" cy="' + (y - 16 * s) + '" rx="' + 44 * s + '" ry="' + 26 * s + '"/><ellipse cx="' + (x - 34 * s) + '" cy="' + (y - 8 * s) + '" rx="' + 34 * s + '" ry="' + 18 * s + '"/></g>'; }
  function sky(id, stops) { return '<linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' + stops.map(function (s) { return '<stop offset="' + s[0] + '" stop-color="' + s[1] + '"/>'; }).join('') + '</linearGradient>'; }
  function sceneSvg(id) {
    var W = 1600, o = '';
    if (id === 'gunduz') {
      o = '<defs>' + sky('sk', [[0, '#BFE0F1'], [.55, '#E4F2EC'], [1, '#F1F4F2']]) + '</defs><rect width="1600" height="900" fill="url(#sk)"/>' +
        '<circle cx="1260" cy="190" r="70" fill="#FFF3C4"/><circle cx="1260" cy="190" r="120" fill="#FFF3C4" opacity=".25"/>' + cloud(330, 170, 1.1, .8) + cloud(900, 120, .8, .7) + cloud(1450, 300, .7, .6) +
        hills(640, 120, '#B9DDB2', 3, W) + hills(700, 110, '#93C998', 7, W) + hills(770, 90, '#6DB27C', 11, W) + hills(840, 60, '#4E9A66', 17, W);
    } else if (id === 'gece') {
      o = '<defs>' + sky('sk', [[0, '#070C1C'], [.6, '#142342'], [1, '#22355A']]) + '<radialGradient id="au" cx="30%" cy="35%" r="50%"><stop offset="0" stop-color="#3FD3A0" stop-opacity=".22"/><stop offset="1" stop-color="#3FD3A0" stop-opacity="0"/></radialGradient></defs>' +
        '<rect width="1600" height="900" fill="url(#sk)"/><rect width="1600" height="700" fill="url(#au)"/>' + stars(170, 5, W, 560) +
        '<circle cx="1220" cy="170" r="46" fill="#F4F1DE"/><circle cx="1240" cy="158" r="44" fill="#142342"/>' +
        ridge(620, 220, '#26385A', 21, W, 7) + ridge(700, 170, '#1A2A46', 33, W, 9) + ridge(790, 110, '#101C31', 45, W, 11);
    } else if (id === 'orman') {
      o = '<defs>' + sky('sk', [[0, '#16271D'], [.5, '#3B5944'], [.8, '#728F75'], [1, '#93AB91']]) + '<linearGradient id="mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6EFE0" stop-opacity="0"/><stop offset="1" stop-color="#E6EFE0" stop-opacity=".55"/></linearGradient></defs>' +
        '<rect width="1600" height="900" fill="url(#sk)"/><circle cx="1150" cy="420" r="90" fill="#F6E7B8" opacity=".6"/><circle cx="1150" cy="420" r="200" fill="#F6E7B8" opacity=".1"/>' +
        pines(600, 230, '#5F7D65', 26, 3, W) + '<rect y="450" width="1600" height="250" fill="url(#mist)" opacity=".6"/>' + pines(700, 300, '#3D5A46', 20, 9, W) + '<rect y="560" width="1600" height="200" fill="url(#mist)" opacity=".4"/>' + pines(820, 420, '#1C3526', 14, 15, W) + pines(885, 480, '#0E2018', 9, 27, W);
    } else if (id === 'okyanus') {
      o = '<defs>' + sky('sk', [[0, '#9FD0EA'], [.6, '#DDEFF7'], [1, '#EDF3F7']]) + sky('sea', [[0, '#7FB8D4'], [1, '#2F6E92']]) + '</defs>' +
        '<rect width="1600" height="900" fill="url(#sk)"/><circle cx="800" cy="120" r="52" fill="#FFF4CF"/><circle cx="800" cy="120" r="110" fill="#FFF4CF" opacity=".25"/>' + cloud(300, 170, 1, .75) + cloud(1420, 260, .7, .6) +
        '<path fill="#9DB6C4" d="M980 600 Q1080 520 1180 560 Q1260 530 1330 600Z"/><path fill="#B5C9D4" d="M120 600 Q200 560 290 590 Q330 575 380 600Z"/>' +
        '<rect y="598" width="1600" height="302" fill="url(#sea)"/>' +
        (function () { var s = '', r = rng(41); for (var i = 0; i < 46; i++) { var y = 615 + i * 6.3 + r() * 4, x = r() * 1600, w = 30 + r() * 90 + i * 2; s += '<path d="M' + x.toFixed(0) + ' ' + y.toFixed(0) + 'q' + (w / 2).toFixed(0) + ' -5 ' + w.toFixed(0) + ' 0" stroke="#fff" stroke-opacity="' + (.15 + r() * .3).toFixed(2) + '" stroke-width="2" fill="none" stroke-linecap="round"/>'; } return s; })() +
        '<path d="M930 250 q12 -10 24 0 q12 -10 24 0" stroke="#41627A" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M1000 290 q9 -8 18 0 q9 -8 18 0" stroke="#41627A" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    } else if (id === 'lavanta') {
      o = '<defs>' + sky('sk', [[0, '#D9CCF0'], [.55, '#F2EBF8'], [1, '#F4F1F8']]) + '</defs><rect width="1600" height="900" fill="url(#sk)"/>' +
        '<circle cx="1180" cy="230" r="60" fill="#FFF0D6"/>' + cloud(420, 190, .9, .7) + hills(600, 80, '#C9BFDF', 5, W) + hills(650, 60, '#B6CDA8', 9, W) +
        '<rect y="660" width="1600" height="240" fill="#8A6CC0"/>' +
        (function () { var s = ''; for (var i = -10; i <= 22; i++) { var xb = i * 110, xt = 800 + (i - 6) * 14; s += '<path d="M' + xt + ' 662 L' + (xb - 34) + ' 900 L' + (xb + 34) + ' 900 Z" fill="' + (i % 2 ? '#8064B8' : '#977CCB') + '"/>'; } return s; })() +
        '<path d="M0 650 L1600 650 L1600 668 L0 668Z" fill="#A3BF95"/>';
    } else {
      o = '<defs>' + sky('sk', [[0, '#1E1230'], [.45, '#6B2E5A'], [.75, '#E0734F'], [1, '#F6B26B']]) + '</defs><rect width="1600" height="900" fill="url(#sk)"/>' + stars(40, 9, W, 260) +
        '<circle cx="800" cy="640" r="150" fill="#FFC27A"/><circle cx="800" cy="640" r="260" fill="#FFC27A" opacity=".18"/>' +
        hills(650, 70, '#7A3550', 13, W) + hills(720, 80, '#55243F', 19, W) + hills(800, 70, '#371830', 23, W) + hills(870, 40, '#22101F', 29, W);
    }
    return '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">' + o + '</svg>';
  }
  var sceneEl = el('div', 'scene'); sceneEl.setAttribute('aria-hidden', 'true'); document.body.insertBefore(sceneEl, document.body.firstChild);
  var infoEl = el('div', 'scene-info'); document.body.appendChild(infoEl);
  var infoBtn = el('button', null); infoBtn.type = 'button'; infoEl.appendChild(infoBtn);
  var infoCard = el('div', 'card'); infoCard.hidden = true; infoEl.insertBefore(infoCard, infoBtn);
  infoBtn.addEventListener('click', function () { infoCard.hidden = !infoCard.hidden; });
  var shownScene = '';
  function curSkin() { return document.documentElement.getAttribute('data-skin') || 'gunduz'; }
  function renderScene() {
    var on = S.x.scene, sk = curSkin();
    document.documentElement.classList.toggle('has-scene', on);
    infoEl.hidden = !on;
    if (!on) { sceneEl.classList.remove('on'); return; }
    if (shownScene !== sk) { sceneEl.innerHTML = sceneSvg(sk); shownScene = sk; }
    sceneEl.classList.add('on');
    renderSceneInfo();
  }
  function renderSceneInfo() {
    var sc = (raw('scenes') || {})[curSkin()] || ['', ''];
    infoBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 11v5"></path><circle cx="12" cy="7.8" r="1" fill="currentColor"></circle></svg>';
    infoBtn.appendChild(document.createTextNode(sc[0]));
    infoBtn.title = t('sceneAbout');
    infoCard.innerHTML = '';
    var b = el('b'); b.textContent = sc[0]; var p = el('span'); p.textContent = sc[1]; var sm = el('small'); sm.textContent = t('sceneBy');
    infoCard.appendChild(b); infoCard.appendChild(p); infoCard.appendChild(sm);
  }
  document.addEventListener('grove:skin', renderScene);

  // ---------------------------------------------------------------- 2048 break game
  var game = { locked: false, msg: null, fresh: -1, merged: [] };
  var gSh = sheet('gameSheet');
  function g() { if (!S.x.g) newGame(); return S.x.g; }
  function newGame() { S.x.g = { grid: new Array(16).fill(0), score: 0, best: (S.x.g && S.x.g.best) || 0, won: false }; addTile(); addTile(); A.save(); }
  function addTile() {
    var gg = S.x.g, free = []; gg.grid.forEach(function (v, i) { if (!v) free.push(i); });
    if (!free.length) return; var i = free[Math.floor(Math.random() * free.length)];
    gg.grid[i] = Math.random() < .9 ? 2 : 4; game.fresh = i;
  }
  function canMove(gr) {
    for (var i = 0; i < 16; i++) { if (!gr[i]) return true; var r = i >> 2, c = i & 3; if (c < 3 && gr[i] === gr[i + 1]) return true; if (r < 3 && gr[i] === gr[i + 4]) return true; }
    return false;
  }
  function move(dir) {   // 0 left 1 right 2 up 3 down
    var gg = g(), gr = gg.grid, moved = false; game.merged = [];
    for (var a = 0; a < 4; a++) {
      var idx = []; for (var b = 0; b < 4; b++) idx.push(dir < 2 ? a * 4 + (dir === 0 ? b : 3 - b) : (dir === 2 ? b : 3 - b) * 4 + a);
      var vals = idx.map(function (i) { return gr[i]; }).filter(Boolean), out = [];
      for (var k = 0; k < vals.length; k++) {
        if (vals[k] === vals[k + 1]) { var v = vals[k] * 2; out.push(v); gg.score += v; game.merged.push(idx[out.length - 1]); k++; }
        else out.push(vals[k]);
      }
      while (out.length < 4) out.push(0);
      idx.forEach(function (i, n) { if (gr[i] !== out[n]) moved = true; gr[i] = out[n]; });
    }
    if (!moved) return;
    addTile();
    if (gg.score > gg.best) gg.best = gg.score;
    if (!gg.won && gr.some(function (v) { return v >= 32; })) { gg.won = true; game.msg = 'win'; A.chime(true); celebrate(); }
    else if (!canMove(gr)) game.msg = 'over';
    A.save(); renderGame();
  }
  var TILE = { 2: '#E8D9B5', 4: '#E3C78F', 8: '#E8A35F', 16: '#E5854A', 32: '#3F8F5A', 64: '#2E7048', 128: '#3B78A8', 256: '#6447AA', 512: '#B8432E', 1024: '#8C2F5C', 2048: '#1E6B57' };
  function renderGame() {
    var gg = g(); gSh.innerHTML = '';
    var head = el('div', 'g-head'), left = el('div');
    var h2 = el('h2'); h2.textContent = t('game'); left.appendChild(h2);
    var sub = el('div', 'g-sub'); sub.id = 'gSub'; left.appendChild(sub); head.appendChild(left);
    var sc = el('div', 'g-scores');
    sc.innerHTML = '<div><span></span><b></b></div><div><span></span><b></b></div>';
    sc.children[0].firstChild.textContent = t('gameScore'); sc.children[0].lastChild.textContent = gg.score;
    sc.children[1].firstChild.textContent = t('gameBest'); sc.children[1].lastChild.textContent = gg.best;
    head.appendChild(sc); gSh.appendChild(head);
    var board = el('div', 'g-board'); board.setAttribute('role', 'grid'); board.setAttribute('aria-label', '2048');
    gg.grid.forEach(function (v, i) {
      var c = el('div', 'g-cell' + (v ? ' v' : '') + (i === game.fresh ? ' new' : '') + (game.merged.indexOf(i) >= 0 ? ' mrg' : ''));
      if (v) { c.textContent = v; c.style.background = TILE[v] || '#1E1A2E'; if (v <= 4) c.style.color = '#4A3B22'; if (v >= 1024) c.style.fontSize = 'clamp(.9rem,4.6vw,1.3rem)'; }
      board.appendChild(c);
    });
    swipe(board); gSh.appendChild(board);
    var max = Math.max.apply(null, gg.grid), goal = el('div', 'g-goal');
    goal.innerHTML = '<span></span><div class="bar"><i></i></div><span></span>';
    goal.firstChild.textContent = t('gameGoal'); goal.lastChild.textContent = gg.won ? '✓' : max + ' / 32';
    goal.querySelector('i').style.width = Math.min(100, Math.log2(Math.max(2, max)) / 5 * 100) + '%';
    gSh.appendChild(goal);
    if (game.msg) {
      var m = el('div', 'g-msg'), p = el('div'), row = el('div', 'row');
      if (game.msg === 'win') { p.textContent = t('gameWin'); row.appendChild(btn(t('gameKeep'), function () { game.msg = null; renderGame(); }, 'primary')); row.appendChild(btn(t('close'), closeGame)); }
      else if (game.msg === 'over') { p.textContent = t('gameOver'); row.appendChild(btn(t('gameNew'), function () { game.msg = null; newGame(); renderGame(); }, 'primary')); }
      else if (game.msg === 'breakOver') { p.textContent = t('breakOver'); row.appendChild(btn(t('startFocus'), function () { closeGame(); startFocusNow(); }, 'primary')); row.appendChild(btn(t('close'), closeGame)); }
      m.appendChild(p); m.appendChild(row); gSh.appendChild(m);
    }
    var act = el('div', 'sheet-actions');
    act.appendChild(btn(t('gameNew'), function () { game.msg = null; newGame(); renderGame(); }));
    act.appendChild(btn(t('close'), closeGame));
    gSh.appendChild(act);
    game.fresh = -1; tickGame();
  }
  function btn(text, fn, kind) { var b = el('button', 'btn-small' + (kind ? ' ' + kind : '')); b.type = 'button'; b.textContent = text; b.addEventListener('click', fn); return b; }
  function tickGame() {
    var sub = $('gSub'); if (!sub) return;
    if (S.pomo.mode !== 'focus' && S.pomo.running) sub.textContent = t('breakLeft', { t: clock(A.pomoLeft()) });
    else if (S.pomo.mode !== 'focus' && !S.pomo.running && game.msg !== 'breakOver') { sub.textContent = ''; var b = btn(t('startBreak'), function () { if (!S.pomo.running) A.pomoToggle(); tickGame(); }, 'primary'); b.style.marginTop = '4px'; sub.appendChild(b); }
    else sub.textContent = t('gameHint');
  }
  function openGame() { $('gameSheet').hidden = false; renderGame(); }
  function closeGame() { $('gameSheet').hidden = true; if (game.msg === 'breakOver') game.msg = null; }
  function startFocusNow() { if (anyRunning()) return; A.ensureAudio(); if (S.tab === 'pomo') { if (S.pomo.mode !== 'focus') A.setMode('focus'); A.pomoToggle(); } else A.swToggle(); }
  function celebrate() { var b = gSh.querySelector('.g-board'); if (b) b.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.03)' }, { transform: 'scale(1)' }], { duration: 400 }); }
  window.addEventListener('keydown', function (e) {
    if ($('gameSheet').hidden || e.metaKey || e.ctrlKey || e.altKey) return;
    var m = { ArrowLeft: 0, ArrowRight: 1, ArrowUp: 2, ArrowDown: 3, a: 0, d: 1, w: 2, s: 3, A: 0, D: 1, W: 2, S: 3 }[e.key];
    if (m !== undefined && !(e.target && /INPUT|TEXTAREA/.test(e.target.tagName))) { e.preventDefault(); e.stopImmediatePropagation(); if (!game.msg || game.msg === 'breakOver') move(m); }
    else if (e.key !== 'Escape' && e.key !== 'Tab') e.stopImmediatePropagation();
  }, true);
  function swipe(node) {
    var sx = 0, sy = 0, on = false;
    node.addEventListener('pointerdown', function (e) { on = true; sx = e.clientX; sy = e.clientY; });
    node.addEventListener('pointerup', function (e) {
      if (!on) return; on = false; var dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 24 || (game.msg && game.msg !== 'breakOver')) return;
      move(Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 0 : 1) : (dy < 0 ? 2 : 3));
    });
  }
  // "Break game" button in the Pomodoro view
  var gameBtn = el('button', 'link-btn'); gameBtn.type = 'button'; gameBtn.id = 'gameBtn';
  gameBtn.addEventListener('click', openGame);
  var cyc = document.querySelector('#pomo .cycle'); cyc.parentNode.insertBefore(gameBtn, cyc.nextSibling);
  function renderGameBtn() { gameBtn.textContent = t('playBtn'); gameBtn.hidden = !(S.x.game && S.pomo.mode !== 'focus'); }

  // ---------------------------------------------------------------- nudges (back at desk / are you there?)
  var nudge = el('div', 'nudge'); nudge.setAttribute('role', 'status'); nudge.setAttribute('aria-live', 'polite'); document.body.appendChild(nudge);
  var nudgeKind = null, nudgeT = 0;
  function showNudge(kind, title, text, buttons, ms) {
    nudge.innerHTML = ''; var p = el('p'); var b = el('b'); b.textContent = title; p.appendChild(b); var sp = el('span'); sp.textContent = text; p.appendChild(sp);
    var row = el('div', 'row'); buttons.forEach(function (x) { row.appendChild(btn(x[0], x[1], x[2])); });
    nudge.appendChild(p); nudge.appendChild(row); nudge.classList.add('show'); nudgeKind = kind;
    clearTimeout(nudgeT); if (ms) nudgeT = setTimeout(function () { if (nudgeKind === kind) hideNudge(); }, ms);
    return sp;
  }
  function hideNudge() { nudge.classList.remove('show'); nudgeKind = null; clearTimeout(nudgeT); }

  // --- back at your desk
  var ctx = null, cooldown = 0, lastAct = 0, idleAway = false;
  function setCtx(type) { ctx = { type: type, at: Date.now() }; }
  function maybeBack(source) {
    var now = Date.now();
    if (!S.x.ret || !ctx || anyRunning() || nudgeKind === 'here' || !$('gameSheet').hidden) return;
    var since = now - ctx.at, min = ctx.type === 'break' ? 60000 : 5 * 60000;
    if (since < min || since > 3 * 3600000 || now < cooldown) return;
    if (source === 'idle' && document.hidden) { A.notify(t('backNotif')); }
    showNudge('back', t('backQ'), t('backText'), [[t('startNow'), function () { hideNudge(); startFocusNow(); }, 'primary'], [t('notNow'), function () { hideNudge(); cooldown = Date.now() + 45 * 60000; }]], 30000);
    cooldown = now + 20 * 60000;
  }
  function activity() {
    var now = Date.now(); if (now - lastAct < 4000) return; lastAct = now;
    if (!document.hidden) maybeBack('app');
  }
  ['pointerdown', 'keydown', 'pointermove', 'wheel'].forEach(function (ev) { window.addEventListener(ev, activity, { passive: true }); });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) { lastAct = 0; activity(); } });
  window.addEventListener('focus', function () { lastAct = 0; activity(); });

  // --- are you there? (fair play)
  var nextCheck = 0, hereAt = 0, hereTimer = 0, HERE_MS = 3 * 60000, idleSince = 0;
  function planCheck() { nextCheck = Date.now() + (40 + Math.random() * 15) * 60000; }
  function askHere(since) {
    if (nudgeKind === 'here') return;
    hereAt = since || Date.now();
    var span = showNudge('here', t('hereQ'), '', [[t('here'), answerHere, 'primary']], 0);
    hereShown = Date.now();
    function tick() {
      var left = Math.max(0, HERE_MS - (Date.now() - hereShown));
      span.textContent = t('hereText', { s: clock(left) });
      if (left <= 0) { clearInterval(hereTimer); timeoutHere(); }
    }
    clearInterval(hereTimer); hereTimer = setInterval(tick, 1000); tick();
    A.chime(true); A.notify(t('hereNotif'));
  }
  var hereShown = 0;
  function answerHere() { clearInterval(hereTimer); hideNudge(); planCheck(); idleSince = 0; }
  function timeoutHere() {
    hideNudge();
    if (!anyRunning()) return;
    var removed = A.rewind(Date.now() - hereAt);
    var stopAt = new Date(Date.now() - removed);
    A.toast(t('pausedAway', { time: hhmm(stopAt) }), 7000);
    lbAdjust(-removed);
    setCtx('pause');
  }

  // --- system idle detection (optional, needs permission)
  var idleDet = null, idleAbort = null;
  function enableIdle(ask, input) {
    if (!('IdleDetector' in window)) { if (input) input.checked = false; return; }
    var p = ask ? IdleDetector.requestPermission() : Promise.resolve('granted');
    p.then(function (st) {
      if (st !== 'granted') { if (input) input.checked = false; S.x.idle = false; A.save(); if (ask) A.toast(t('idleDenied')); return; }
      S.x.idle = true; A.save(); startIdle();
    }).catch(function () { if (input) input.checked = false; S.x.idle = false; A.save(); });
  }
  function startIdle() {
    if (idleDet) return;
    try {
      idleAbort = new AbortController(); idleDet = new IdleDetector();
      idleDet.addEventListener('change', function () {
        var away = idleDet.userState === 'idle' || idleDet.screenState === 'locked';
        if (away && !idleAway) { idleAway = true; idleSince = Date.now() - 60000; }
        else if (!away && idleAway) { idleAway = false; idleSince = 0; maybeBack('idle'); }
      });
      idleDet.start({ threshold: 60000, signal: idleAbort.signal }).catch(function () { idleDet = null; });
    } catch (e) { idleDet = null; }
  }
  function stopIdle() { try { idleAbort && idleAbort.abort(); } catch (e) {} idleDet = null; idleAway = false; }
  if (S.x.idle && 'IdleDetector' in window) {
    try { navigator.permissions.query({ name: 'idle-detection' }).then(function (r) { if (r.state === 'granted') startIdle(); }).catch(function () {}); } catch (e) {}
  }

  // ---------------------------------------------------------------- events from the main app
  var wasRunning = anyRunning();
  document.addEventListener('grove:timer', function () {
    var run = anyRunning();
    if (run) { ctx = null; if (nudgeKind === 'back') hideNudge(); if (!nextCheck) planCheck(); }
    else { if (wasRunning) setCtx('pause'); nextCheck = 0; if (nudgeKind === 'here') { clearInterval(hereTimer); hideNudge(); } lbSync(); }
    wasRunning = run; renderGameBtn();
  });
  document.addEventListener('grove:pomo', function (e) {
    var d = e.detail || {}; renderGameBtn();
    if (d.silent) return;
    if (d.from === 'focus' && d.to !== 'focus') {         // focus finished, break begins
      nextCheck = 0;
      if (S.x.game && !document.hidden) { if (!S.pomo.running) A.pomoToggle(); game.msg = game.msg === 'win' ? null : game.msg; openGame(); }
    } else if (d.from !== 'focus' && d.to === 'focus') {  // break finished
      setCtx('break');
      if (!$('gameSheet').hidden) { game.msg = 'breakOver'; renderGame(); }
    }
    wasRunning = anyRunning();
  });
  document.addEventListener('grove:lang', applyText);

  setInterval(function () {
    var now = Date.now();
    if (!$('gameSheet').hidden) tickGame();
    if (A.isWorking()) {
      if (!nextCheck) planCheck();
      if ((S.x.presence || S.x.lb.joined) && nudgeKind !== 'here') {   // leaderboard players are always checked
        if (idleSince && now - idleSince > 10 * 60000) askHere(idleSince);
        else if (now >= nextCheck) askHere();
      }
    }
    if (S.x.lb.joined && now - (lbState.lastSync || 0) > 5 * 60000 && lbState.dirty) lbSync();
  }, 1000);

  // ---------------------------------------------------------------- leaderboard (Firebase, opt-in)
  var FB = { apiKey: '', projectId: '' };   // filled in when the Firebase project is ready
  var LB_ON = !!(FB.apiKey && FB.projectId);
  var lbState = { lastSync: 0, dirty: false, list: null, err: false, busy: false };
  function isoWeek(d) {
    d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    var day = d.getUTCDay() || 7; d.setUTCDate(d.getUTCDate() + 4 - day);
    var y = new Date(Date.UTC(d.getUTCFullYear(), 0, 1)), wk = Math.ceil(((d - y) / 864e5 + 1) / 7);
    return d.getUTCFullYear() + '-W' + (wk < 10 ? '0' : '') + wk;
  }
  function lb() { var l = S.x.lb, w = isoWeek(new Date()); if (l.week !== w) { l.week = w; l.ms = 0; l.synced = false; } return l; }
  document.addEventListener('grove:work', function (e) {
    var d = e.detail || {}; if (d.quiet || !S.x.lb.joined) return;   // time credited while Grove was closed never counts
    var l = lb(); l.ms = (l.ms || 0) + d.d; lbState.dirty = true;
  });
  function ensureTrees() { var tt = S.totals; return (tt && tt.trees) || S.work.trees.length || 0; }
  function lbAdjust(delta) { if (!S.x.lb.joined) return; var l = lb(); l.ms = Math.max(0, (l.ms || 0) + delta); lbState.dirty = true; }
  var FS = function () { return 'https://firestore.googleapis.com/v1/projects/' + FB.projectId + '/databases/(default)/documents'; };
  function token() {
    var l = S.x.lb;
    if (l.idToken && l.exp > Date.now() + 60000) return Promise.resolve(l.idToken);
    var req = l.refresh
      ? fetch('https://securetoken.googleapis.com/v1/token?key=' + FB.apiKey, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(l.refresh) })
          .then(function (r) { if (!r.ok) throw new Error('refresh'); return r.json(); })
          .then(function (j) { return { idToken: j.id_token, refreshToken: j.refresh_token, localId: j.user_id, expiresIn: j.expires_in }; })
      : fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + FB.apiKey, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"returnSecureToken":true}' })
          .then(function (r) { if (!r.ok) throw new Error('signup'); return r.json(); });
    return req.then(function (j) { l.idToken = j.idToken; l.refresh = j.refreshToken; l.uid = j.localId; l.exp = Date.now() + (+j.expiresIn || 3600) * 1000; A.save(); return l.idToken; });
  }
  function api(path, opts) {
    return token().then(function (tk) {
      opts = opts || {}; opts.headers = Object.assign({ 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }, opts.headers || {});
      return fetch(FS() + path, opts).then(function (r) { if (!r.ok) { var e = new Error('http ' + r.status); e.status = r.status; throw e; } return r.status === 204 ? null : r.json(); });
    });
  }
  function docName() { return 'projects/' + FB.projectId + '/databases/(default)/documents/lb/' + lb().week + '/players/' + S.x.lb.uid; }
  function lbSync() {
    if (!LB_ON || !S.x.lb.joined || lbState.busy) return Promise.resolve();
    var l = lb(); lbState.busy = true;
    var body = { writes: [{ update: { name: docName(), fields: { name: { stringValue: l.name }, ms: { integerValue: String(Math.floor(l.ms || 0)) }, trees: { integerValue: String(Math.min(500, ensureTrees())) }, expireAt: { timestampValue: new Date(Date.now() + 56 * 864e5).toISOString() } } },
      updateTransforms: [{ fieldPath: 'updatedAt', setToServerValue: 'REQUEST_TIME' }] }] };
    return token().then(function () { body.writes[0].update.name = docName(); return api(':commit', { method: 'POST', body: JSON.stringify(body) }); })
      .then(function () { lbState.dirty = false; lbState.lastSync = Date.now(); l.synced = true; A.save(); })
      .catch(function (e) {
        lbState.lastSync = Date.now();
        if (e.status === 403) {   // the server refused (more time than really passed): take the server's value
          return api('/lb/' + l.week + '/players/' + l.uid).then(function (d) { l.ms = +((d.fields || {}).ms || {}).integerValue || 0; A.save(); })
            .catch(function (e2) { if (e2.status === 404) { l.ms = 0; A.save(); } });
        }
      }).then(function () { lbState.busy = false; });
  }
  function lbLoad() {
    if (!LB_ON) return;
    lbState.err = false;
    var q = { structuredQuery: { from: [{ collectionId: 'players' }], orderBy: [{ field: { fieldPath: 'ms' }, direction: 'DESCENDING' }], limit: 25 } };
    api('/lb/' + lb().week + ':runQuery', { method: 'POST', body: JSON.stringify(q) }).then(function (rows) {
      lbState.list = (rows || []).filter(function (r) { return r.document; }).map(function (r) {
        var f = r.document.fields || {}; return { id: r.document.name.split('/').pop(), name: (f.name || {}).stringValue || '?', ms: +((f.ms || {}).integerValue || 0) };
      });
      renderRank();
    }).catch(function () { lbState.err = true; renderRank(); });
  }
  var rkSh = sheet('rankSheet');
  var NICK = /^[\p{L}\p{N} ._-]{2,20}$/u;
  function renderRank() {
    rkSh.innerHTML = '';
    var head = el('div', 'g-head'), left = el('div'), h2 = el('h2'); h2.textContent = t('rank'); left.appendChild(h2);
    var sub = el('div', 'g-sub'); sub.textContent = t('rankWeek') + ' · ' + lb().week; left.appendChild(sub); head.appendChild(left);
    if (LB_ON && S.x.lb.joined) head.appendChild(btn(t('rankRefresh'), function () { lbSync().then(lbLoad); }));
    rkSh.appendChild(head);
    if (!LB_ON) { var soon = el('p', 'rk-note'); soon.textContent = t('rankSoon'); rkSh.appendChild(soon); }
    else if (!S.x.lb.joined) {
      var f = el('form', 'rk-form'), inp = el('input'); inp.maxLength = 20; inp.placeholder = t('rankNick'); inp.setAttribute('aria-label', t('rankNick')); inp.value = S.x.lb.name || '';
      f.appendChild(inp); var jb = btn(t('rankJoin'), null, 'primary'); jb.type = 'submit'; f.appendChild(jb);
      f.addEventListener('submit', function (e) {
        e.preventDefault(); var n = inp.value.trim().replace(/\s+/g, ' ');
        if (!NICK.test(n)) { A.toast(t('rankNickBad')); return; }
        var l = lb(); l.name = n; l.joined = true; l.ms = 0; lbState.dirty = true; A.save();
        lbSync().then(function () { A.toast(t('rankJoined')); lbLoad(); }).catch(function () { A.toast(t('rankErr')); });
        renderRank();
      });
      rkSh.appendChild(f);
      var pv = el('p', 'rk-note'); pv.textContent = t('rankPrivacy'); rkSh.appendChild(pv);
    }
    if (LB_ON) {
      if (lbState.err) { var er = el('p', 'rk-note'); er.textContent = t('rankErr'); rkSh.appendChild(er); }
      else if (lbState.list) {
        if (!lbState.list.length) { var em = el('p', 'rk-note'); em.textContent = t('rankEmpty'); rkSh.appendChild(em); }
        var ol = el('ol', 'rk-list');
        lbState.list.forEach(function (r, i) {
          var li = el('li', r.id === S.x.lb.uid ? 'me' : ''), n = el('span', 'n'), nm = el('span'), tm = el('span', 'tm');
          n.textContent = (i + 1); nm.textContent = r.name + (r.id === S.x.lb.uid ? ' (' + t('rankYou') + ')' : ''); tm.textContent = A.fmtDur(r.ms);
          li.appendChild(n); li.appendChild(nm); li.appendChild(tm); ol.appendChild(li);
        });
        rkSh.appendChild(ol);
      }
    }
    var info = el('p', 'rk-note'); info.textContent = t('rankInfo'); rkSh.appendChild(info);
    var act = el('div', 'sheet-actions');
    if (LB_ON && S.x.lb.joined) act.appendChild(btn(t('rankLeave'), function () {
      var l = S.x.lb, w = lb().week;
      api('/lb/' + w + '/players/' + l.uid, { method: 'DELETE' }).catch(function () {}).then(function () { l.joined = false; l.ms = 0; A.save(); A.toast(t('rankLeft')); lbLoad(); renderRank(); });
    })); else act.appendChild(el('span'));
    act.appendChild(btn(t('close'), function () { $('rankSheet').hidden = true; }));
    rkSh.appendChild(act);
  }
  var rankBtn = el('button', 'act-btn', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM17 6h3a3 3 0 0 1-3 4M7 6H4a3 3 0 0 0 3 4"></path></svg><span></span>');
  rankBtn.type = 'button'; rankBtn.id = 'rankBtn';
  document.querySelector('.garden-actions').appendChild(rankBtn);
  rankBtn.addEventListener('click', function () { $('rankSheet').hidden = false; renderRank(); if (LB_ON) lbLoad(); });
  window.addEventListener('pagehide', function () { if (lbState.dirty) lbSync(); });

  // ---------------------------------------------------------------- boot
  applyText(); renderScene(); renderGameBtn();
  if (anyRunning()) planCheck();
  window.__groveX = { openGame: openGame, move: move, askHere: askHere, maybeBack: maybeBack, setCtx: setCtx, state: function () { return { ctx: ctx, nextCheck: nextCheck, nudge: nudgeKind, cooldown: cooldown }; } };
})();
