import '../../styles/style.scss';

interface MainProps {
  children: React.ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <>
      <main id="main" role="main">
        {children}
      </main>
    </>
  );
}
