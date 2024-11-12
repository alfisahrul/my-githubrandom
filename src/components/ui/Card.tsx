import styled from "@emotion/styled";

interface CardProps {
  fullName: string;
  description: string;
  language: string;
  stargazersCount: number;
  forksCount: number;
  openIssuesCount: number;
  htmlUrl: string;
}

const Card = ({
  fullName,
  description,
  language,
  stargazersCount,
  forksCount,
  openIssuesCount,
  htmlUrl
}: CardProps) => {

  return (
    <Container>
      <Layout>
        <Title>{fullName}</Title>
        <Description>{description || "No description available."}</Description>
        <StatsContainer>
          <Stat>{language}</Stat>
          <Stat>⭐ {stargazersCount}</Stat>
          <Stat>🍴 {forksCount}</Stat>
          <Stat>🕒 {openIssuesCount}</Stat>
        </StatsContainer>
        <Url href={htmlUrl} target="_blank" rel="noopener noreferrer">
          {htmlUrl}
        </Url>
      </Layout>
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  font-family: Arial, sans-serif;
  color: #333;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: white;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 90%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;


const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #555;
  margin-top: 10px;
  gap: 10px;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: white;
`;

const Description = styled.p`
  font-size: 14px;
  color: #ccc;
  margin: 10px 0 20px;
  text-align: center;
`;

const Url = styled.a`
  font-size: 14px;
  color: #1e90ff;
  margin: 10px 0;
  text-align: center;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #00bfff;
  }
`;

export default Card;