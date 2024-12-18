
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { throttle } from "lodash";

const Container = styled.div`
  background-color: #171717;
  color: #ffffff;
  padding: 10px;
  overflow-y: auto;
  height: 100vh;
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari */
  }
`;

const MainHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const HeaderContainerSearch = styled.div`
  display: flex;
  align-items: center;
`;

const SearchImage = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer; /* Change cursor to pointer */
`;

const GoBackImage = styled.img`
  width: 24px;
  height: 20px;
  margin: 10px;
  cursor: pointer;
`;

const FilmLabel = styled.div`
  margin-right: auto;
  color: #ffffff;
`;

const Input = styled.input`
    margin-left:10px; 
    padding:5px; 
    border:none; 
    border-radius:5px; 
    outline:none; 
    background-color:#333; 
    color:white; 
    width:200px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #222;
  border-radius: 5px;
  overflow: hidden;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
`;

const Title = styled.div`
  margin: 5px;
  font-size: 12px;
`;

const NoResultsMessage = styled.div`
    grid-column: span 3;
    text-align: center; 
    color: #ffffff;
    margin-top: 50px;
`;

const ImageNotAvailable = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 2/3;
  background-color: #444;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const ContentListing = () => {
  const [fetchedData, setFetchedData] = useState([]); // Raw data from API
  const [filteredData, setFilteredData] = useState([]); // Search-filtered data
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // tracking current page
  const [fetching, setFetching] = useState(false); 
  const [isSearchActive, setIsSearchActive] =useState(false); // to toggle search
  const totalPages = 3;

  const fetchData = async (page) => {
    if (fetching || page > totalPages) return;
    setFetching(true);

    try {
      const response = await fetch(
        `https://test.create.diagnal.com/data/page${page}.json`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const jsonData = await response.json();
      const contentItems = jsonData.page["content-items"].content;

      setFetchedData((prev) => [...prev, ...contentItems]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setFetching(false);
    }
  };

  // Trigger API call when currentPage changes
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  // Throttled scroll handling for pagination for optimization
  useEffect(() => {
    const handleScroll = throttle(() => {
      const isBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - window.innerHeight * 0.1;

      if (isBottom && currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
    }, 300);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  // Update filteredData whenever fetchedData or searchTerm changes
  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = fetchedData.filter((item) =>
      item.name.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredData(filtered);
  }, [fetchedData, searchTerm]);

  const handleBackButtonClick = () => {
    setSearchTerm(""); // Reset search term
    setIsSearchActive(false); // Close search bar
  };

  return (
    <Container>
      <MainHeaderContainer>
      <HeaderContainer>
        <GoBackImage
            src="https://test.create.diagnal.com/images/Back.png"
            alt="Back"
            onClick={handleBackButtonClick} // Handle back button click
        />
        <FilmLabel>Romantic Comedy</FilmLabel>
        </HeaderContainer>
        <HeaderContainerSearch> 
        <SearchImage
          src="https://test.create.diagnal.com/images/search.png"
          alt="Search"
          onClick={() => setIsSearchActive(!isSearchActive)} // Toggle search
        />
        {isSearchActive && ( // Show input when search is active
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </HeaderContainerSearch>
      </MainHeaderContainer>
      <Grid>
  {filteredData.length > 0 ? (
    filteredData.map((item, index) => (
      <Item key={index}>
        {item["poster-image"] && item["poster-image"] !== "posterthatismissing.jpg" ? (
          <Image
            src={`https://test.create.diagnal.com/images/${item["poster-image"]}`}
            alt={item.name}
          />
        ) : (
          <ImageNotAvailable>No Image Available</ImageNotAvailable>
        )}
        <Title>{item.name}</Title>
      </Item>
    ))
  ) : (
    <NoResultsMessage>No results found for "{searchTerm}"</NoResultsMessage>
  )}
</Grid>
    </Container>
  );
};

export default ContentListing;
