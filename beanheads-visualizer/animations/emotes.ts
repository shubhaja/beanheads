// Map of emote types to their display names
export const emoteDisplayNames = {
  sleep: "Sleep (ZZZ)",
  surprise: "Surprise (!)",
  none: "None"
};

// Create options for dropdown
export const emoteOptions = Object.entries(emoteDisplayNames).map(([value, label]) => ({
  value,
  label
})); 