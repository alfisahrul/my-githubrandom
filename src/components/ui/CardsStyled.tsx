import styled from "@emotion/styled";
import { GithubRepository } from "../../interfaces/entities/repositories";
import { useGithubRepositories } from "../../stores/queries/repositories";
import { useLanguageStore } from "../../stores/states/languageStore";
import { useState } from "react";

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
  margin: 20px auto 0;
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
  color: white;
`;

const Description = styled.p`
  font-size: 14px;
  color: #ccc;
  margin: 10px 0 20px;
  text-align: center;
`;

// type CardStyledProps = {
//   repo: GithubRepository;
// };

export const CardStyled: React.FC = () => {
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const { data: repositoriesData } = useGithubRepositories(selectedLanguage);
  const [randomRepo, setRandomRepo] = useState<GithubRepository | null>(null);

  // Get a random repository from the fetched data
  const getRandomRepository = () => {
    if (!repositoriesData || !repositoriesData.data.items.length) return null;
    const randomIndex = Math.floor(Math.random() * repositoriesData.data.items.length);
    return repositoriesData.data.items[randomIndex];
  };

  // Handle refresh to display a new random repository
  const handleRefresh = () => {
    const randomRepo = getRandomRepository();
    setRandomRepo(randomRepo);  // Set the new random repository for display
  };

  const displayedRepo = randomRepo || getRandomRepository(); // Show initially selected random repo

  if (!displayedRepo) return <div>No repository available.</div>;

  return (
    <Container>
      <Card>
        <Title>{displayedRepo.fullName}</Title>
        <Description>{displayedRepo.description || "No description available."}</Description>
        <StatsContainer>
          <Stat>{displayedRepo.language}</Stat>
          <Stat>⭐ {displayedRepo.stargazersCount}</Stat>
          <Stat>🍴 {displayedRepo.forksCount}</Stat>
          <Stat>🕒 {displayedRepo.openIssuesCount}</Stat>
        </StatsContainer>
        <RefreshButton onClick={handleRefresh}>Refresh</RefreshButton>
      </Card>
    </Container>
  );
};
