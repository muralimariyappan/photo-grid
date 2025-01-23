import styled from "@emotion/styled";
import dynamic from 'next/dynamic';

const Main = styled.main`
  margin: 0 auto;  
`;

const PageTitle = styled.h1`
  padding: 16px;
`;

const PhotoGrid = dynamic(() => import('../components/PhotoGrid/PhotoGrid'), {
  ssr: false, 
  loading: () => <p>Loading...</p>, 
});

export default function Home() {
  return (
    <Main>
      <PageTitle>Photo Gallery</PageTitle>
      <PhotoGrid />
    </Main>
  );
}
