import { useRouter } from 'next/router';

export default function Page() {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Sub-page: {slug ? slug.join('/') : 'Home'}</h1>
            <p>Current Path: {router.asPath}</p>
            <button onClick={() => router.push('/')}>Go Home</button>
            <button onClick={() => router.push('/foo')}>Go to /foo</button>
            <button onClick={() => router.push('/bar/baz')}>Go to /bar/baz</button>
        </div>
    );
}
