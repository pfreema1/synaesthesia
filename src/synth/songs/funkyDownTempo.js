import Tone from "tone";
import * as scales from "../scales";
import * as parts from "../parts";
import instruments from "../instruments";
import * as rythyms from "../rythyms";
import * as utils from "../../utils";

export const play = () => {
  const keyType = scales.getRandomScaleType();
  const songKey = {
    root: scales.getRandomRootNote(),
    type: keyType.intervals,
    typeName: keyType.type,
    chordOctave: utils.randomIntBetween(2, 3)
  };

  const bgWrapperEl = document.getElementById("bgWrapperEl");

  const progressionIntervals = utils.randomFromArray(scales.chordProgressions);
  const chordTypesToUseInProgression = scales.getRandomChordTypesForProgression(
    progressionIntervals
  );
  const chordProgression = scales.getChordProgressionForKey(
    songKey,
    progressionIntervals,
    chordTypesToUseInProgression
  );
  const possibleChordSectionLengths = [1, 2, 4, 8];
  const chordProgressionBars = utils.randomFromArray(
    possibleChordSectionLengths
  );
  const possibleChordPads = [
    instruments.pads.SimpleSine,
    instruments.pads.SwirlySawtoothChorusWithSubBass,
    instruments.pads.SoftSquareFm
  ];
  const possibleBassInstruments = [
    instruments.bass.FastAttackSquare,
    instruments.presets.Bassy
  ];
  const possibleMotifInstruments = [
    instruments.presets.AM_Tiny,
    instruments.presets.Kalimba
  ];
  const kickRythym = rythyms.randomKickRythym();
  const hihatRythym = rythyms.randomHiHatRythym();
  const shakerRythym = rythyms.randomShakerRythym();
  const openHatRythym = rythyms.randomOpenHatRythym();
  const snareRythym = rythyms.randomSnareRythym();

  const bassLinePatterns = [];
  for (let i = 0; i < chordProgression.length; i++) {
    bassLinePatterns.push(rythyms.randomBassRythym());
  }
  const motifPatterns = [];
  for (let i = 0; i < chordProgression.length; i++) {
    motifPatterns.push(rythyms.randomMotifRythym());
  }

  const chordInstrument = new (utils.randomFromArray(possibleChordPads))();
  const bassInstrument = new (utils.randomFromArray(possibleBassInstruments))();
  const motifInstrument = new (utils.randomFromArray(
    possibleMotifInstruments
  ))();
  const openHatFrequency = Tone.Frequency(songKey.root + "3").toFrequency();

  const generatedSettings = {
    key: `${songKey.root} (${songKey.typeName})`,
    chordOctave: songKey.chordOctave,
    chordProgression: progressionIntervals,
    chordProgressionBars: chordProgressionBars,
    chordTypesToUseInProgression: chordTypesToUseInProgression,
    chordProgressionNotes: scales.rootNotesFromChordProgression(
      chordProgression
    ),
    chordInstrument: chordInstrument.constructor.name,
    bassInstrument: bassInstrument.constructor.name,
    motifInstrument: motifInstrument.constructor.name
  };

  const changeRythym = (sequencer, newRythym) => {
    const originalLength = sequencer.length;
    newRythym.forEach((item, index) => {
      sequencer.at(index, item);
    });
    const numberToRemove = originalLength - newRythym.length;
    for (let i = numberToRemove; i > 0; i--) {
      sequencer.remove(newRythym.length + i - 1);
    }
  };

  parts.addDrums(
    "0:0:0",
    songKey.root + "0",
    new instruments.drums.KickDrum(),
    kickRythym,
    1,
    true,
    function(sequencer) {
      changeRythym(sequencer, rythyms.randomKickRythym());
    }
  );

  parts.addDrums(
    "0:0:0",
    undefined,
    new instruments.drums.Slap(),
    snareRythym,
    0.9,
    true,
    function(sequencer) {
      changeRythym(sequencer, rythyms.randomSnareRythym());
    }
  );

  parts.addDrums(
    "0:0:0",
    undefined,
    new instruments.drums.HiHat(),
    hihatRythym,
    0.9,
    true,
    function(sequencer) {
      changeRythym(sequencer, rythyms.randomHiHatRythym());
    }
  );

  parts.addDrums(
    "0:0:0",
    undefined,
    new instruments.drums.Shaker(),
    shakerRythym,
    0.8,
    true,
    function(sequencer) {
      changeRythym(sequencer, rythyms.randomShakerRythym());
    }
  );

  parts.addDrums(
    "0:0:0",
    undefined,
    new instruments.drums.OpenHat(openHatFrequency),
    openHatRythym,
    0.8,
    true,
    function(sequencer) {
      changeRythym(sequencer, rythyms.randomOpenHatRythym());
    }
  );

  parts.addChordProgression(
    "0:0:0",
    chordProgression,
    chordInstrument,
    `${chordProgressionBars}m`,
    `${chordProgressionBars}m`,
    true,
    bgWrapperEl
  );

  const notesPerChord = [];
  for (const bassLinePattern of bassLinePatterns) {
    notesPerChord.push(bassLinePattern.filter(hit => hit === 1).length);
  }
  const bassOctave = songKey.chordOctave - 1;

  parts.addRepeatingSoloPart(
    "0:0:0",
    scales.smoothBassLineForChordProgression(
      notesPerChord,
      chordProgression,
      songKey,
      bassOctave
    ),
    bassInstrument,
    "4n",
    bassLinePatterns,
    chordProgressionBars,
    true
  );

  const motifOctave = songKey.chordOctave + 1;
  parts.addRepeatingSoloPart(
    "0:0:0",
    scales.motifForChordProgression(
      notesPerChord,
      chordProgression,
      songKey,
      motifOctave
    ),
    motifInstrument,
    1.3,
    motifPatterns,
    chordProgressionBars,
    true
  );

  // const evolutionLoop = new Tone.Loop(function() {
  //   const parts = [kickPart, snarePart, hihatPart, shakerPart, openHatPart];
  //   const part = utils.randomFromArray(parts);
  //   part.mutate();
  // }, "4m");
  // evolutionLoop.start(0);

  return generatedSettings;
};
