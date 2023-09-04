export const WORKSPACE_THEMES = [
    { value: "#27272a", label: "Zinc" },
    { value: "#ef4444", label: "Red" },
    { value: "#f97316", label: "Orange" },
    { value: "#fbbf24", label: "Amber" },
    { value: "#fde047", label: "Yellow" },
    { value: "#a3e635", label: "Lime" },
    { value: "#22c55e", label: "Green" },
    { value: "#10b981", label: "Emerald" },
    { value: "#06b6d4", label: "Cyan" },
    { value: "#2563eb", label: "Blue" },
    { value: "#4f46e5", label: "Indigo" },
    { value: "#8b5cf6", label: "Violet" },
    { value: "#a855f7", label: "Purple" },
    { value: "#d946ef", label: "Fuchsia" },
    { value: "#ec4899", label: "Pink" },
    { value: "#f43f5e", label: "Rose" },
];

export function getRandomTheme() {
    return WORKSPACE_THEMES[Math.floor(Math.random() * WORKSPACE_THEMES.length)].value;
}
