import styled from "@emotion/styled";
import { GithubRepository } from "../../interfaces/entities/repositories";


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
  word-wrap: break-word;  // Enables breaking words if necessary
  overflow-wrap: break-word;
`;

const Card = styled.div`
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

const RefreshButton = styled.button`
   background-color: #000;
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin: 20px auto 0; /* Center horizontally */
  width: 90%;
  max-width: 300px;

  &:hover {
    background-color: #333;
  }
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
  color:white;
`;
const Description = styled.p`
  font-size: 14px;
  color: #ccc; /* Lighter color for the description */
  margin: 10px 0 20px; /* Spacing adjustments */
  text-align: center; /* Center align the description */
`;
type CardStyledProps = {
    repo: GithubRepository; // Use the appropriate type for your repo
};

export const CardStyled: React.FC<CardStyledProps> = ({ repo }) => {

    return (
        <>
            <Container>
                <Card>
                    <Title>{repo.fullName}</Title>
                    <Description>{repo.description || "No description available."}</Description> {/* Display repository description */}
                    <StatsContainer>
                        <Stat>🟡 {repo.language}</Stat>
                        <Stat>⭐ {repo.stargazersCount}</Stat>
                        <Stat>🍴 {repo.forksCount}</Stat>
                        <Stat>🕒 {repo.openIssuesCount}</Stat>
                    </StatsContainer>

                    <RefreshButton>Refresh</RefreshButton>
                </Card>
            </Container>
        </>
    )
}