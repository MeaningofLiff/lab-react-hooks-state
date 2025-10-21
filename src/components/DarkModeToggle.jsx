export default function DarkModeToggle({ darkMode, onToggle }) {
  const label = darkMode ? "Toggle Light Mode" : "Toggle Dark Mode";
  return (
    <button className="dark-toggle" onClick={onToggle} aria-pressed={darkMode}>
      {label}
    </button>
  );
}
 