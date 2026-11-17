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
      sceneAbout: 'About this picture', photoBy: 'Photo:',
      scenes: { gunduz: ['Green hills', 'Rolling meadows under a bright summer sky.'], gece: ['Starry peaks', 'Snowy mountains beneath the Milky Way.'], orman: ['Misty forest', 'Pine trees disappearing into the morning fog.'], okyanus: ['Calm sea', 'A still horizon where the sea meets the sky.'], lavanta: ['Valensole, France', 'Rows of lavender in Provence.'], gunbatimi: ['Desert dunes', 'Sand ridges in the last light of the day.'] } },
    tr: { secTimer: 'Pomodoro', secBreak: 'Molalar', secFocus: 'Odak yardımcıları', secLook: 'Görünüm', optGame: 'Mola başlayınca 2048 oyununu aç', optReturn: 'Döndüğümde süreyi başlatmayı hatırlat', optPresence: 'Uzun oturumlarda “Burada mısın?” diye sor', optIdle: 'Bilgisayardan uzaklaştığımı fark et', optScene: 'Temalarda arka plan resmi', idleDenied: 'İzin verilmedi. Tarayıcı ayarlarından açabilirsin.',
      game: 'Mola oyunu', gameGoal: 'Hedef: 32’ye ulaş', gameScore: 'Puan', gameBest: 'En iyi', gameNew: 'Yeni oyun', gameWin: 'Tebrikler, 32’ye ulaştın! 🎉 Şimdi gerçekten molaya çıkabilirsin: kalk, biraz esne, su iç.', gameKeep: 'Oynamaya devam', gameOver: 'Hamle kalmadı. Yeni oyuna başla!', gameHint: 'Ok tuşları ya da kaydır', breakLeft: 'Mola: {t} kaldı', startBreak: 'Molayı başlat', breakOver: 'Mola bitti! Burada mısın?', startFocus: 'Odaklanmaya başla', playBtn: '🎮 Mola oyunu',
      backQ: 'Döndün mü? 🌱', backText: 'Süreyi başlatmayı unutma.', startNow: 'Başlat', notNow: 'Şimdi değil', backNotif: 'Masaya döndün gibi görünüyor. Odak süresini başlatalım mı?',
      hereQ: 'Burada mısın? 👋', hereText: 'Sürenin saymaya devam etmesi için {s} içinde cevap ver.', here: 'Buradayım', pausedAway: 'Senden ses çıkmadı, bu yüzden süreyi {time}’de durdurduk.', hereNotif: 'Burada mısın? Süren saymaya devam etsin diye dokun.',
      rank: 'Sıralama', rankWeek: 'Bu hafta', rankJoin: 'Katıl', rankNick: 'Takma ad', rankNickBad: '2–20 harf, rakam, boşluk, nokta ya da tire kullan.', rankInfo: 'Adil oyun: sadece Grove açıkken geçen odak süresi sayılır ve “Burada mısın?” sorularına cevap vermek gerekir. Sunucu, gerçekte geçen süreden fazlasını kabul etmez.', rankLeave: 'Sıralamadan ayrıl', rankYou: 'sen', rankEmpty: 'Henüz kimse yok. İlk sen ol!', rankSoon: 'Sıralama çok yakında açılıyor.', rankErr: 'Bağlanılamadı. Biraz sonra tekrar dene.', rankJoined: 'Bu haftanın sıralamasına katıldın.', rankPrivacy: 'Katılınca sadece takma adın ve bu haftaki odak süren paylaşılır.', rankLeft: 'Sıralamadan ayrıldın.', rankRefresh: 'Yenile',
      sceneAbout: 'Bu resim hakkında', photoBy: 'Fotoğraf:',
      scenes: { gunduz: ['Yeşil tepeler', 'Parlak bir yaz göğü altında dalgalı çayırlar.'], gece: ['Yıldızlı zirveler', 'Samanyolu’nun altında karlı dağlar.'], orman: ['Sisli orman', 'Sabah sisinde kaybolan çam ağaçları.'], okyanus: ['Sakin deniz', 'Denizin gökyüzüne kavuştuğu durgun ufuk.'], lavanta: ['Valensole, Fransa', 'Provence’ta sıra sıra lavantalar.'], gunbatimi: ['Çöl kumulları', 'Günün son ışığında kum tepeleri.'] } },
    de: { secTimer: 'Pomodoro', secBreak: 'Pausen', secFocus: 'Fokus-Helfer', secLook: 'Aussehen', optGame: '2048 öffnen, wenn eine Pause beginnt', optReturn: 'Erinnern, den Timer zu starten, wenn ich zurück bin', optPresence: 'In langen Sitzungen „Bist du da?“ fragen', optIdle: 'Bemerken, wenn ich vom Computer weg bin', optScene: 'Hintergrundbilder für Designs', idleDenied: 'Keine Berechtigung erteilt. Du kannst sie in den Browsereinstellungen erlauben.',
      game: 'Pausenspiel', gameGoal: 'Ziel: 32 erreichen', gameScore: 'Punkte', gameBest: 'Bestwert', gameNew: 'Neues Spiel', gameWin: 'Glückwunsch, du hast 32 erreicht! 🎉 Jetzt mach wirklich Pause: aufstehen, strecken, etwas trinken.', gameKeep: 'Weiterspielen', gameOver: 'Keine Züge mehr. Starte ein neues Spiel!', gameHint: 'Pfeiltasten oder wischen', breakLeft: 'Pause: noch {t}', startBreak: 'Pause starten', breakOver: 'Pause vorbei! Bist du da?', startFocus: 'Fokus starten', playBtn: '🎮 Pausenspiel',
      backQ: 'Wieder am Platz? 🌱', backText: 'Vergiss nicht, den Timer zu starten.', startNow: 'Starten', notNow: 'Nicht jetzt', backNotif: 'Du scheinst zurück zu sein. Fokus-Timer starten?',
      hereQ: 'Bist du da? 👋', hereText: 'Antworte innerhalb von {s}, damit deine Zeit weiterläuft.', here: 'Ich bin da', pausedAway: 'Keine Antwort, daher wurde der Timer um {time} gestoppt.', hereNotif: 'Bist du da? Tippe, damit deine Fokuszeit weiterläuft.',
      rank: 'Rangliste', rankWeek: 'Diese Woche', rankJoin: 'Mitmachen', rankNick: 'Spitzname', rankNickBad: '2–20 Buchstaben, Zahlen, Leerzeichen, Punkte oder Bindestriche.', rankInfo: 'Fair Play: Es zählt nur Fokuszeit, während Grove offen ist, und „Bist du da?“-Fragen müssen beantwortet werden. Der Server lehnt mehr Zeit ab, als wirklich vergangen ist.', rankLeave: 'Rangliste verlassen', rankYou: 'du', rankEmpty: 'Noch niemand da. Sei die oder der Erste!', rankSoon: 'Die Rangliste startet bald.', rankErr: 'Keine Verbindung. Bitte später erneut versuchen.', rankJoined: 'Du bist der Rangliste dieser Woche beigetreten.', rankPrivacy: 'Beim Mitmachen werden nur dein Spitzname und deine Fokuszeit dieser Woche geteilt.', rankLeft: 'Du hast die Rangliste verlassen.', rankRefresh: 'Aktualisieren',
      sceneAbout: 'Über dieses Bild', photoBy: 'Foto:',
      scenes: { gunduz: ['Grüne Hügel', 'Sanfte Wiesen unter hellem Sommerhimmel.'], gece: ['Sternengipfel', 'Verschneite Berge unter der Milchstraße.'], orman: ['Nebelwald', 'Kiefern, die im Morgennebel verschwinden.'], okyanus: ['Ruhige See', 'Ein stiller Horizont, wo Meer und Himmel sich treffen.'], lavanta: ['Valensole, Frankreich', 'Lavendelreihen in der Provence.'], gunbatimi: ['Wüstendünen', 'Sandkämme im letzten Licht des Tages.'] } },
    es: { secTimer: 'Pomodoro', secBreak: 'Descansos', secFocus: 'Ayudas de enfoque', secLook: 'Apariencia', optGame: 'Abrir 2048 cuando empiece un descanso', optReturn: 'Recordarme iniciar el temporizador al volver', optPresence: 'Preguntar “¿Sigues ahí?” en sesiones largas', optIdle: 'Detectar cuando me alejo del ordenador', optScene: 'Imágenes de fondo en los temas', idleDenied: 'No se dio el permiso. Puedes permitirlo en los ajustes del navegador.',
      game: 'Juego de descanso', gameGoal: 'Meta: llegar a 32', gameScore: 'Puntos', gameBest: 'Récord', gameNew: 'Nuevo juego', gameWin: '¡Enhorabuena, llegaste a 32! 🎉 Ahora descansa de verdad: levántate, estírate y bebe agua.', gameKeep: 'Seguir jugando', gameOver: 'No quedan movimientos. ¡Empieza otro juego!', gameHint: 'Flechas o desliza', breakLeft: 'Descanso: quedan {t}', startBreak: 'Iniciar descanso', breakOver: '¡Se acabó el descanso! ¿Sigues ahí?', startFocus: 'Empezar a enfocarme', playBtn: '🎮 Juego de descanso',
      backQ: '¿Has vuelto? 🌱', backText: 'No olvides iniciar el temporizador.', startNow: 'Iniciar', notNow: 'Ahora no', backNotif: 'Parece que has vuelto. ¿Iniciamos el temporizador?',
      hereQ: '¿Sigues ahí? 👋', hereText: 'Responde en {s} para que tu tiempo siga contando.', here: 'Aquí estoy', pausedAway: 'No respondiste, así que el temporizador se detuvo a las {time}.', hereNotif: '¿Sigues ahí? Toca para que tu tiempo siga contando.',
      rank: 'Clasificación', rankWeek: 'Esta semana', rankJoin: 'Unirme', rankNick: 'Apodo', rankNickBad: 'Usa 2–20 letras, números, espacios, puntos o guiones.', rankInfo: 'Juego limpio: solo cuenta el tiempo con Grove abierto y hay que responder a “¿Sigues ahí?”. El servidor rechaza más tiempo del que realmente ha pasado.', rankLeave: 'Salir de la clasificación', rankYou: 'tú', rankEmpty: 'Aún no hay nadie. ¡Sé el primero!', rankSoon: 'La clasificación abrirá pronto.', rankErr: 'No se pudo conectar. Inténtalo más tarde.', rankJoined: 'Te uniste a la clasificación de esta semana.', rankPrivacy: 'Al unirte solo se comparten tu apodo y tu tiempo de enfoque de esta semana.', rankLeft: 'Saliste de la clasificación.', rankRefresh: 'Actualizar',
      sceneAbout: 'Sobre esta imagen', photoBy: 'Foto:',
      scenes: { gunduz: ['Colinas verdes', 'Prados ondulados bajo un cielo de verano.'], gece: ['Cumbres estrelladas', 'Montañas nevadas bajo la Vía Láctea.'], orman: ['Bosque con niebla', 'Pinos que desaparecen en la niebla de la mañana.'], okyanus: ['Mar en calma', 'Un horizonte quieto donde el mar se une al cielo.'], lavanta: ['Valensole, Francia', 'Hileras de lavanda en la Provenza.'], gunbatimi: ['Dunas del desierto', 'Crestas de arena con la última luz del día.'] } },
    fr: { secTimer: 'Pomodoro', secBreak: 'Pauses', secFocus: 'Aides à la concentration', secLook: 'Apparence', optGame: 'Ouvrir 2048 quand une pause commence', optReturn: 'Me rappeler de lancer le minuteur à mon retour', optPresence: 'Demander « Tu es là ? » pendant les longues sessions', optIdle: 'Détecter quand je m’éloigne de l’ordinateur', optScene: 'Images de fond pour les thèmes', idleDenied: 'Autorisation refusée. Tu peux l’autoriser dans les réglages du navigateur.',
      game: 'Jeu de pause', gameGoal: 'Objectif : atteindre 32', gameScore: 'Score', gameBest: 'Record', gameNew: 'Nouvelle partie', gameWin: 'Bravo, tu as atteint 32 ! 🎉 Maintenant, fais vraiment une pause : lève-toi, étire-toi, bois de l’eau.', gameKeep: 'Continuer', gameOver: 'Plus de coups possibles. Lance une nouvelle partie !', gameHint: 'Flèches ou glisser', breakLeft: 'Pause : encore {t}', startBreak: 'Lancer la pause', breakOver: 'Pause terminée ! Tu es là ?', startFocus: 'Me concentrer', playBtn: '🎮 Jeu de pause',
      backQ: 'De retour ? 🌱', backText: 'N’oublie pas de lancer le minuteur.', startNow: 'Lancer', notNow: 'Pas maintenant', backNotif: 'On dirait que tu es de retour. Lancer le minuteur ?',
      hereQ: 'Tu es là ? 👋', hereText: 'Réponds dans les {s} pour que ton temps continue de compter.', here: 'Je suis là', pausedAway: 'Pas de réponse, le minuteur a donc été arrêté à {time}.', hereNotif: 'Tu es là ? Touche pour que ton temps continue de compter.',
      rank: 'Classement', rankWeek: 'Cette semaine', rankJoin: 'Rejoindre', rankNick: 'Pseudo', rankNickBad: 'Utilise 2 à 20 lettres, chiffres, espaces, points ou tirets.', rankInfo: 'Fair-play : seul le temps passé avec Grove ouvert compte, et il faut répondre aux « Tu es là ? ». Le serveur refuse plus de temps qu’il ne s’en est réellement écoulé.', rankLeave: 'Quitter le classement', rankYou: 'toi', rankEmpty: 'Personne pour l’instant. Sois le premier !', rankSoon: 'Le classement ouvre bientôt.', rankErr: 'Connexion impossible. Réessaie plus tard.', rankJoined: 'Tu as rejoint le classement de la semaine.', rankPrivacy: 'En rejoignant, seuls ton pseudo et ton temps de concentration de la semaine sont partagés.', rankLeft: 'Tu as quitté le classement.', rankRefresh: 'Actualiser',
      sceneAbout: 'À propos de cette image', photoBy: 'Photo :',
      scenes: { gunduz: ['Collines vertes', 'Prairies ondulées sous un ciel d’été lumineux.'], gece: ['Sommets étoilés', 'Montagnes enneigées sous la Voie lactée.'], orman: ['Forêt brumeuse', 'Des pins qui disparaissent dans la brume du matin.'], okyanus: ['Mer calme', 'Un horizon immobile où la mer rejoint le ciel.'], lavanta: ['Valensole, France', 'Rangs de lavande en Provence.'], gunbatimi: ['Dunes du désert', 'Crêtes de sable dans la dernière lumière du jour.'] } },
    it: { secTimer: 'Pomodoro', secBreak: 'Pause', secFocus: 'Aiuti alla concentrazione', secLook: 'Aspetto', optGame: 'Apri 2048 quando inizia una pausa', optReturn: 'Ricordami di avviare il timer quando torno', optPresence: 'Chiedi “Ci sei?” nelle sessioni lunghe', optIdle: 'Accorgiti quando mi allontano dal computer', optScene: 'Immagini di sfondo per i temi', idleDenied: 'Permesso non concesso. Puoi abilitarlo nelle impostazioni del browser.',
      game: 'Gioco della pausa', gameGoal: 'Obiettivo: arrivare a 32', gameScore: 'Punti', gameBest: 'Record', gameNew: 'Nuova partita', gameWin: 'Complimenti, sei arrivato a 32! 🎉 Ora fai davvero pausa: alzati, stirati e bevi un po’ d’acqua.', gameKeep: 'Continua a giocare', gameOver: 'Nessuna mossa rimasta. Inizia una nuova partita!', gameHint: 'Frecce o scorri', breakLeft: 'Pausa: mancano {t}', startBreak: 'Avvia la pausa', breakOver: 'Pausa finita! Ci sei?', startFocus: 'Inizia a concentrarti', playBtn: '🎮 Gioco della pausa',
      backQ: 'Sei tornato? 🌱', backText: 'Non dimenticare di avviare il timer.', startNow: 'Avvia', notNow: 'Non ora', backNotif: 'Sembra che tu sia tornato. Avviamo il timer?',
      hereQ: 'Ci sei? 👋', hereText: 'Rispondi entro {s} perché il tempo continui a contare.', here: 'Ci sono', pausedAway: 'Nessuna risposta, quindi il timer è stato fermato alle {time}.', hereNotif: 'Ci sei? Tocca perché il tuo tempo continui a contare.',
      rank: 'Classifica', rankWeek: 'Questa settimana', rankJoin: 'Partecipa', rankNick: 'Soprannome', rankNickBad: 'Usa 2–20 lettere, numeri, spazi, punti o trattini.', rankInfo: 'Fair play: conta solo il tempo con Grove aperto e bisogna rispondere ai “Ci sei?”. Il server rifiuta più tempo di quello realmente trascorso.', rankLeave: 'Esci dalla classifica', rankYou: 'tu', rankEmpty: 'Ancora nessuno. Sii il primo!', rankSoon: 'La classifica apre presto.', rankErr: 'Connessione non riuscita. Riprova più tardi.', rankJoined: 'Sei entrato nella classifica di questa settimana.', rankPrivacy: 'Partecipando condividi solo il soprannome e il tempo di concentrazione della settimana.', rankLeft: 'Sei uscito dalla classifica.', rankRefresh: 'Aggiorna',
      sceneAbout: 'Informazioni sull’immagine', photoBy: 'Foto:',
      scenes: { gunduz: ['Colline verdi', 'Prati ondulati sotto un luminoso cielo d’estate.'], gece: ['Vette stellate', 'Montagne innevate sotto la Via Lattea.'], orman: ['Bosco nella nebbia', 'Pini che scompaiono nella nebbia del mattino.'], okyanus: ['Mare calmo', 'Un orizzonte immobile dove il mare incontra il cielo.'], lavanta: ['Valensole, Francia', 'Filari di lavanda in Provenza.'], gunbatimi: ['Dune del deserto', 'Creste di sabbia nell’ultima luce del giorno.'] } },
    pt: { secTimer: 'Pomodoro', secBreak: 'Pausas', secFocus: 'Ajudas de foco', secLook: 'Aparência', optGame: 'Abrir o 2048 quando uma pausa começar', optReturn: 'Lembrar de iniciar o timer quando eu voltar', optPresence: 'Perguntar “Você está aí?” em sessões longas', optIdle: 'Perceber quando eu me afasto do computador', optScene: 'Imagens de fundo nos temas', idleDenied: 'A permissão não foi dada. Você pode permitir nas configurações do navegador.',
      game: 'Jogo da pausa', gameGoal: 'Meta: chegar a 32', gameScore: 'Pontos', gameBest: 'Recorde', gameNew: 'Novo jogo', gameWin: 'Parabéns, você chegou a 32! 🎉 Agora faça a pausa de verdade: levante, alongue-se e beba água.', gameKeep: 'Continuar jogando', gameOver: 'Sem jogadas. Comece um novo jogo!', gameHint: 'Setas ou deslize', breakLeft: 'Pausa: faltam {t}', startBreak: 'Iniciar pausa', breakOver: 'A pausa acabou! Você está aí?', startFocus: 'Começar a focar', playBtn: '🎮 Jogo da pausa',
      backQ: 'Voltou? 🌱', backText: 'Não esqueça de iniciar o timer.', startNow: 'Iniciar', notNow: 'Agora não', backNotif: 'Parece que você voltou. Vamos iniciar o timer?',
      hereQ: 'Você está aí? 👋', hereText: 'Responda em {s} para seu tempo continuar contando.', here: 'Estou aqui', pausedAway: 'Sem resposta, então o timer foi parado às {time}.', hereNotif: 'Você está aí? Toque para seu tempo continuar contando.',
      rank: 'Ranking', rankWeek: 'Esta semana', rankJoin: 'Participar', rankNick: 'Apelido', rankNickBad: 'Use 2–20 letras, números, espaços, pontos ou hífens.', rankInfo: 'Jogo limpo: só conta o tempo com o Grove aberto e é preciso responder aos “Você está aí?”. O servidor recusa mais tempo do que realmente passou.', rankLeave: 'Sair do ranking', rankYou: 'você', rankEmpty: 'Ninguém ainda. Seja o primeiro!', rankSoon: 'O ranking abre em breve.', rankErr: 'Não foi possível conectar. Tente mais tarde.', rankJoined: 'Você entrou no ranking desta semana.', rankPrivacy: 'Ao participar, só seu apelido e seu tempo de foco da semana são compartilhados.', rankLeft: 'Você saiu do ranking.', rankRefresh: 'Atualizar',
      sceneAbout: 'Sobre esta imagem', photoBy: 'Foto:',
      scenes: { gunduz: ['Colinas verdes', 'Campos ondulados sob um céu claro de verão.'], gece: ['Picos estrelados', 'Montanhas nevadas sob a Via Láctea.'], orman: ['Floresta na névoa', 'Pinheiros que somem na névoa da manhã.'], okyanus: ['Mar calmo', 'Um horizonte parado onde o mar encontra o céu.'], lavanta: ['Valensole, França', 'Fileiras de lavanda na Provença.'], gunbatimi: ['Dunas do deserto', 'Cristas de areia na última luz do dia.'] } },
    ru: { secTimer: 'Помодоро', secBreak: 'Перерывы', secFocus: 'Помощь в фокусе', secLook: 'Внешний вид', optGame: 'Открывать 2048, когда начинается перерыв', optReturn: 'Напоминать запустить таймер, когда я вернусь', optPresence: 'Спрашивать «Вы здесь?» в долгих сессиях', optIdle: 'Замечать, когда я отхожу от компьютера', optScene: 'Фоновые картинки для тем', idleDenied: 'Разрешение не выдано. Его можно включить в настройках браузера.',
      game: 'Игра на перерыв', gameGoal: 'Цель: дойти до 32', gameScore: 'Очки', gameBest: 'Рекорд', gameNew: 'Новая игра', gameWin: 'Поздравляем, вы дошли до 32! 🎉 Теперь отдохните по-настоящему: встаньте, потянитесь, выпейте воды.', gameKeep: 'Играть дальше', gameOver: 'Ходов больше нет. Начните новую игру!', gameHint: 'Стрелки или свайп', breakLeft: 'Перерыв: осталось {t}', startBreak: 'Начать перерыв', breakOver: 'Перерыв окончен! Вы здесь?', startFocus: 'Начать фокус', playBtn: '🎮 Игра на перерыв',
      backQ: 'Вернулись? 🌱', backText: 'Не забудьте запустить таймер.', startNow: 'Старт', notNow: 'Не сейчас', backNotif: 'Похоже, вы вернулись. Запустить таймер?',
      hereQ: 'Вы здесь? 👋', hereText: 'Ответьте в течение {s}, чтобы время продолжало считаться.', here: 'Я здесь', pausedAway: 'Ответа не было, поэтому таймер остановлен в {time}.', hereNotif: 'Вы здесь? Нажмите, чтобы время продолжало считаться.',
      rank: 'Рейтинг', rankWeek: 'Эта неделя', rankJoin: 'Участвовать', rankNick: 'Ник', rankNickBad: 'Используйте 2–20 букв, цифр, пробелов, точек или дефисов.', rankInfo: 'Честная игра: считается только время, когда Grove открыт, и нужно отвечать на «Вы здесь?». Сервер не примет больше времени, чем прошло на самом деле.', rankLeave: 'Выйти из рейтинга', rankYou: 'вы', rankEmpty: 'Пока никого. Будьте первым!', rankSoon: 'Рейтинг скоро откроется.', rankErr: 'Не удалось подключиться. Попробуйте позже.', rankJoined: 'Вы участвуете в рейтинге этой недели.', rankPrivacy: 'При участии публикуются только ваш ник и время фокуса за неделю.', rankLeft: 'Вы вышли из рейтинга.', rankRefresh: 'Обновить',
      sceneAbout: 'Об этой картинке', photoBy: 'Фото:',
      scenes: { gunduz: ['Зелёные холмы', 'Луга под ярким летним небом.'], gece: ['Звёздные вершины', 'Снежные горы под Млечным Путём.'], orman: ['Туманный лес', 'Сосны, исчезающие в утреннем тумане.'], okyanus: ['Спокойное море', 'Тихий горизонт, где море встречается с небом.'], lavanta: ['Валансоль, Франция', 'Ряды лаванды в Провансе.'], gunbatimi: ['Пустынные дюны', 'Песчаные гребни в последних лучах дня.'] } },
    ja: { secTimer: 'ポモドーロ', secBreak: '休憩', secFocus: '集中サポート', secLook: '見た目', optGame: '休憩が始まったら2048を開く', optReturn: '戻ってきたらタイマー開始をお知らせ', optPresence: '長いセッション中に「いますか？」と確認', optIdle: 'パソコンから離れたことを検知', optScene: 'テーマの背景画像', idleDenied: '許可されませんでした。ブラウザの設定で許可できます。',
      game: '休憩ゲーム', gameGoal: '目標：32を作る', gameScore: 'スコア', gameBest: 'ベスト', gameNew: '新しいゲーム', gameWin: 'おめでとう、32に到達しました！🎉 さあ本当に休憩しましょう。立ち上がって伸びをして、水を飲みましょう。', gameKeep: '続ける', gameOver: 'もう動かせません。新しいゲームを始めましょう！', gameHint: '矢印キーまたはスワイプ', breakLeft: '休憩：残り{t}', startBreak: '休憩を始める', breakOver: '休憩終了！いますか？', startFocus: '集中を始める', playBtn: '🎮 休憩ゲーム',
      backQ: 'おかえりなさい 🌱', backText: 'タイマーを始めるのを忘れずに。', startNow: '開始', notNow: '今はしない', backNotif: '戻ってきたようです。集中タイマーを始めますか？',
      hereQ: 'いますか？👋', hereText: '{s}以内に応答すると時間が引き続きカウントされます。', here: 'います', pausedAway: '応答がなかったため、{time}でタイマーを止めました。', hereNotif: 'いますか？タップすると集中時間のカウントが続きます。',
      rank: 'ランキング', rankWeek: '今週', rankJoin: '参加する', rankNick: 'ニックネーム', rankNickBad: '2〜20文字の文字・数字・スペース・ピリオド・ハイフンを使ってください。', rankInfo: 'フェアプレー：Grove を開いている間の集中時間だけが数えられ、「いますか？」に答える必要があります。サーバーは実際に経過した以上の時間を受け付けません。', rankLeave: 'ランキングから抜ける', rankYou: 'あなた', rankEmpty: 'まだ誰もいません。一番乗りしましょう！', rankSoon: 'ランキングはまもなく公開されます。', rankErr: '接続できませんでした。後でもう一度お試しください。', rankJoined: '今週のランキングに参加しました。', rankPrivacy: '参加すると、ニックネームと今週の集中時間だけが共有されます。', rankLeft: 'ランキングから抜けました。', rankRefresh: '更新',
      sceneAbout: 'この画像について', photoBy: '写真：',
      scenes: { gunduz: ['緑の丘', '明るい夏空の下に広がる草原。'], gece: ['星空の山々', '天の川の下の雪山。'], orman: ['霧の森', '朝霧に消えていく松の木々。'], okyanus: ['穏やかな海', '海と空が出会う静かな水平線。'], lavanta: ['ヴァランソル（フランス）', 'プロヴァンスのラベンダー畑。'], gunbatimi: ['砂漠の砂丘', '一日の最後の光に照らされた砂の稜線。'] } },
    zh: { secTimer: '番茄钟', secBreak: '休息', secFocus: '专注助手', secLook: '外观', optGame: '休息开始时打开 2048', optReturn: '回来时提醒我开始计时', optPresence: '长时间专注时询问“你还在吗？”', optIdle: '察觉我离开电脑', optScene: '主题背景图片', idleDenied: '未获得权限。你可以在浏览器设置中允许。',
      game: '休息小游戏', gameGoal: '目标：合成 32', gameScore: '得分', gameBest: '最高', gameNew: '新游戏', gameWin: '恭喜，你合成了 32！🎉 现在真的去休息吧：站起来，伸个懒腰，喝点水。', gameKeep: '继续玩', gameOver: '没有可走的步了，开始新游戏吧！', gameHint: '方向键或滑动', breakLeft: '休息：还剩 {t}', startBreak: '开始休息', breakOver: '休息结束！你还在吗？', startFocus: '开始专注', playBtn: '🎮 休息小游戏',
      backQ: '回来了吗？🌱', backText: '别忘了开始计时。', startNow: '开始', notNow: '暂不', backNotif: '你好像回来了。要开始专注计时吗？',
      hereQ: '你还在吗？👋', hereText: '请在 {s} 内回应，时间才会继续计算。', here: '我在', pausedAway: '没有收到回应，计时已在 {time} 停止。', hereNotif: '你还在吗？点按以继续计算专注时间。',
      rank: '排行榜', rankWeek: '本周', rankJoin: '加入', rankNick: '昵称', rankNickBad: '请使用 2–20 个字母、数字、空格、点或连字符。', rankInfo: '公平竞赛：只计算 Grove 打开时的专注时间，并且需要回应“你还在吗？”。服务器不会接受超过实际经过的时间。', rankLeave: '退出排行榜', rankYou: '你', rankEmpty: '还没有人，来做第一个吧！', rankSoon: '排行榜即将开放。', rankErr: '无法连接，请稍后再试。', rankJoined: '你已加入本周排行榜。', rankPrivacy: '加入后只会分享你的昵称和本周专注时间。', rankLeft: '你已退出排行榜。', rankRefresh: '刷新',
      sceneAbout: '关于这张图片', photoBy: '摄影：',
      scenes: { gunduz: ['绿色山丘', '明亮夏日天空下起伏的草地。'], gece: ['星空山峰', '银河下的雪山。'], orman: ['雾中森林', '消失在晨雾中的松树。'], okyanus: ['平静的海', '海天相接的宁静地平线。'], lavanta: ['瓦朗索勒，法国', '普罗旺斯的一排排薰衣草。'], gunbatimi: ['沙漠沙丘', '一天最后的光线中的沙脊。'] } }
  };
  var WN = { en: 'New in Grove: real photo themes, a tree that grows in 8 stages, a work plan and a history calendar 🌱', tr: 'Grove’da yeni: gerçek fotoğraflı temalar, 8 aşamada büyüyen ağaç, çalışma programı ve geçmiş takvimi 🌱', de: 'Neu in Grove: echte Fotos, ein Baum mit 8 Stufen, Arbeitsplan und Verlaufskalender 🌱', es: 'Novedades en Grove: fotos reales, un árbol en 8 etapas, plan de trabajo y calendario de historial 🌱', fr: 'Nouveau dans Grove : vraies photos, un arbre en 8 étapes, planning et calendrier d’historique 🌱', it: 'Novità in Grove: foto vere, un albero in 8 fasi, piano di lavoro e calendario della cronologia 🌱', pt: 'Novidades no Grove: fotos reais, uma árvore em 8 etapas, plano de trabalho e calendário de histórico 🌱', ru: 'Новое в Grove: настоящие фото, дерево с 8 стадиями, план работы и календарь истории 🌱', ja: 'Grove の新機能：本物の写真、8段階で育つ木、作業スケジュール、履歴カレンダー 🌱', zh: 'Grove 新功能：真实照片、八个阶段成长的树、工作计划和历史日历 🌱' };
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
    '.scene{position:fixed;inset:0;z-index:0;pointer-events:none;visibility:hidden;background:var(--bg)}' +
    '.scene.on{visibility:visible}.scene img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}' +
    '.scene::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,color-mix(in srgb,var(--bg) 70%,transparent),transparent 45%),color-mix(in srgb,var(--bg) var(--veil,26%),transparent)}' +
    ':root[data-skin="gece"],:root[data-skin="orman"],:root[data-skin="gunbatimi"]{--veil:40%}' +
    'html.has-scene body{background:var(--bg)}html.has-scene .app{position:relative;z-index:1}' +
    'html.has-scene .keys span{background:color-mix(in srgb,var(--bg) 72%,transparent);padding:2px 8px;border-radius:8px}' +
    'html.has-scene .tabs{box-shadow:0 1px 0 rgb(0 0 0/.04)}html.has-scene .icon-btn{background:color-mix(in srgb,var(--bg) 70%,transparent)}' +
    '.scene-info{position:fixed;right:14px;bottom:12px;z-index:5;display:flex;flex-direction:column;align-items:flex-end;gap:6px;font-size:.78rem;max-width:280px}' +
    '.scene-info button{display:inline-flex;align-items:center;gap:6px;border:0;border-radius:999px;padding:6px 11px;background:color-mix(in srgb,var(--bg) 78%,transparent);color:var(--fg);font-weight:600;cursor:pointer;backdrop-filter:blur(6px)}' +
    '.scene-info .card{background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(8px);border:1px solid var(--line);border-radius:14px;padding:10px 12px;line-height:1.4;box-shadow:0 10px 30px -12px rgb(0 0 0/.4)}' +
    '.scene-info .card b{display:block;font-size:.88rem}.scene-info .card small{display:block;color:var(--muted);margin-top:6px}.scene-info .card a{color:var(--fg);font-weight:600}' +
    '.set-sec{margin-top:18px}.set-sec:first-of-type{margin-top:14px}.set-sec .menu-title{margin:0 0 8px}' +
    '.sw-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:9px 0;border-bottom:1px solid var(--line);font-size:.9rem;cursor:pointer}' +
    '.sw-row:last-child{border-bottom:0}.sw-row input{appearance:none;-webkit-appearance:none;flex:none;width:40px;height:23px;border-radius:999px;background:var(--line);position:relative;cursor:pointer;transition:background .2s;margin:0}' +
    '.sw-row input::after{content:"";position:absolute;top:3px;left:3px;width:17px;height:17px;border-radius:50%;background:#fff;transition:transform .2s;box-shadow:0 1px 2px rgb(0 0 0/.3)}' +
    '.sw-row input:checked{background:var(--go)}.sw-row input:checked::after{transform:translateX(17px)}' +
    '#setSheet .checks{display:none}' +
    '.pomo-set{width:min(100%,380px);padding:0;gap:8px}.pomo-set .stepper{position:relative;padding:6px 4px 7px;gap:3px;border-radius:12px;transition:border-color .2s,background .2s}' +
    '.pomo-set .stepper .lbl{font-size:.72rem}.pomo-set .stepper .lbl:last-child{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}' +
    '.pomo-set .stepper button{width:26px;height:26px;font-size:.95rem}.pomo-set .stepper output{font-size:.98rem}' +
    '.pomo-set .stepper.cur{border-color:color-mix(in srgb,var(--go) 55%,var(--line));background:color-mix(in srgb,var(--go) 7%,transparent)}.pomo-set .stepper.cur .lbl{color:var(--go)}' +
    'html.has-scene .pomo-set .stepper{background:color-mix(in srgb,var(--bg) 70%,transparent);backdrop-filter:blur(6px)}html.has-scene .pomo-set .stepper.cur{background:color-mix(in srgb,var(--bg) 82%,var(--go) 8%)}' +
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
    '.rk-note{color:var(--muted);font-size:.8rem;line-height:1.45;margin-top:10px}' +
    '#gameBtn{margin-top:-4px}@media (max-width:520px){.scene-info{right:10px;bottom:10px;max-width:calc(100% - 20px)}.scene-info button{padding:8px;opacity:.85}.scene-info button .t{display:none}}';
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
    var s1 = sec('secTimer');
    // the duration steppers live right under the Pomodoro clock instead
    setGrid.classList.add('pomo-set'); var ring = document.querySelector('#pomo .ring'); ring.parentNode.insertBefore(setGrid, ring.nextSibling);
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
  // Real photos (free Unsplash licence), loaded from Unsplash's image CDN at exactly the size this screen needs.
  var PHOTOS = {
    gunduz: { id: 'photo-1634664125468-6583a2cda747', by: 'Tali Despins', page: 'a-green-field-with-a-few-clouds-in-the-sky-FQkQxgO9Kh8' },
    gece: { id: 'photo-1519681393784-d120267933ba', by: 'Benjamin Voros', page: 'snow-mountain-under-stars-phIFdC6lA4E' },
    orman: { id: 'photo-1506452305024-9d3f02d1c9b5', by: 'Kyle Glenn', page: 'green-leafed-pine-trees-SrASYZZpyjw' },
    okyanus: { id: 'photo-1468581264429-2548ef9eb732', by: 'Thomas Vimare', page: 'body-of-water-under-blue-and-white-sky-at-daytime-IZ01rjX0XQA' },
    lavanta: { id: 'photo-1600759487717-62bbb608106e', by: 'Antony BEC', page: 'lavender-fields-in-valensole-france-nD9tEn63suc' },
    gunbatimi: { id: 'photo-1548272475-4a32d90e4f91', by: 'Mikk Tõnissoo', page: 'black-textile-PWf-Dr2qpOo' }
  };
  var UTM = '?utm_source=grove&utm_medium=referral';
  var sceneEl = el('div', 'scene'); sceneEl.setAttribute('aria-hidden', 'true'); document.body.insertBefore(sceneEl, document.body.firstChild);
  var sceneImg = el('img'); sceneImg.alt = ''; sceneImg.decoding = 'async'; sceneImg.crossOrigin = 'anonymous'; sceneImg.referrerPolicy = 'no-referrer';
  try { sceneImg.fetchPriority = 'low'; } catch (e) {}
  sceneEl.appendChild(sceneImg);
  function photoUrl(sk) {   // the exact crop this window needs (rounded so the browser cache is reused), capped at 2× density
    var dpr = Math.min(window.devicePixelRatio || 1, 2), up = function (v) { return Math.min(2400, Math.max(400, Math.ceil(v * dpr / 200) * 200)); };
    return 'https://images.unsplash.com/' + (PHOTOS[sk] || PHOTOS.gunduz).id + '?auto=format&fit=crop&q=68&w=' + up(window.innerWidth) + '&h=' + up(window.innerHeight);
  }
  sceneImg.addEventListener('load', function () { sceneEl.classList.add('on'); });
  sceneImg.addEventListener('error', function () { sceneEl.classList.remove('on'); });
  var infoEl = el('div', 'scene-info'); document.body.appendChild(infoEl);
  var infoBtn = el('button', null); infoBtn.type = 'button'; infoEl.appendChild(infoBtn);
  var infoCard = el('div', 'card'); infoCard.hidden = true; infoEl.insertBefore(infoCard, infoBtn);
  infoBtn.addEventListener('click', function () { infoCard.hidden = !infoCard.hidden; infoBtn.setAttribute('aria-expanded', infoCard.hidden ? 'false' : 'true'); });
  var shownScene = '';
  function curSkin() { return document.documentElement.getAttribute('data-skin') || 'gunduz'; }
  function renderScene() {
    var on = S.x.scene, sk = curSkin();
    document.documentElement.classList.toggle('has-scene', on);
    infoEl.hidden = !on;
    if (!on) { sceneEl.classList.remove('on'); document.documentElement.classList.remove('photo-on'); return; }
    if (shownScene !== sk) {
      var next = photoUrl(sk), had = sceneEl.classList.contains('on'); shownScene = sk;
      if (!had) { sceneImg.src = next; }
      else {   // keep the current photo until the next one is decoded, so switching themes never flashes or stutters
        var pre = new Image(); pre.crossOrigin = 'anonymous'; pre.referrerPolicy = 'no-referrer'; pre.src = next;
        (pre.decode ? pre.decode() : Promise.resolve()).then(function () { if (shownScene === sk) sceneImg.src = next; }, function () { if (shownScene === sk) sceneImg.src = next; });
      }
    }
    else if (sceneImg.complete && sceneImg.naturalWidth) { sceneEl.classList.add('on'); document.documentElement.classList.add('photo-on'); }
    renderSceneInfo();
  }
  function link(text, href) { var a = el('a'); a.href = href; a.target = '_blank'; a.rel = 'noopener'; a.textContent = text; return a; }
  function renderSceneInfo() {
    var sk = curSkin(), sc = (raw('scenes') || {})[sk] || ['', ''], ph = PHOTOS[sk] || PHOTOS.gunduz;
    infoBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 11v5"></path><circle cx="12" cy="7.8" r="1" fill="currentColor"></circle></svg>';
    var tx = el('span', 't'); tx.textContent = sc[0]; infoBtn.appendChild(tx);
    infoBtn.title = t('sceneAbout'); infoBtn.setAttribute('aria-label', sc[0] + ' – ' + t('sceneAbout')); infoBtn.setAttribute('aria-expanded', infoCard.hidden ? 'false' : 'true');
    infoCard.innerHTML = '';
    var b = el('b'); b.textContent = sc[0]; var p = el('span'); p.textContent = sc[1];
    var sm = el('small'); sm.appendChild(document.createTextNode(t('photoBy') + ' '));
    sm.appendChild(link(ph.by, 'https://unsplash.com/photos/' + ph.page + UTM)); sm.appendChild(document.createTextNode(' · '));
    sm.appendChild(link('Unsplash', 'https://unsplash.com/' + UTM));
    infoCard.appendChild(b); infoCard.appendChild(p); infoCard.appendChild(sm);
  }
  document.addEventListener('grove:skin', renderScene);
  var rsT = 0, lastSize = innerWidth + 'x' + innerHeight;
  window.addEventListener('resize', function () { clearTimeout(rsT); rsT = setTimeout(function () {
    var sz = innerWidth + 'x' + innerHeight; if (sz === lastSize || !S.x.scene) return; lastSize = sz;
    var u = photoUrl(curSkin()); if (u !== sceneImg.src) { var pre = new Image(); pre.crossOrigin = 'anonymous'; pre.referrerPolicy = 'no-referrer'; pre.onload = function () { sceneImg.src = u; }; pre.src = u; }
  }, 600); });

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
  function markCurStepper() { document.querySelectorAll('.pomo-set .stepper').forEach(function (st) { st.classList.toggle('cur', st.getAttribute('data-key') === S.pomo.mode); }); }
  document.addEventListener('grove:timer', markCurStepper); document.addEventListener('grove:pomo', markCurStepper);
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
  var FB = { apiKey: 'AIzaSyAIF3uojWiF7VWqIM5YR4XZOuFCHShPwGc', projectId: 'grove-cd0f3' };   // public web config (access is limited by the security rules)
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
          .then(function (r) { if (!r.ok) { l.refresh = ''; l.idToken = ''; throw new Error('refresh'); } return r.json(); })
          .then(function (j) { return { idToken: j.id_token, refreshToken: j.refresh_token, localId: j.user_id, expiresIn: j.expires_in }; })
      : fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + FB.apiKey, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"returnSecureToken":true}' })
          .then(function (r) { if (!r.ok) throw new Error('signup'); return r.json(); });
    return req.catch(function (e) { if (e.message === 'refresh') return token().then(function () { return { idToken: l.idToken, refreshToken: l.refresh, localId: l.uid, expiresIn: (l.exp - Date.now()) / 1000 }; }); throw e; })
      .then(function (j) { l.idToken = j.idToken; l.refresh = j.refreshToken; l.uid = j.localId; l.exp = Date.now() + (+j.expiresIn || 3600) * 1000; A.save(); return l.idToken; });
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
      .then(function () { lbState.dirty = false; lbState.lastSync = Date.now(); l.synced = true; l.weeks = (l.weeks || []).filter(function (w) { return w !== l.week; }).concat([l.week]).slice(-60); A.save(); })
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
        if (isBad(n)) { A.toast(t('rankNickRude')); return; }
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
      var all = (l.weeks || []).concat([w]).filter(function (x, i, arr) { return arr.indexOf(x) === i; });   // remove every week this device has posted
      Promise.all(all.map(function (wk) { return api('/lb/' + wk + '/players/' + l.uid, { method: 'DELETE' }).catch(function () {}); }))
        .then(function () { l.joined = false; l.ms = 0; l.weeks = []; A.save(); A.toast(t('rankLeft')); lbLoad(); renderRank(); });
    })); else act.appendChild(el('span'));
    act.appendChild(btn(t('close'), function () { $('rankSheet').hidden = true; }));
    rkSh.appendChild(act);
  }
  var rankBtn = el('button', 'act-btn', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM17 6h3a3 3 0 0 1-3 4M7 6H4a3 3 0 0 0 3 4"></path></svg><span></span>');
  rankBtn.type = 'button'; rankBtn.id = 'rankBtn';
  document.querySelector('.garden-actions').appendChild(rankBtn);
  rankBtn.addEventListener('click', function () { $('rankSheet').hidden = false; renderRank(); if (LB_ON) lbLoad(); });
  window.addEventListener('pagehide', function () { if (lbState.dirty) lbSync(); });

  // ---------------------------------------------------------------- more strings (background, schedule, nickname)
  var X2 = {
    en: { ttShort: 'Plan', bgTitle: 'Background', bgPlain: 'Plain', bgPhoto: 'Photo', tt: 'Work plan', ttEmpty: 'Nothing planned for this day.', ttAdd: 'Add', ttSubject: 'Task or subject', ttNow: 'now', ttNext: 'next', ttBad: 'Write a task and pick an end time after the start time.', ttDel: 'Delete', rankNickRude: 'Please choose a friendlier nickname.' },
    tr: { ttShort: 'Program', bgTitle: 'Arka plan', bgPlain: 'Sade', bgPhoto: 'Fotoğraf', tt: 'Çalışma programı', ttEmpty: 'Bu gün için plan yok.', ttAdd: 'Ekle', ttSubject: 'İş, ders ya da konu', ttNow: 'şimdi', ttNext: 'sıradaki', ttBad: 'Bir iş ya da konu yaz ve bitişi başlangıçtan sonra seç.', ttDel: 'Sil', rankNickRude: 'Lütfen daha uygun bir takma ad seç.' },
    de: { ttShort: 'Plan', bgTitle: 'Hintergrund', bgPlain: 'Schlicht', bgPhoto: 'Foto', tt: 'Arbeitsplan', ttEmpty: 'Für diesen Tag ist nichts geplant.', ttAdd: 'Hinzufügen', ttSubject: 'Aufgabe oder Fach', ttNow: 'jetzt', ttNext: 'als Nächstes', ttBad: 'Gib eine Aufgabe ein und wähle ein Ende nach dem Beginn.', ttDel: 'Löschen', rankNickRude: 'Bitte wähle einen freundlicheren Spitznamen.' },
    es: { ttShort: 'Plan', bgTitle: 'Fondo', bgPlain: 'Liso', bgPhoto: 'Foto', tt: 'Plan de trabajo', ttEmpty: 'Nada planeado para este día.', ttAdd: 'Añadir', ttSubject: 'Tarea o asignatura', ttNow: 'ahora', ttNext: 'siguiente', ttBad: 'Escribe una tarea y elige un final posterior al inicio.', ttDel: 'Eliminar', rankNickRude: 'Elige un apodo más amable, por favor.' },
    fr: { ttShort: 'Planning', bgTitle: 'Arrière-plan', bgPlain: 'Uni', bgPhoto: 'Photo', tt: 'Planning de travail', ttEmpty: 'Rien de prévu ce jour-là.', ttAdd: 'Ajouter', ttSubject: 'Tâche ou matière', ttNow: 'en cours', ttNext: 'ensuite', ttBad: 'Indique une tâche et une fin après le début.', ttDel: 'Supprimer', rankNickRude: 'Choisis un pseudo plus sympathique, s’il te plaît.' },
    it: { ttShort: 'Piano', bgTitle: 'Sfondo', bgPlain: 'Semplice', bgPhoto: 'Foto', tt: 'Piano di lavoro', ttEmpty: 'Niente in programma per questo giorno.', ttAdd: 'Aggiungi', ttSubject: 'Attività o materia', ttNow: 'ora', ttNext: 'dopo', ttBad: 'Scrivi un’attività e scegli una fine dopo l’inizio.', ttDel: 'Elimina', rankNickRude: 'Scegli un soprannome più gentile, per favore.' },
    pt: { ttShort: 'Plano', bgTitle: 'Fundo', bgPlain: 'Simples', bgPhoto: 'Foto', tt: 'Plano de trabalho', ttEmpty: 'Nada planejado para este dia.', ttAdd: 'Adicionar', ttSubject: 'Tarefa ou matéria', ttNow: 'agora', ttNext: 'próxima', ttBad: 'Escreva uma tarefa e escolha um fim depois do início.', ttDel: 'Excluir', rankNickRude: 'Escolha um apelido mais gentil, por favor.' },
    ru: { ttShort: 'План', bgTitle: 'Фон', bgPlain: 'Простой', bgPhoto: 'Фото', tt: 'План работы', ttEmpty: 'На этот день ничего не запланировано.', ttAdd: 'Добавить', ttSubject: 'Задача или предмет', ttNow: 'сейчас', ttNext: 'далее', ttBad: 'Укажите задачу и время окончания позже начала.', ttDel: 'Удалить', rankNickRude: 'Пожалуйста, выберите более дружелюбный ник.' },
    ja: { ttShort: '予定', bgTitle: '背景', bgPlain: 'シンプル', bgPhoto: '写真', tt: '作業スケジュール', ttEmpty: 'この日の予定はありません。', ttAdd: '追加', ttSubject: '作業・科目', ttNow: '今', ttNext: '次', ttBad: '作業名を入力し、終了時刻を開始より後にしてください。', ttDel: '削除', rankNickRude: 'もっと感じのよいニックネームにしてください。' },
    zh: { ttShort: '计划', bgTitle: '背景', bgPlain: '简洁', bgPhoto: '照片', tt: '工作计划', ttEmpty: '这一天没有安排。', ttAdd: '添加', ttSubject: '任务或科目', ttNow: '进行中', ttNext: '下一节', ttBad: '请输入任务，并让结束时间晚于开始时间。', ttDel: '删除', rankNickRude: '请换一个更友好的昵称。' }
  };
  Object.keys(X2).forEach(function (c) { if (LANGS[c]) Object.keys(X2[c]).forEach(function (k) { LANGS[c][k] = X2[c][k]; }); });

  document.head.appendChild(el('style', null,
    '.bgsel{display:grid;grid-template-columns:1fr 1fr;gap:6px}' +
    '.bgsel button{border:1px solid var(--line);background:var(--bg);color:var(--fg);border-radius:10px;padding:8px 10px;font:inherit;font-size:.84rem;font-weight:600;cursor:pointer}' +
    '.bgsel button[aria-checked="true"]{border-color:var(--go);box-shadow:inset 0 0 0 1px var(--go)}' +
    /* clock on photos: a light, lock-screen style face in a colour picked from each photo */
    'html.photo-on .readout,html.photo-on .pomo-time{font-family:var(--font-ui);font-weight:300;letter-spacing:-.035em;color:var(--clock);text-shadow:0 2px 28px var(--clock-glow)}' +
    'html.photo-on .readout .frac{color:var(--clock);opacity:.72}html.photo-on .status,html.photo-on .keys{text-shadow:0 1px 8px var(--clock-glow)}' +
    ':root[data-skin="gunduz"]{--clock:#103B2C;--clock-glow:rgb(255 255 255/.6)}:root[data-skin="okyanus"]{--clock:#0D3550;--clock-glow:rgb(255 255 255/.6)}' +
    ':root[data-skin="lavanta"]{--clock:#3A2368;--clock-glow:rgb(255 255 255/.55)}:root[data-skin="gece"]{--clock:#F3F0FF;--clock-glow:rgb(20 10 60/.6)}' +
    ':root[data-skin="orman"]{--clock:#EEF4EA;--clock-glow:rgb(5 20 10/.7)}:root[data-skin="gunbatimi"]{--clock:#FFF2E4;--clock-glow:rgb(60 20 10/.55)}' +
    '.tt-days{display:flex;gap:4px;margin-top:14px;overflow-x:auto;padding-bottom:2px}' +
    '.tt-days button{flex:1 0 auto;min-width:44px;border:1px solid var(--line);background:var(--bg);color:var(--fg);border-radius:999px;padding:6px 8px;font:inherit;font-size:.8rem;font-weight:600;cursor:pointer}' +
    '.tt-days button[aria-pressed="true"]{background:var(--go);color:var(--go-fg);border-color:transparent}.tt-days button.today{border-color:var(--go)}' +
    '.tt-list{list-style:none;margin:12px 0 0;padding:0;max-height:min(40vh,320px);overflow:auto}' +
    '.tt-list li{display:grid;grid-template-columns:auto 1fr auto auto;gap:10px;align-items:center;padding:9px 4px;border-bottom:1px solid var(--line);font-size:.92rem}' +
    '.tt-list .tm{font-family:var(--font-digits);font-size:.82rem;color:var(--muted)}.tt-list .tag{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--go)}' +
    '.tt-list li.now{background:color-mix(in srgb,var(--go) 12%,transparent);border-radius:10px}.tt-list .x{border:0;background:transparent;color:var(--muted);font-size:1.1rem;cursor:pointer;padding:2px 6px;border-radius:6px}' +
    '.tt-form{display:grid;grid-template-columns:1fr 1fr auto;gap:6px;margin-top:12px;align-items:center}.tt-form .sub{grid-column:1/-1}' +
    '.tt-form input{min-width:0;padding:9px 10px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--fg);font:inherit;font-size:.88rem}' +
    '@media (max-width:520px){.tt-form{grid-template-columns:1fr 1fr}.tt-form button{grid-column:1/-1}}'));

  // ---------------------------------------------------------------- background picker in the theme menu
  var bgWrap = el('div'); var bgT = el('p', 'menu-title menu-gap'); bgT.setAttribute('data-x', 'bgTitle'); bgWrap.appendChild(bgT);
  var bgSel = el('div', 'bgsel'); bgSel.setAttribute('role', 'radiogroup'); bgWrap.appendChild(bgSel);
  ['plain', 'photo'].forEach(function (v) {
    var b = el('button'); b.type = 'button'; b.setAttribute('role', 'radio'); b.setAttribute('data-bg', v); b.setAttribute('data-x', v === 'plain' ? 'bgPlain' : 'bgPhoto');
    b.addEventListener('click', function () { S.x.scene = v === 'photo'; A.save(); if (rows.scene) rows.scene.input.checked = S.x.scene; renderScene(); renderBgSel(); });
    bgSel.appendChild(b);
  });
  var langTitle = document.querySelector('#themeMenu [data-i18n="menuLang"]');
  langTitle.parentNode.insertBefore(bgWrap, langTitle);
  function renderBgSel() { bgSel.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-checked', (b.getAttribute('data-bg') === 'photo') === !!S.x.scene ? 'true' : 'false'); }); }
  rows.scene.input.addEventListener('change', renderBgSel);
  sceneImg.addEventListener('load', function () { document.documentElement.classList.toggle('photo-on', !!S.x.scene); });
  sceneImg.addEventListener('error', function () { document.documentElement.classList.remove('photo-on'); });
  document.addEventListener('grove:skin', function () { if (!sceneEl.classList.contains('on')) document.documentElement.classList.remove('photo-on'); });

  // ---------------------------------------------------------------- weekly work / study plan (kept on this device)
  if (!S.x.tt || typeof S.x.tt !== 'object') S.x.tt = {};
  var ttDay = ((new Date().getDay() + 6) % 7) + 1;   // 1 = Monday … 7 = Sunday
  var ttSh = sheet('ttSheet');
  function hm(s) { var p = String(s || '').split(':'); return (+p[0]) * 60 + (+p[1] || 0); }
  function dayName(d) { var base = new Date(2024, 0, d); return base.toLocaleDateString(A.locale(), { weekday: 'short' }); }   // 2024-01-01 was a Monday
  function renderTT() {
    ttSh.innerHTML = '';
    var head = el('div', 'g-head'), h2 = el('h2'); h2.textContent = t('tt'); head.appendChild(h2); ttSh.appendChild(head);
    var days = el('div', 'tt-days'), today = ((new Date().getDay() + 6) % 7) + 1;
    for (var d = 1; d <= 7; d++) (function (d) {
      var b = el('button', d === today ? 'today' : ''); b.type = 'button'; b.textContent = dayName(d); b.setAttribute('aria-pressed', d === ttDay ? 'true' : 'false');
      b.addEventListener('click', function () { ttDay = d; renderTT(); }); days.appendChild(b);
    })(d);
    ttSh.appendChild(days);
    var list = (S.x.tt[ttDay] || []).slice().sort(function (a, b) { return hm(a.s) - hm(b.s); });
    if (!list.length) { var e = el('p', 'rk-note'); e.textContent = t('ttEmpty'); ttSh.appendChild(e); }
    else {
      var now = new Date(), mins = now.getHours() * 60 + now.getMinutes(), isToday = ttDay === today, nextDone = false;
      var ul = el('ul', 'tt-list');
      list.forEach(function (it) {
        var cur = isToday && hm(it.s) <= mins && mins < hm(it.e), nxt = isToday && !cur && !nextDone && hm(it.s) > mins;
        if (nxt) nextDone = true;
        var li = el('li', cur ? 'now' : ''), tm = el('span', 'tm'), nm = el('span'), tag = el('span', 'tag'), x = el('button', 'x');
        tm.textContent = it.s + '–' + it.e; nm.textContent = it.n; tag.textContent = cur ? t('ttNow') : nxt ? t('ttNext') : '';
        x.type = 'button'; x.textContent = '×'; x.setAttribute('aria-label', t('ttDel') + ': ' + it.n);
        x.addEventListener('click', function () { var arr = S.x.tt[ttDay] || []; var i = arr.indexOf(it); if (i >= 0) arr.splice(i, 1); A.save(); renderTT(); });
        li.appendChild(tm); li.appendChild(nm); li.appendChild(tag); li.appendChild(x); ul.appendChild(li);
      });
      ttSh.appendChild(ul);
    }
    var f = el('form', 'tt-form'), s1 = el('input'), s2 = el('input'), sub = el('input', 'sub');
    s1.type = 'time'; s2.type = 'time'; s1.required = s2.required = true; sub.maxLength = 40; sub.placeholder = t('ttSubject'); sub.setAttribute('aria-label', t('ttSubject'));
    var last = list.length ? list[list.length - 1].e : '09:00'; s1.value = last; s2.value = (function () { var m = Math.min(hm(last) + 40, 23 * 60 + 59); return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + m % 60).slice(-2); })();
    f.appendChild(sub); f.appendChild(s1); f.appendChild(s2); var ab = btn(t('ttAdd'), null, 'primary'); ab.type = 'submit'; f.appendChild(ab);
    f.addEventListener('submit', function (e) {
      e.preventDefault(); var n = sub.value.trim().replace(/\s+/g, ' ');
      if (!n || !s1.value || !s2.value || hm(s2.value) <= hm(s1.value)) { A.toast(t('ttBad')); return; }
      (S.x.tt[ttDay] = S.x.tt[ttDay] || []).push({ s: s1.value, e: s2.value, n: n.slice(0, 40) }); A.save(); renderTT();
      var ni = ttSh.querySelector('.tt-form .sub'); if (ni) ni.focus();
    });
    ttSh.appendChild(f);
    var act = el('div', 'sheet-actions'); act.appendChild(el('span')); act.appendChild(btn(t('close'), function () { $('ttSheet').hidden = true; })); ttSh.appendChild(act);
  }
  var ttBtn = el('button', 'act-btn', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18M8 3v4M16 3v4"></path></svg><span></span>');
  ttBtn.type = 'button'; ttBtn.id = 'ttBtn';
  document.querySelector('.garden-actions').insertBefore(ttBtn, rankBtn);
  ttBtn.addEventListener('click', function () { $('ttSheet').hidden = false; renderTT(); });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !$('ttSheet').hidden) { $('ttSheet').hidden = true; e.stopImmediatePropagation(); } }, true);
  function applyText2() { ttBtn.lastChild.textContent = t('ttShort'); ttBtn.title = t('tt'); renderBgSel(); if (!$('ttSheet').hidden) renderTT(); }
  document.addEventListener('grove:lang', applyText2);
  applyText2();

  // ---------------------------------------------------------------- nickname filter (also enforced by the server rules)
  var BAD_SUB = ['orospu', 'siktir', 'sikerim', 'sikeyim', 'sikis', 'yarrak', 'pezevenk', 'kahpe', 'gavat', 'amcik', 'aminako', 'aminakoy', 'ananisik', 'anasinisik', 'gotveren', 'kaltak', 'serefsiz', 'yavsak', 'gerizekali', 'fuck', 'bitch', 'nigger', 'nigga', 'faggot', 'whore', 'slut', 'asshole', 'pussy', 'bastard', 'motherf', 'retard', 'rapist', 'hitler', 'scheisse', 'arschloch', 'hurensohn', 'fotze', 'wichser', 'schlampe', 'missgeburt', 'mierda', 'cabron', 'pendejo', 'gilipollas', 'maricon', 'chinga', 'putain', 'salope', 'connard', 'connasse', 'encule', 'cazzo', 'stronzo', 'vaffanculo', 'puttana', 'frocio', 'minchia', 'caralho', 'buceta', 'arrombado', 'хуй', 'хуе', 'хуё', 'пизд', 'ебат', 'ебан', 'ебал', 'бляд', 'мудак', 'пидор', 'пидар', 'залуп', 'гандон', 'まんこ', 'ちんこ', '死ね', '操你', '傻逼', '他妈', '妈的', '屄', '鸡巴'];
  var BAD_TOKEN = ['ibne', 'nazi', 'shit', 'cunt', 'сука', 'sik', 'sikik', 'am', 'amk', 'aq', 'oc', 'pic', 'got', 'puta', 'puto', 'merde', 'porra', 'foda', 'viado', 'troia', 'verga', 'cono', 'nique', 'batard', 'dick', 'cock', 'fag', 'cum', 'tits', 'ass', 'admin', 'moderator', 'yonetici'];
  var LEET = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b', '@': 'a', '$': 's', '!': 'i' };
  var TRMAP = { 'ı': 'i', 'İ': 'i', 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c', 'â': 'a', 'î': 'i', 'û': 'u', 'ñ': 'n', 'ß': 'ss' };
  function normNick(s) {
    s = String(s).toLowerCase().replace(/[ıİğüşöçâîûñß]/g, function (c) { return TRMAP[c] || c; });
    s = s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[0134578@$!]/g, function (c) { return LEET[c] || c; });
    return s;
  }
  function isBad(name) {
    var n = normNick(name), tokens = n.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
    var joined = tokens.join('').replace(/(.)\1+/g, '$1'), joinedRaw = tokens.join('');
    if (BAD_SUB.some(function (w) { var ww = w.replace(/(.)\1+/g, '$1'); return joined.indexOf(ww) >= 0 || joinedRaw.indexOf(w) >= 0; })) return true;
    return tokens.some(function (tk) { var c = tk.replace(/(.)\1+/g, '$1'); return BAD_TOKEN.indexOf(tk) >= 0 || BAD_TOKEN.indexOf(c) >= 0; });
  }
  window.__groveNickBad = isBad;

  // ---------------------------------------------------------------- history calendar (inside Statistics)
  var X3 = {
    en: { hist: 'History', histMonth: 'This month: {d}', histNone: 'No focus time on this day.', histPick: 'Pick a day to see its details.', histPrev: 'Previous month', histNext: 'Next month', histPomos: { one: '{n} pomodoro', other: '{n} pomodoros' } },
    tr: { hist: 'Geçmiş', histMonth: 'Bu ay: {d}', histNone: 'Bu gün odak süresi yok.', histPick: 'Ayrıntıları görmek için bir güne dokun.', histPrev: 'Önceki ay', histNext: 'Sonraki ay', histPomos: { one: '{n} pomodoro', other: '{n} pomodoro' } },
    de: { hist: 'Verlauf', histMonth: 'Dieser Monat: {d}', histNone: 'An diesem Tag keine Fokuszeit.', histPick: 'Wähle einen Tag, um Details zu sehen.', histPrev: 'Vorheriger Monat', histNext: 'Nächster Monat', histPomos: { one: '{n} Pomodoro', other: '{n} Pomodoros' } },
    es: { hist: 'Historial', histMonth: 'Este mes: {d}', histNone: 'Sin tiempo de enfoque este día.', histPick: 'Elige un día para ver los detalles.', histPrev: 'Mes anterior', histNext: 'Mes siguiente', histPomos: { one: '{n} pomodoro', other: '{n} pomodoros' } },
    fr: { hist: 'Historique', histMonth: 'Ce mois-ci : {d}', histNone: 'Aucun temps de concentration ce jour-là.', histPick: 'Choisis un jour pour voir le détail.', histPrev: 'Mois précédent', histNext: 'Mois suivant', histPomos: { one: '{n} pomodoro', other: '{n} pomodoros' } },
    it: { hist: 'Cronologia', histMonth: 'Questo mese: {d}', histNone: 'Nessun tempo di concentrazione in questo giorno.', histPick: 'Scegli un giorno per vedere i dettagli.', histPrev: 'Mese precedente', histNext: 'Mese successivo', histPomos: { one: '{n} pomodoro', other: '{n} pomodori' } },
    pt: { hist: 'Histórico', histMonth: 'Este mês: {d}', histNone: 'Sem tempo de foco neste dia.', histPick: 'Escolha um dia para ver os detalhes.', histPrev: 'Mês anterior', histNext: 'Próximo mês', histPomos: { one: '{n} pomodoro', other: '{n} pomodoros' } },
    ru: { hist: 'История', histMonth: 'В этом месяце: {d}', histNone: 'В этот день не было времени фокуса.', histPick: 'Выберите день, чтобы увидеть подробности.', histPrev: 'Предыдущий месяц', histNext: 'Следующий месяц', histPomos: { one: '{n} помидор', few: '{n} помидора', many: '{n} помидоров', other: '{n} помидора' } },
    ja: { hist: '履歴', histMonth: '今月：{d}', histNone: 'この日の集中時間はありません。', histPick: '日付を選ぶと詳細が表示されます。', histPrev: '前の月', histNext: '次の月', histPomos: { other: 'ポモドーロ {n} 回' } },
    zh: { hist: '历史', histMonth: '本月：{d}', histNone: '这一天没有专注时间。', histPick: '选择一天查看详情。', histPrev: '上个月', histNext: '下个月', histPomos: { other: '{n} 个番茄钟' } }
  };
  Object.keys(X3).forEach(function (c) { if (LANGS[c]) Object.keys(X3[c]).forEach(function (k) { LANGS[c][k] = X3[c][k]; }); });
  document.head.appendChild(el('style', null,
    '.hist-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:18px}.hist-head .menu-title{margin:0}' +
    '.hist-nav{display:flex;align-items:center;gap:6px;font-weight:600;font-size:.9rem}.hist-nav button{width:30px;height:30px;border-radius:50%;border:1px solid var(--line);background:transparent;color:var(--fg);cursor:pointer;font-size:1rem}' +
    '.hist-nav button:disabled{opacity:.35;cursor:default}.hist-cal{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px;margin-top:10px}' +
    '.hist-cal .wd{font-size:.68rem;color:var(--muted);text-align:center;font-weight:600}' +
    '.hist-cal button{aspect-ratio:1.35;border:0;border-radius:8px;background:var(--surface);color:var(--fg);font:inherit;font-size:.74rem;cursor:pointer;padding:0}' +
    '.hist-cal button[data-l="1"]{background:color-mix(in srgb,var(--leaf) 30%,var(--surface))}.hist-cal button[data-l="2"]{background:color-mix(in srgb,var(--leaf) 55%,var(--surface))}' +
    '.hist-cal button[data-l="3"]{background:var(--leaf);color:#fff}.hist-cal button[data-l="4"]{background:var(--leaf2);color:#fff}' +
    '.hist-cal button.today{box-shadow:inset 0 0 0 2px var(--fg)}.hist-cal button[aria-pressed="true"]{box-shadow:inset 0 0 0 2px var(--go),0 0 0 2px var(--go)}.hist-cal button:disabled{opacity:.35;cursor:default}' +
    '.hist-sum{margin-top:10px;font-size:.85rem;color:var(--muted)}.hist-day{margin-top:6px;font-size:.9rem;line-height:1.45;min-height:2.6em}.hist-day b{display:block}'));
  var histBox = el('div'); histBox.id = 'histBox';
  var statGrid = $('statGrid'); statGrid.parentNode.insertBefore(histBox, statGrid.nextSibling);
  var hView = null, hSel = null;
  function dayData() {
    var m = {}; (S.history || []).forEach(function (h) { m[h.date] = { ms: h.ms || 0, pomos: h.pomos || 0, trees: h.trees || 0 }; });
    m[S.work.date] = { ms: S.work.ms || 0, pomos: S.work.pomos || 0, trees: (S.work.trees || []).length };
    return m;
  }
  function lvl(ms) { return !ms ? 0 : ms < 30 * 60000 ? 1 : ms < 2 * 3600000 ? 2 : ms < 4 * 3600000 ? 3 : 4; }
  function renderHist() {
    var data = dayData(), now = new Date(), keys = Object.keys(data).sort(), first = keys.length ? keys[0] : A.todayKey();
    if (!hView) hView = new Date(now.getFullYear(), now.getMonth(), 1);
    var y = hView.getFullYear(), mo = hView.getMonth(), loc = A.locale();
    histBox.innerHTML = '';
    var head = el('div', 'hist-head'), tt = el('p', 'menu-title'); tt.textContent = t('hist'); head.appendChild(tt);
    var nav = el('div', 'hist-nav'), pv = el('button'), lab = el('span'), nx = el('button');
    pv.type = nx.type = 'button'; pv.textContent = '‹'; nx.textContent = '›'; pv.setAttribute('aria-label', t('histPrev')); nx.setAttribute('aria-label', t('histNext'));
    lab.textContent = hView.toLocaleDateString(loc, { month: 'long', year: 'numeric' });
    var fd = new Date(first.slice(0, 4), +first.slice(5, 7) - 1, 1);
    pv.disabled = hView <= fd; nx.disabled = y === now.getFullYear() && mo === now.getMonth();
    pv.addEventListener('click', function () { hView = new Date(y, mo - 1, 1); hSel = null; renderHist(); });
    nx.addEventListener('click', function () { hView = new Date(y, mo + 1, 1); hSel = null; renderHist(); });
    nav.appendChild(pv); nav.appendChild(lab); nav.appendChild(nx); head.appendChild(nav); histBox.appendChild(head);
    var cal = el('div', 'hist-cal');
    for (var w = 1; w <= 7; w++) { var wd = el('span', 'wd'); wd.textContent = new Date(2024, 0, w).toLocaleDateString(loc, { weekday: 'narrow' }); cal.appendChild(wd); }
    var lead = (new Date(y, mo, 1).getDay() + 6) % 7, days = new Date(y, mo + 1, 0).getDate(), tk = A.todayKey(), sum = { ms: 0, pomos: 0, trees: 0 };
    for (var i = 0; i < lead; i++) cal.appendChild(el('span'));
    for (var d = 1; d <= days; d++) (function (d) {
      var k = y + '-' + ('0' + (mo + 1)).slice(-2) + '-' + ('0' + d).slice(-2), dd = data[k], b = el('button', k === tk ? 'today' : '');
      b.type = 'button'; b.textContent = d; b.setAttribute('data-l', dd ? lvl(dd.ms) : 0); b.setAttribute('aria-pressed', hSel === k ? 'true' : 'false');
      b.disabled = k > tk;
      b.setAttribute('aria-label', new Date(y, mo, d).toLocaleDateString(loc, { day: 'numeric', month: 'long' }) + (dd && dd.ms ? ': ' + A.fmtDur(dd.ms) : ''));
      if (dd) { sum.ms += dd.ms; sum.pomos += dd.pomos; sum.trees += dd.trees; }
      b.addEventListener('click', function () { hSel = k; renderHist(); });
      cal.appendChild(b);
    })(d);
    histBox.appendChild(cal);
    var s = el('p', 'hist-sum'); s.textContent = t('histMonth', { d: A.fmtDur(sum.ms) }) + ' · ' + t('trees', sum.trees) + ' · ' + t('histPomos', sum.pomos); histBox.appendChild(s);
    var det = el('p', 'hist-day');
    if (!hSel) det.textContent = t('histPick');
    else {
      var x = data[hSel], bb = el('b'); bb.textContent = new Date(+hSel.slice(0, 4), +hSel.slice(5, 7) - 1, +hSel.slice(8, 10)).toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      det.appendChild(bb);
      det.appendChild(document.createTextNode(x && x.ms ? A.fmtDur(x.ms) + ' · ' + t('histPomos', x.pomos) + ' · ' + t('trees', x.trees) : t('histNone')));
    }
    histBox.appendChild(det);
  }
  $('statsBtn').addEventListener('click', function () { hView = null; hSel = A.todayKey(); renderHist(); });
  document.addEventListener('grove:lang', function () { if (!$('stats').hidden) renderHist(); });

  // ---------------------------------------------------------------- smoother theme changes: fetch the other photos ahead of time
  var prefetched = {};
  $('themeBtn').addEventListener('click', function () {
    if (!S.x.scene) return;
    var go = function () { Object.keys(PHOTOS).forEach(function (k) { var u = photoUrl(k); if (prefetched[u]) return; prefetched[u] = 1; var im = new Image(); im.crossOrigin = 'anonymous'; im.referrerPolicy = 'no-referrer'; try { im.fetchPriority = 'low'; } catch (e) {} im.src = u; }); };
    if (window.requestIdleCallback) requestIdleCallback(go, { timeout: 1500 }); else setTimeout(go, 300);
  });

  // ---------------------------------------------------------------- boot
  applyText(); renderScene(); renderGameBtn(); markCurStepper();
  if (anyRunning()) planCheck();
  window.__groveX = { openGame: openGame, move: move, askHere: askHere, maybeBack: maybeBack, setCtx: setCtx, state: function () { return { ctx: ctx, nextCheck: nextCheck, nudge: nudgeKind, cooldown: cooldown }; } };
})();
