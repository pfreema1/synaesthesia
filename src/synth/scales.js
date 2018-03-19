import Tone from "tone";
import * as utils from "../utils";

const roots = ["A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab"];
export const scales = {
  major: [2, 2, 1, 2, 2, 2],
  naturalMinor: [2, 1, 2, 2, 1, 2],
  harmonicMinor: [2, 1, 2, 2, 1, 3],
  melodicMinor: [2, 1, 2, 2, 2, 2],
  dorian: [2, 1, 2, 2, 2, 1],
  mixolydian: [2, 2, 1, 2, 2, 1],
  ahavaRaba: [1, 3, 1, 2, 1, 2],
  phrygian: [1, 2, 2, 2, 1, 2],
  minorPentatonic: [3, 2, 2, 3],
  majorPentatonic: [2, 2, 3, 2]
};

export const getRandomRootNote = () => {
  return roots[utils.randomIntBetween(0, roots.length - 1)];
};

export const actualNotesFromScale = (tonic, scale, lowOctave, highOctave) => {
  let notes = [];

  //Get just the note value without octaves
  if (!utils.isNumeric(tonic)) {
    tonic = tonic.replace(/[0-9]/g, "");
  } else {
    tonic = Tone.Frequency(tonic)
      .toNote()
      .replace(/[0-9]/g, "");
  }

  for (let octave = lowOctave; octave <= highOctave; octave++) {
    const octaveScale = scaleFromTonic(tonic + octave, scale);
    notes = [...notes, ...octaveScale];
  }
  return notes;
};

export const getRandomChordProgressionForKey = (key, mainOctave) => {
  const progressionRootNotes = chordFromScale(
    [1, 4, 7, 3, 6, 2, 5],
    key.root,
    key.type,
    mainOctave
  );

  const progression = [];

  for (const progressionRootNote of progressionRootNotes) {
    progression.push(
      chordFromScale([1, 3, 5], progressionRootNote, key.type, mainOctave)
    );
  }

  return progression;
};

export const chordFromScale = (chordToneIndexes, tonic, scale, mainOctave) => {
  const fullScale = actualNotesFromScale(
    tonic,
    scale,
    mainOctave,
    mainOctave + 1
  );

  const filteredScale = [];
  for (const index of chordToneIndexes) {
    filteredScale.push(fullScale[index - 1]);
  }

  return filteredScale;
};

export const scaleFromTonic = (tonic, intervals) => {
  const scale = [];
  let note = Tone.Frequency(tonic);
  scale.push(tonic);

  for (const interval of intervals) {
    note = note.transpose(interval);
    scale.push(note.toFrequency());
  }

  return scale;
};
