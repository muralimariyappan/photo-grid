import PhotoGrid from "@/components/PhotoGrid/PhotoGrid";
import styled from "@emotion/styled";

const Main = styled.main`
  margin: 0 auto;  
`;

const PageTitle = styled.h1`
  padding: 16px;
`;

export default function Home() {
  return (
    <Main>
      <PageTitle>Photo Gallery</PageTitle>
      <PhotoGrid />
    </Main>
  );
}
