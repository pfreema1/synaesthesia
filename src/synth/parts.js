import Tone from "tone";
import { changeBgColor } from "../visuals/visuals.js";

export const addChordProgression = (
  startTime,
  chordProgression,
  instrument,
  noteLength,
  interval,
  shouldLoop,
  bgWrapperEl
) => {
  const loop = new Tone.Loop(function(time) {
    //Take first chord
    const currentChord = chordProgression.shift();
    //add chord to back of queue
    chordProgression.push(currentChord);
    //play it
    instrument.triggerAttackRelease(currentChord, noteLength, time);

    Tone.Draw.schedule(() => {
      changeBgColor(bgWrapperEl);
    }, time);
  }, interval);

  loop.loop = shouldLoop;
  loop.start(startTime);
};

export const addDrums = (
  startTime,
  note,
  instrument,
  pattern,
  probability,
  shouldLoop,
  mutationFunction
) => {
  const sequencer = new Tone.Sequence(
    function(time, hit) {
      if (hit === 1) {
        instrument.triggerAttackRelease(note, "16n", time);
      }
    },
    pattern,
    "16n"
  );
  sequencer.probability = probability;
  sequencer.loop = shouldLoop;
  sequencer.start(startTime);

  return new Part(sequencer, mutationFunction);
};

export const addSoloPart = (
  startTime,
  notes,
  instrument,
  noteLength,
  pattern,
  probability,
  shouldLoop
) => {
  const sequencer = new Tone.Sequence(
    function(time, hit) {
      if (hit === 1) {
        const note = notes.shift();
        notes.push(note);
        instrument.triggerAttackRelease(note, noteLength, time);
      }
    },
    pattern,
    "16n"
  );

  sequencer.probability = probability;
  sequencer.loop = shouldLoop;
  sequencer.start(startTime);
};

export const addRepeatingSoloPart = (
  startTime,
  notes,
  instrument,
  noteLength,
  patterns,
  repeatTimes,
  shouldLoop
) => {
  const expandedSequence = [];
  for (const section of notes) {
    for (let ri = 0; ri < repeatTimes; ri++) {
      for (let ni = 0; ni < section.length; ni++) {
        const note = section[ni];
        expandedSequence.push(note);
      }
    }
  }

  const expandedPattern = [];
  for (const section of patterns) {
    for (let ri = 0; ri < repeatTimes; ri++) {
      for (let ni = 0; ni < section.length; ni++) {
        const rythym = section[ni];
        expandedPattern.push(rythym);
      }
    }
  }

  const sequencer = new Tone.Sequence(
    function(time, hit) {
      if (hit === 1) {
        const note = expandedSequence.shift();
        expandedSequence.push(note);
        instrument.triggerAttackRelease(note, noteLength, time);
      }
    },
    expandedPattern,
    "16n"
  );

  sequencer.loop = shouldLoop;
  sequencer.start(startTime);
};

export function Part(mutationPayload, mutationFunction) {
  this.mutationFunction = mutationFunction;
  this.mutate = function() {
    this.mutationFunction(mutationPayload);
  };
}
