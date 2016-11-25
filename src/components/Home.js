import React from 'react';

const Home = (props) => (
  <div>
    <h1>Nobody is Perfect: Anleitung</h1>
    <p>
      <strong>1. Spieler konfigurieren</strong><br/>
      Hier kann man neue Spieler hinzufügen und löschen.
      (mit Klick auf einen Spielernamen kann man dem Spieler Punkte geben. Rechtsklick entfernt Punkte)
    </p>

    <p>
      <strong>2. Runden anlegen & steuern</strong><br/>
      Die jeweils aktive Runde hat ein blaues Icon.
      (Rechts oben in der leiste die Zahl zeigt stets die aktuelle Runde an)<br/>
      - Klick auf "neue Runde hinzufügen" um eine neue Runde anzulegen <br/>
      - Klick auf den Stift um die Frage und die richtige Antwort einzugeben. <br/>
      - Klick auf die Runde um sie zu aktivieren.
    </p>

    <p>
      <strong>3. Antworten eingeben</strong><br/>
      Hier können alle Spieler jetzt ihren Namen auswählen und ihre Antworten eingeben.<br/>
      Wenn ein Spieler seine Antwort korrigieren will, kann er nochmals unter seinem Namen eine Antwort abschicken.<br/>
    </p>

    <p>
      <strong>4. Präsentieren</strong><br/>
      Diese Ansicht kann in einem neuen Fenster dauerhaft auf dem Beamer angezeigt werden.<br/>
      - Zu Beginn ist hier nur die Frage der Runde sichtbar<br/>
      - Wenn die Spieler ihre Antworten eingeben werden diese nicht sofort sichtbar<br/>
      - Erst wenn man auf Abstimmen klickt werden die Antworten angezeigt. <br/>
      - Bei der Abstimmung kann man auf eine Antwort klicken um zu zeigen, dass jemand für diese Antwort gestimmt hat.
      (Rechtsklick entfernt Punkte)<br/>
      - Diese Punkte werden auch direkt dem SpielerKonto gutgeschrieben. <br/>
      - Punkte für die Spieler, die richtig getippt haben müssen händisch unter "Spieler" eingetragen werden. (Klick auf den Namen) <br/>
      - Wenn man auf Aufdecken klickt werden die Schreiber angezeigt. <br/>
    </p>
  </div>
);
export default Home;
