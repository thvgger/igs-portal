import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome Admin!</h1>
      <p>Please <Link href="/login" style={{color: 'blue'}}>Login</Link> to continue.</p>
    </div>
  );
}