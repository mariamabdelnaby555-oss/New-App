import '../css/Header.css'
import Navbar from './Navbar.jsx'

function Header({ categories, selected, onSelect }) {
  return (
    <header className="hd">
      <h1>📰 News App</h1>
      <Navbar categories={categories} selected={selected} onSelect={onSelect} />
    </header>
  )
}

export default Header
