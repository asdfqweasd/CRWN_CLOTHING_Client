// import { createContext, useState, useEffect } from "react";
// import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.jsx";

// export const CategoriesContext = createContext({
//   products: [],
// });

// export const CategoriesProvider = ({ children }) => {
//   const [categoriesMap, setCategoriesMap] = useState({});
//   // use it only once to upload our data to firebase database
//   // useEffect(() => {
//   //   addCollectionAndDocuments("categories", SHOP_DATA);
//   // }, []);
//   useEffect(() => {
//     const getCategoriesMap = async () => {
//       const categoryMap = await getCategoriesAndDocuments();
//       console.log(categoryMap);
//       setCategoriesMap(categoryMap);
//     };
//     getCategoriesMap();
//   }, []);
//   const value = { categoriesMap };
//   return (
//     <CategoriesContext.Provider value={value}>
//       {children}
//     </CategoriesContext.Provider>
//   );
// };
