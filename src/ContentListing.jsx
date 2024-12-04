import React, { useEffect, useState } from "react";
import styled from "styled-components";

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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SearchImage = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer; /* Change cursor to pointer */
`;

const GoBackImage = styled.img`
  width: 24px;
  height: 20px;
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

const FilmLabel = styled.div`
  margin-right: 55%;
  color: #ffffff;
`;

const Title = styled.div`
  margin: 5px;
  font-size: 12px;
  text-align: center;
  white-space: normal; /* text wrapping for long titles*/
  overflow: hidden;
  text-overflow: ellipsis;
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

const Input = styled.input`
  margin-left: 10px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  outline: none;
  background-color: #333;
  color: white;
`;

const ContentListing = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [isSearchActive, setIsSearchActive] = useState(false); // For search input
  const totalPages = 3; // We only have three pages

  const fetchData = async (page) => {
    if (page > totalPages) return;

    try {
      const response = await fetch(
        `https://test.create.diagnal.com/data/page${page}.json`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      const contentItems = jsonData.page["content-items"].content;

      if (Array.isArray(contentItems)) {
        setData((prev) => [...prev, ...contentItems]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage); // Load data from current page

    const handleScroll = () => {
      const isBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - window.innerHeight * 0.1;

      if (isBottom && currentPage < totalPages) {
        fetchData(currentPage + 1); // Fetch next page
        setCurrentPage((prev) => prev + 1); // Update current page
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  return (
    <Container>
      <HeaderContainer>
        <GoBackImage
          src="https://test.create.diagnal.com/images/Back.png"
          alt="Back"
        />
        <FilmLabel>Romantic Comedy</FilmLabel>
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
      </HeaderContainer>
      <Grid>
        {data
          .filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((item, index) => (
            <Item key={index}>
              {item["poster-image"] &&
              item["poster-image"] !== "posterthatismissing.jpg" ? (
                <Image
                  src={`https://test.create.diagnal.com/images/${item["poster-image"]}`}
                  alt={item.name}
                />
              ) : (
                <ImageNotAvailable>No Image Available</ImageNotAvailable>
              )}
              <Title>{item.name}</Title>
            </Item>
          ))}
      </Grid>
    </Container>
  );
};

export default ContentListing;
