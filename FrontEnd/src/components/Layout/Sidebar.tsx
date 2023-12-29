import '../../styles/style.scss';

export default function Sidebar() {
  return (
    <>
      <aside id="sidebar" role="banner">
        <nav className="sidebar_menu">
          <ul className="menu">
            <li>
              <a href="/study">스터디모집</a>
            </li>
            <li>
              <a href="/market">중고마켓</a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
