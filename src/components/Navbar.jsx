import '../css/Navbar.css'

// The categories bar.
// Props from App (through Header):
//   categories — the list of buttons
//   selected   — the id of the active category (or null)
//   onSelect   — a function the child calls to tell the parent "this one was clicked"
function Navbar({ categories, selected, onSelect }) {
  return (
    <nav className="nav">
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              className={selected === cat.id ? 'active' : ''}
              onClick={() => onSelect(cat.id)}
            >
              {cat.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
