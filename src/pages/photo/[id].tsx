import dynamic from 'next/dynamic';

const PhotoDetails = dynamic(() => import('../../components/PhotoDetails/PhotoDetails'), {
  ssr: false, 
  loading: () => <p>Loading...</p>, 
});

export default function Home() {
  return (
    <div>
      <PhotoDetails />
    </div>
  );
}
