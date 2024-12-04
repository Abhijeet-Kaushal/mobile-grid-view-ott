// import React, { useState, useEffect, useRef } from "react";
// import { Box, Grid, Typography, TextField } from "@mui/material";

// const GridNew = () => {
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const observer = useRef();

//   const fetchPageData = async (pageNum) => {
//     try {
//       const response = await fetch(
//         https://test.create.diagnal.com/data/page${pageNum}.json
//       );
//       const jsonData = await response.json();
//       const content = jsonData.page["content-items"].content;

//       if (content.length > 0) {
//         setData((prevData) => [...prevData, ...content]);
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // Initial data fetch
//   useEffect(() => {
//     fetchPageData(page);
//   }, [page]);

//   // Lazy load data when user scrolls
//   const handleObserver = (entries) => {
//     const [entry] = entries;
//     if (entry.isIntersecting && hasMore) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   useEffect(() => {
//     const options = {
//       root: null,
//       rootMargin: "20px",
//       threshold: 1.0,
//     };

//     observer.current = new IntersectionObserver(handleObserver, options);
//     const target = document.querySelector("#end-of-list");
//     if (target) observer.current.observe(target);

//     return () => observer.current.disconnect();
//   }, [hasMore]);

//   // Filter data for search functionality
//   const filteredData = data.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <Box
//       sx={{
//         backgroundColor: "#171717",
//         color: "#FFFFFF",
//         minHeight: "100vh",
//         padding: 2,
//       }}
//     >
//       <TextField
//         fullWidth
//         variant="outlined"
//         placeholder="Search..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         sx={{
//           marginBottom: 2,
//           input: { color: "#FFFFFF" },
//           backgroundColor: "#333333",
//         }}
//       />
//       <Grid container spacing={2}>
//         {filteredData.map((item, index) => (
//           <Grid item xs={4} key={index}>
//             <Box
//               sx={{
//                 position: "relative",
//                 width: "100%",
//                 paddingBottom: "150%", // Aspect ratio 2:3
//                 backgroundColor: "#222222",
//                 overflow: "hidden",
//                 borderRadius: 1,
//               }}
//             >
//               <img
//                 src={https://test.create.diagnal.com/images/${item["poster-image"]}}
//                 alt={item.name}
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                   objectPosition: "center",
//                 }}
//                 loading="lazy"
//               />
//             </Box>
//             <Typography
//               variant="body2"
//               sx={{
//                 marginTop: 1,
//                 textAlign: "center",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               {item.name}
//             </Typography>
//           </Grid>
//         ))}
//       </Grid>
//       <div id="end-of-list" style={{ height: "1px" }}></div>
//     </Box>
//   );
// };

// export default GridNew;
