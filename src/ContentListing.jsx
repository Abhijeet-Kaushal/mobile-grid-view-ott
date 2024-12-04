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
  const totalPages = 3; // We only have three pages
  const [isSearchActive, setIsSearchActive] = useState(false); // For search input

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
        setCurrentPage(page); // Update current page
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
        document.documentElement.offsetHeight - 100;
      const hasMorePages = currentPage < totalPages;

      if (isBottom && hasMorePages) {
        fetchData(currentPage + 1); // Fetch next page
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {filteredData.map((item, index) => (
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

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";

// const Container = styled.div`
//   background-color: #171717;
//   color: #ffffff;
//   padding: 10px;
//   overflow-y: auto;
//   height: 100vh;
//   scrollbar-width: none; /* For Firefox */
//   -ms-overflow-style: none; /* For Internet Explorer and Edge */
//   &::-webkit-scrollbar {
//     display: none; /* For Chrome, Safari, and Opera */
//   }
// `;

// const SearchContainer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   margin-bottom: 10px;
// `;

// const SearchImage = styled.img`
//   width: 24px;
//   height: 24px;
//   cursor: pointer; /* Change cursor to pointer */
// `;

// const GoBack = styled.img`
//   width: 24px;
//   height: 24px;
// `;

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 10px;
// `;

// const Item = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background-color: #222;
//   border-radius: 5px;
//   overflow: hidden;
//   text-align: center;
// `;

// const Input = styled.input`
//   margin-left: 10px;
//   padding: 5px;
//   border: none;
//   border-radius: 5px;
//   outline: none;
//   background-color: #333;
//   color: white;
// `;

// const Image = styled.img`
//   width: 100%;
//   aspect-ratio: 2 / 3;
//   object-fit: cover;
// `;

// const SearchLabel = styled.label`
//   display: flex;
//   justify-content: left;
//   color: #ffffff;
// `;

// const Title = styled.div`
//   margin: 5px;
//   font-size: 12px;
//   text-align: center;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   overflow-wrap: break-word;
//   white-space: normal; /* Created wrapping */
// `;

// const ImageNotAvailable = styled.div`
//   width: 100%;
//   height: auto;
//   aspect-ratio: 2/3;
//   background-color: #444;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   font-size: 16px;
//   font-weight: bold;
// `;

// const ContentListing = () => {
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1); // Track current page
//   const totalPages = 3; // We only have 3 pages, images differ in api.

//   const fetchData = async (page) => {
//     try {
//       const response = await fetch(
//         `https://test.create.diagnal.com/data/page${page}.json`
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const jsonData = await response.json();
//       const contentItems = jsonData.page["content-items"].content;

//       if (Array.isArray(contentItems)) {
//         setData((prev) => [...prev, ...contentItems]);
//         setCurrentPage(page); // Update current page
//       }
//       console.log(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData(currentPage); // Load data from current page

//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop >=
//           document.documentElement.offsetHeight - 100 &&
//         currentPage < totalPages // Checking if there are more pages to load else nothing
//       ) {
//         fetchData(currentPage + 1); // Fetch next page
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [currentPage]);

//   const filteredData = data.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Container>
//       <SearchContainer>
//         <SearchLabel>Trying</SearchLabel>
//         <GoBack
//           src="https://test.create.diagnal.com/images/Back.png"
//           alt="Search"
//         />
//         <SearchImage
//           src="https://test.create.diagnal.com/images/search.png"
//           alt="Search"
//           onClick={() => setSearchTerm("")} // Clear search term on click
//         />
//         {searchTerm == "" && ( // Show input when there is a search term
//           <Input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         )}
//       </SearchContainer>
//       <Grid>
//         {filteredData.map((item, index) => (
//           <Item key={index}>
//             {item["poster-image"] &&
//             item["poster-image"] !== "posterthatismissing.jpg" ? (
//               <Image
//                 src={`https://test.create.diagnal.com/images/${item["poster-image"]}`}
//                 alt={item.name}
//               />
//             ) : (
//               <ImageNotAvailable>No Image Available</ImageNotAvailable>
//             )}
//             <Title>{item.name}</Title>
//           </Item>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default ContentListing;
