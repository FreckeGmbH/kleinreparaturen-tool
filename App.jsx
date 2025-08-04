import { useState } from "react";

export default function ReparaturTool() {
  const [eintrag, setEintrag] = useState({
    datum: "",
    kunde: "",
    beschreibung: "",
    erledigt: false,
    stunden: "",
    material: "",
  });
  const [liste, setListe] = useState([]);

  const hinzufuegen = () => {
    if (!eintrag.kunde || !eintrag.beschreibung) return;
    setListe([...liste, { ...eintrag, id: Date.now() }]);
    setEintrag({ datum: "", kunde: "", beschreibung: "", erledigt: false, stunden: "", material: "" });
  };

  const toggleErledigt = (id) => {
    setListe(liste.map(e => e.id === id ? { ...e, erledigt: !e.erledigt } : e));
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <input type="date" value={eintrag.datum} onChange={e => setEintrag({ ...eintrag, datum: e.target.value })} />
        <input placeholder="Kunde / Objekt" value={eintrag.kunde} onChange={e => setEintrag({ ...eintrag, kunde: e.target.value })} />
        <textarea placeholder="Beschreibung der Reparatur" value={eintrag.beschreibung} onChange={e => setEintrag({ ...eintrag, beschreibung: e.target.value })} />
        <input placeholder="Stunden" value={eintrag.stunden} onChange={e => setEintrag({ ...eintrag, stunden: e.target.value })} />
        <input placeholder="Material" value={eintrag.material} onChange={e => setEintrag({ ...eintrag, material: e.target.value })} />
        <button onClick={hinzufuegen}>Eintrag hinzufügen</button>
      </div>

      <div>
        {liste.map(e => (
          <div key={e.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', opacity: e.erledigt ? 0.5 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{e.kunde}</strong>
              <label>
                <input type="checkbox" checked={e.erledigt} onChange={() => toggleErledigt(e.id)} />
                Erledigt
              </label>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'gray' }}>{e.datum}</p>
            <p>{e.beschreibung}</p>
            <p style={{ fontSize: '0.9rem' }}>⏱ {e.stunden} | 🧱 {e.material}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
